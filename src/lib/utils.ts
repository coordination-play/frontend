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

// monthId
export const getMonthId = (month: number | string, year: number | string) =>
  `${month.toString().length === 1 ? `0${month}` : month}${year}`; // => i.e. Jan 2024 -> 012024
