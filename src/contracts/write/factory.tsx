import { useAccount, useContract, useProvider } from "@starknet-react/core";
import { CONTRACTS_ADDRESSES, FactoryABI } from "../contracts";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { CallData, cairo } from "starknet";
import { useOrgCreationDeposit } from "../read/factory";

export const useCreateOrganisationContract = () => {
  const { provider } = useProvider();
  const { account } = useAccount();

  const { contract } = useContract({
    abi: FactoryABI,
    address: CONTRACTS_ADDRESSES.FACTORY,
    provider,
  });

  const {
    data: creationDeposit = 0,
    // isLoading: isCreationDepositLoading,
    isError: isCreationDepositError,
    error: creationDepositError,
  } = useOrgCreationDeposit();

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

  const createOrganisation = async ({ name }: { name: string }) => {
    if (!contract || !account) return;

    console.log("creationDeposit", creationDeposit);

    try {
      if (isCreationDepositError) {
        throw creationDepositError;
      }

      setState({
        isLoading: true,
        isError: false,
        isSuccess: false,
        error: null,
      });

      // transaction
      const multiCall = await account.execute([
        // Calling ETH Token contract
        {
          contractAddress: CONTRACTS_ADDRESSES.ETH_TOKEN,
          entrypoint: "approve",
          calldata: CallData.compile({
            spender: CONTRACTS_ADDRESSES.FACTORY,
            amount: cairo.uint256(BigInt(creationDeposit)),
          }),
        },
        // Calling Factory contract
        {
          contractAddress: CONTRACTS_ADDRESSES.FACTORY,
          entrypoint: "create_organisation",
          calldata: CallData.compile({
            name: cairo.felt(name),
            metadata: [cairo.felt(0)],
          }),
        },
      ]);
      await provider.waitForTransaction(multiCall.transaction_hash);

      setState({
        isLoading: false,
        isError: false,
        isSuccess: true,
        error: null,
      });

      toast({
        title: "Organization Created",
        // description: "successMessage",
      });
    } catch (err) {
      setState({
        isLoading: false,
        isError: true,
        isSuccess: false,
        error: err,
      });

      console.error(`failed to create organisation: `, { error: err });

      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: `failed to create organisation`,
      });
    }
  };

  return { createOrganisation, ...state };
};
