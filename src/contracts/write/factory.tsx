import { useAccount, useContract, useProvider } from "@starknet-react/core";
import { CONTRACTS_ADDRESSES, FactoryABI } from "../contracts";
import { useState } from "react";
import { CallData, cairo, shortString } from "starknet";
import { useOrgCreationDeposit } from "../read/factory";
import { useHelia } from "@/hooks/useHelia";

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
    isError: isCreationDepositError,
    error: creationDepositError,
  } = useOrgCreationDeposit();

  const helia = useHelia();

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

  const createOrganisation = async ({
    name,
    description,
    discord,
    website,
    logo,
  }: {
    name: string;
    description: string;
    discord?: string;
    website?: string;
    logo?: Buffer;
  }) => {
    if (!contract || !account) return;

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

      // IPFS - metadata & logo
      const logoCid = await helia.strings.add(logo?.toString() || "");
      const metadataCid = await helia.json.add({
        logo: logoCid.toString(),
        description,
        discord,
        website,
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
            // metadata: shortString.splitLongString(cid),
            metadata: shortString.splitLongString(metadataCid.toString()),
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
    } catch (err) {
      setState({
        isLoading: false,
        isError: true,
        isSuccess: false,
        error: err,
      });

      console.error(`failed to create organistion: `, { error: err });

      if (
        ((err as unknown as { message?: string })?.message as string) ===
        "User abort"
      ) {
        throw new Error(`User aborted the transaction`);
      }

      throw new Error(`Failed to create organistion`);
    }
  };

  return { createOrganisation, ...state };
};
