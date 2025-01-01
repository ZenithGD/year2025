import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// Equivalent to tailwind `lg` media query
export const MAX_TABLET_WIDTH = 1024;
// Equivalent to tailwind `md` media query
export const MAX_MOBILE_WIDTH = 768;

export const cn = (...inputs: (string | object)[]) => twMerge(clsx(inputs))

/**
 * Compute puzzle width from type of device screen
 * @param isMobile Mobile media query flag
 * @param isTablet Tablet media query flag
 * @returns The width of the puzzle in pixels
 */
export const puzzleWidth = (isMobile: boolean, isTablet: boolean): number => {
  if (isMobile) return 250;
  if (isTablet) return 360;
  return 460
}



export function formatMsTime(ms: number)
{
  if (!isFinite(ms))
  {
    return "--:--:--"
  }

  // convert to mm:ss:ll
  const millis = Math.floor(ms % 1000).toString().padStart(3, "0");
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}:${millis}`
}
