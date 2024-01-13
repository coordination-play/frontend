import { UseContractReadProps, useContractRead } from ".";
import { CONTRACTS_ADDRESSES, FactoryABI } from "../contracts";

const useReadGuildContract = <R,>(props: UseContractReadProps) =>
  useContractRead<R>({
    abi: FactoryABI,
    ...props,
  });
