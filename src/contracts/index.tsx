import {
  UseContractReadProps,
  useContract,
  useContractRead,
  useProvider,
} from "@starknet-react/core";

import AttributionABI from "./abis/Attribution.json";
import SalaryABI from "./abis/Salary.json";

import { getEnv } from "@/lib/env";
import { useState } from "react";

// addresses
export const CONTRACTS_ADDRESSES = {
  ATTRIBUTION: getEnv("VITE_ATTRIBUTION_CONTRACT_ADDRESS"),
  SALARY: getEnv("VITE_SALARY_CONTRACT_ADDRESS"),
};

// read
export const useReadAttributionContract = (props: UseContractReadProps) =>
  useContractRead({
    abi: AttributionABI,
    address: CONTRACTS_ADDRESSES.ATTRIBUTION,
    ...props,
  });

export const useReadSalaryContract = (props: UseContractReadProps) =>
  useContractRead({
    abi: SalaryABI,
    address: CONTRACTS_ADDRESSES.SALARY,
    ...props,
  });

// write
export const useWriteSalaryContract = (fnName: string) =>
  useWriteContract({
    abi: SalaryABI,
    address: CONTRACTS_ADDRESSES.SALARY,
    fnName,
  });

export const useWriteAttributionContract = (fnName: string) =>
  useWriteContract({
    abi: AttributionABI,
    address: CONTRACTS_ADDRESSES.ATTRIBUTION,
    fnName,
  });

const useWriteContract = ({
  abi,
  address,
  fnName,
}: {
  abi: Array<unknown>;
  address: string;
  fnName: string;
}) => {
  const { provider } = useProvider();

  const { contract } = useContract({
    abi,
    address,
  });

  const [state, setState] = useState<{
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: unknown;
  }>({
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: null,
  });

  const writeAsyncAndWait = async (args: unknown) => {
    if (!contract) return;

    try {
      setState({
        isLoading: true,
        isError: false,
        isSuccess: false,
        error: null,
      });

      const call = contract.populate(fnName, args as undefined);
      const tx = await contract[fnName](call.calldata);
      await provider.waitForTransaction(tx.transaction_hash);

      setState({
        isLoading: false,
        isError: false,
        isSuccess: true,
        error: null,
      });
    } catch (err) {
      setState({
        isLoading: false,
        isError: true,
        isSuccess: false,
        error: err,
      });
    }
  };

  return { writeAsyncAndWait, ...state };
};
