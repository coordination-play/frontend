import {
  CONTRACTS_ADDRESSES,
  FactoryABI,
  GuildABI,
  OrganisationABI,
  SalaryABI,
} from "../contracts";

import { useAccount, useContract, useProvider } from "@starknet-react/core";
import { useState } from "react";
import { toast } from "sonner";

type WriteOptions = {
  successMessage?: string;
};

export const useWriteFactoryContract = (
  fnName: string,
  options: WriteOptions
) =>
  useWriteContract({
    abi: FactoryABI,
    address: CONTRACTS_ADDRESSES.FACTORY,
    fnName,
    ...options,
  });

export const useWriteOrganisationContract = (
  address: string,
  fnName: string,
  options: WriteOptions
) =>
  useWriteContract({
    address,
    abi: OrganisationABI,
    fnName,
    ...options,
  });

export const useWriteGuildContract = (
  address: string,
  fnName: string,
  options: WriteOptions
) =>
  useWriteContract({
    address,
    abi: GuildABI,
    fnName,
    ...options,
  });

export const useWriteSalaryContract = (
  address: string,
  fnName: string,
  options: WriteOptions
) =>
  useWriteContract({
    address,
    abi: SalaryABI,
    fnName,
    ...options,
  });

// util
const useWriteContract = ({
  abi,
  address,
  fnName,

  successMessage = "",
}: {
  abi: Array<unknown>;
  address: string;
  fnName: string;

  successMessage?: string;
}) => {
  const { provider } = useProvider();
  const { account } = useAccount();

  const { contract } = useContract({
    abi,
    address,
    provider,
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
    if (!contract || !account) return;

    contract.connect(account);

    try {
      setState({
        isLoading: true,
        isError: false,
        isSuccess: false,
        error: null,
      });

      toast("Transaction in progress..");

      const call = contract.populate(fnName, args as undefined);
      const tx = await contract[fnName](call.calldata);
      await provider.waitForTransaction(tx.transaction_hash);

      setState({
        isLoading: false,
        isError: false,
        isSuccess: true,
        error: null,
      });

      toast("Transaction successful", {
        description: successMessage,
      });
    } catch (err) {
      setState({
        isLoading: false,
        isError: true,
        isSuccess: false,
        error: err,
      });

      console.error(`failed to execute '${fnName}': `, { error: err });

      toast.error("Transaction Failed", {
        description: `failed to execute '${fnName}'`,
      });
    }
  };

  return { writeAsyncAndWait, ...state };
};
