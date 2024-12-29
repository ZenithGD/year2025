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
