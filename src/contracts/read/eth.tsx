import { UseContractReadProps, useContractRead } from "@starknet-react/core";
import { CONTRACTS_ADDRESSES, ETHTokenABI } from "../contracts";

export const useReadETHContract = (
  props: Omit<UseContractReadProps, "abi" | "address">
) =>
  useContractRead({
    abi: ETHTokenABI,
    address: CONTRACTS_ADDRESSES.ETH_TOKEN,
    ...props,
  });

export const useReadETHBalanceOf = (adr?: string) =>
  useReadETHContract({
    functionName: "balanceOf",
    args: [String(adr)],
    enabled: !!adr,
  });
