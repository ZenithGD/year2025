import Pair from "@/lib/pair";


export function getCropBounds(gridSize: Pair, imageSize: Pair)
{
  // x vs. y
  let newWidth = imageSize.x;
  let newHeight = imageSize.y;

  const gridAspectRatio = gridSize.x / gridSize.y
  const originalAspectRatio = newWidth / newHeight

  let top = 0, left = 0;
  
  console.log(gridAspectRatio, originalAspectRatio)
  
  if (originalAspectRatio < gridAspectRatio) {
    // new aspect ratio is more vertically stretched than the original image
    newHeight = Math.floor(newHeight * originalAspectRatio / gridAspectRatio);
    top = Math.floor((imageSize.y - newHeight) / 2)
  } else {
    // new aspect ratio is more horizontally stretched than the original image
    newWidth = Math.floor(newWidth / originalAspectRatio * gridAspectRatio);
    left = Math.floor((imageSize.x - newWidth) / 2)
  }

  return {
    dimensions: new Pair(newWidth, newHeight),
    crop: new Pair(left, top)
  }
}