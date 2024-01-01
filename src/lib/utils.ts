import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { validateAndParseAddress } from "starknet";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// blockchain stuff
export const isAddress = (address: string) => validateAndParseAddress(address);

export const truncateAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;
