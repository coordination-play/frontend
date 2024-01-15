import { useAccount, useContract, useProvider } from "@starknet-react/core";
import { CONTRACTS_ADDRESSES, OrganisationABI } from "../contracts";
import { useToast } from "@/components/ui/use-toast";
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

  const deploySalaryAndTreasuryContract = async () => {
    if (!contract || !account) return;

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
          entrypoint: "update_salary_contract",
          calldata: CallData.compile({
            owner: accountAddress,
            token: CONTRACTS_ADDRESSES.ETH_TOKEN,
          }),
        },
        {
          contractAddress: address,
          entrypoint: "update_treasury_contract",
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

      toast({
        title: "Contracts Deployed",
        // description: "successMessage",
      });
    } catch (err) {
      setState({
        isLoading: false,
        isError: true,
        isSuccess: false,
        error: err,
      });

      console.error(`failed to deploy contracts: `, { error: err });

      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: `failed to deploy contracts`,
      });
    }
  };

  return { deploySalaryAndTreasuryContract, ...state };
};
