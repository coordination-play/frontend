import { num } from "starknet";
import { UseContractReadProps, useContractRead } from ".";
import { SalaryABI } from "../contracts";

import * as z from "zod";

const readSalary = {
  token: {
    returnType: z.bigint(),
    parsedType: z.string().optional(),
    parse: function (data: unknown): z.infer<typeof this.parsedType> {
      if (!data) return undefined;

      // parse
      const parsedData = this.returnType.parse(data);

      return num.toHex(parsedData.toString());
    },
  },
  get_cum_salary: {
    returnType: z.bigint(),
    parsedType: z.number().optional(),
    parse: function (data: unknown): z.infer<typeof this.parsedType> {
      if (!data) return undefined;

      const parsedData = this.returnType.parse(data);
      return Number(parsedData.toString() || 0);
    },
  },
  get_claimed_salary: {
    returnType: z.bigint(),
    parsedType: z.number().optional(),
    parse: function (data: unknown): z.infer<typeof this.parsedType> {
      if (!data) return undefined;

      const parsedData = this.returnType.parse(data);
      return Number(parsedData.toString() || 0);
    },
  },
} as const;

const useReadSalaryContract = <R,>(props: UseContractReadProps) =>
  useContractRead<R>({
    abi: SalaryABI,
    ...props,
  });

// HOOKS
type Props<T> = {
  address: string;
  args?: T;
};

export const useGetSalaryToken = (props: Props<unknown>) => {
  return useReadSalaryContract<z.infer<typeof readSalary.token.parsedType>>({
    functionName: "token",
    address: props.address,
    parseResultFn: (d) => readSalary.token.parse(d),
  });
};

export const useGetCumSalary = (props: Props<[string]>) => {
  return useReadSalaryContract<
    z.infer<typeof readSalary.get_cum_salary.parsedType>
  >({
    functionName: "get_cum_salary",
    address: props.address,
    args: props.args,
    parseResultFn: (d) => readSalary.get_cum_salary.parse(d),
  });
};

export const useGetClaimedSalary = (props: Props<[string]>) => {
  return useReadSalaryContract<
    z.infer<typeof readSalary.get_claimed_salary.parsedType>
  >({
    functionName: "get_claimed_salary",
    address: props.address,
    args: props.args,
    parseResultFn: (d) => readSalary.get_claimed_salary.parse(d),
  });
};