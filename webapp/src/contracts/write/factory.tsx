import { useAccount, useContract, useProvider } from "@starknet-react/core";
import { CONTRACTS_ADDRESSES, FactoryABI } from "../contracts";
import { useState } from "react";
import { CallData, cairo, shortString } from "starknet";
import { useOrgCreationDeposit } from "../read/factory";
import { FetchAPI } from "@/lib/api";
import { toast } from "sonner";

export const useCreateOrganisationContract = () => {
  const { provider } = useProvider();
  const { account } = useAccount();

  const { contract } = useContract({
    abi: FactoryABI,
    address: CONTRACTS_ADDRESSES.FACTORY,
    provider,
  });

  const {
    data: creationDeposit,
    isError: isCreationDepositError,
    error: creationDepositError,
  } = useOrgCreationDeposit();

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
    discord = "",
    website = "",
    logo,
  }: {
    name: string;
    description: string;
    discord?: string;
    website?: string;
    logo?: File;
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

      const formData = new FormData();
      formData.append("logo", logo as Blob); // file is a Blob
      formData.append("name", name);
      formData.append("description", description);
      formData.append("discord", discord);
      formData.append("website", website);

      let metadataCid = "";
      try {
        const metadataRes = await FetchAPI("/metadata", {
          method: "POST",
          body: formData,
          // mode: "no-cors", // TODO
        });
        const metadataJson = await metadataRes.json();
        console.log("metadataJson", metadataJson);

        metadataCid = metadataJson.cid;
      } catch (err) {
        toast.error("Failed to upload logo");
        console.error(`failed to upload logo: `, { error: err });
      }

      // transaction
      const multiCall = await account.execute([
        // Calling ETH Token contract
        {
          contractAddress: CONTRACTS_ADDRESSES.ETH_TOKEN,
          entrypoint: "approve",
          calldata: CallData.compile({
            spender: CONTRACTS_ADDRESSES.FACTORY,
            amount: cairo.uint256(BigInt(creationDeposit?.value || 0n)),
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
