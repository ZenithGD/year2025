import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs : (string | object)[]) => twMerge(clsx(inputs))