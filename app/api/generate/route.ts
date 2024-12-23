import sharp from "sharp";
import { NextResponse } from "next/server";
import path from "path";
import fs from 'fs/promises';
import { getCropBounds } from "@/utils/image";
import Pair from "@/lib/pair";

export interface ProcessImageRequest {
  imagePath: string;
  gridSize: Pair;
}
export async function POST(req: Request) {
  try {
    const { imagePath, gridSize }: ProcessImageRequest = await req.json();

    // resolve the image path
    const resolvedPath = path.resolve('./public', imagePath);
    await fs.access(resolvedPath);

    // load and process the image
    const image = sharp(resolvedPath);
    const metadata = await image.metadata();
    const imageSize = new Pair(metadata.width || 0, metadata.height || 0);

    // find the dimensions and the top left position of the crop rectangle
    const { dimensions, crop } = getCropBounds(gridSize, imageSize)

    const cropped = await image
      .extract({
        left: crop.x,
        top: crop.y,
        width: dimensions.x,
        height: dimensions.y,
      })
      .toBuffer();

    // compute cell crop square and resize each individual image
    const cellWidth = dimensions.x / gridSize.x;
    const cellHeight = dimensions.y / gridSize.y;
    const cells: string[] = [];

    for (let y = 0; y < gridSize.y; y++) {
      for (let x = 0; x < gridSize.x; x++) {
        const cell = await sharp(cropped)
          .extract({
            left: Math.floor(x * cellWidth),
            top: Math.floor(y * cellHeight),
            width: Math.floor(cellWidth),
            height: Math.floor(cellHeight),
          })
          .toBuffer();
        cells.push(cell.toString('base64'));
      }
    }

    return NextResponse.json({ cells, cropped : cropped.toString('base64') });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error }, { status: 500 });
  }
}