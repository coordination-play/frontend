import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

import { validateAndParseAddress } from "starknet";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// blockchain stuff
export const isAddress = (address: string) => {
  try {
    return validateAndParseAddress(address);
  } catch (err) {
    return false;
  }
};

export const truncateAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

// monthId
export const getMonthId = (month: number | string, year: number | string) =>
  `${month.toString().length === 1 ? `0${month}` : month}${year}`; // => i.e. Jan 2024 -> 012024

export const getDateFromMonthId = (monthId: string): dayjs.Dayjs => {
  const month = monthId.slice(0, 2);
  const year = monthId.slice(2, 6);

  return dayjs({ month: Number(month) - 1, year });
};

export const isValidMonthId = (monthId: string) => {
  const month = Number(monthId.slice(0, 2));
  const year = Number(monthId.slice(2, 6));

  return month > 0 && month <= 12 && year <= dayjs().year();
};
