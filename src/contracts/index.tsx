import {
  UseContractReadProps,
  useAccount,
  useContract,
  useContractRead,
  useProvider,
} from "@starknet-react/core";

import FactoryABI from "./abis/Factory.json";
import OrganisationABI from "./abis/Organisation.json";
import GuildABI from "./abis/Guild.json";
import SalaryABI from "./abis/Salary.json";
import ETHTokenABI from "./abis/ETHToken.json";

import { getEnv } from "@/lib/env";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// addresses
export const CONTRACTS_ADDRESSES = {
  FACTORY: getEnv("VITE_FACTORY_CONTRACT_ADDRESS"),
  ORGANISATION: getEnv("VITE_ORGANISATION_CONTRACT_ADDRESS"),
  GUILD: getEnv("VITE_GUILD_CONTRACT_ADDRESS"),
  SALARY: getEnv("VITE_SALARY_CONTRACT_ADDRESS"),
  ETH_TOKEN: getEnv("VITE_ETH_TOKEN_CONTRACT_ADDRESS"),
};

// read
export const useReadFactoryContract = (props: UseContractReadProps) =>
  useContractRead({
    abi: FactoryABI,
    address: CONTRACTS_ADDRESSES.FACTORY,
    ...props,
  });

export const useReadOrgansationContract = (props: UseContractReadProps) =>
  useContractRead({
    abi: OrganisationABI,
    address: CONTRACTS_ADDRESSES.ORGANISATION,
    ...props,
  });

export const useReadGuildContract = (props: UseContractReadProps) =>
  useContractRead({
    abi: GuildABI,
    address: CONTRACTS_ADDRESSES.GUILD,
    ...props,
  });

export const useReadSalaryContract = (props: UseContractReadProps) =>
  useContractRead({
    abi: SalaryABI,
    address: CONTRACTS_ADDRESSES.SALARY,
    ...props,
  });

export const useReadETHTokenContract = (props: UseContractReadProps) =>
  useContractRead({
    abi: ETHTokenABI,
    address: CONTRACTS_ADDRESSES.ETH_TOKEN,
    ...props,
  });

// write
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
  fnName: string,
  options: WriteOptions
) =>
  useWriteContract({
    abi: OrganisationABI,
    address: CONTRACTS_ADDRESSES.ORGANISATION,
    fnName,
    ...options,
  });

export const useWriteGuildContract = (fnName: string, options: WriteOptions) =>
  useWriteContract({
    abi: GuildABI,
    address: CONTRACTS_ADDRESSES.GUILD,
    fnName,
    ...options,
  });

export const useWriteSalaryContract = (fnName: string, options: WriteOptions) =>
  useWriteContract({
    abi: SalaryABI,
    address: CONTRACTS_ADDRESSES.SALARY,
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

  const { toast } = useToast();

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

      const call = contract.populate(fnName, args as undefined);
      const tx = await contract[fnName](call.calldata);
      await provider.waitForTransaction(tx.transaction_hash);

      setState({
        isLoading: false,
        isError: false,
        isSuccess: true,
        error: null,
      });

      toast({
        title: "Transaction successful",
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

      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: `failed to execute '${fnName}'`,
      });
    }
  };

  return { writeAsyncAndWait, ...state };
};
