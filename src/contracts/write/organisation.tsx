import { useAccount, useContract, useProvider } from "@starknet-react/core";
import { CONTRACTS_ADDRESSES, OrganisationABI } from "../contracts";
import { useState } from "react";
import { CallData } from "starknet";
import {
  useGetOrgSalaryContract,
  useGetOrgTreasuryContract,
} from "../read/organisation";

// deploy salary & treasury contracts
export const useDeployOrganisationContracts = ({
  address,
}: {
  address: string;
}) => {
  const { provider } = useProvider();
  const { account, address: accountAddress = "" } = useAccount();

  const { contract } = useContract({
    abi: OrganisationABI,
    address,
    provider,
  });

  const { refetch: refetchSalary } = useGetOrgSalaryContract({ address });
  const { refetch: refetchTreasury } = useGetOrgTreasuryContract({ address });

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

  const deploySalaryAndTreasuryContract = async (tokenAddress?: string) => {
    if (!contract) {
      throw new Error(`Contract not found`);
    }

    if (!account || !address) {
      throw new Error(`Wallet not connected`);
    }

    try {
      setState({
        isLoading: true,
        isError: false,
        isSuccess: false,
        error: null,
      });

      // transaction
      const multiCall = await account.execute([
        {
          contractAddress: address,
          entrypoint: "update_salary_distributor_contract",
          calldata: CallData.compile({
            // owner: accountAddress,
            token: tokenAddress || CONTRACTS_ADDRESSES.ETH_TOKEN,
          }),
        },
        {
          contractAddress: address,
          entrypoint: "add_treasury_contract",
          calldata: CallData.compile({
            owner: accountAddress,
          }),
        },
      ]);

      await provider.waitForTransaction(multiCall.transaction_hash);

      // refetch
      refetchSalary();
      refetchTreasury();

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

      console.error(`failed to deploy contracts: `, { error: err });

      if (
        ((err as unknown as { message?: string })?.message as string) ===
        "User abort"
      ) {
        throw new Error(`User aborted the transaction`);
      }

      throw new Error(`Failed to deploy contracts`);
    }
  };

  return { deploySalaryAndTreasuryContract, ...state };
};
