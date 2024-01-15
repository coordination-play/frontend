import { Tooltip } from "@/components/Tooltip";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetOrgMetadata,
  useGetOrgName,
  useGetOrgTreasuryContract,
} from "@/contracts/read/organisation";
import { useOrganisation } from "@/hooks/useOrganisation";

import { useGetHelia } from "@/hooks/useHelia";
import { useReadETHContract } from "@/contracts/read/eth";

export const OrgHeader = () => {
  const { address } = useOrganisation();
  const { data: name, isLoading: isNameLoading } = useGetOrgName({ address });

  const { data: metadataCid = "", isLoading: isMetadataCidLoading } =
    useGetOrgMetadata({
      address,
    });

  const { data: metadata } = useGetHelia({
    cid: metadataCid,
  });
  console.log("metadata", metadata);

  // treasury
  const { data: treasuryAdr = "", isLoading: isTreasuryAdrLoading } =
    useGetOrgTreasuryContract({ address });

  const { data: treasuryBalance = 0, isLoading: isTreasuryBalanceLoading } =
    useReadETHContract({
      functionName: "balanceOf",
      args: [treasuryAdr],
    });

  if (isNameLoading || isMetadataCidLoading) {
    return <Skeleton className="w-full h-40" />;
  }

  return (
    <div className="w-full bg-foreground/5 rounded-md p-4 gap-4 text-center flex flex-col items-center">
      <h1 className="font-medium text-foreground text-2xl">{name}</h1>

      <p className="text-foreground/50 text font-normal">
        {/* Creator DAO for application designers and developers working in web3. */}
        {/* {metadata} */}
      </p>

      <div className="flex bg-foreground/10 p-2 gap-2 rounded-md w-full">
        <div className="flex-1 flex flex-col items-start">
          <p className="text-xs text-foreground">Contributors</p>

          <Tooltip text="In development">***</Tooltip>
        </div>

        <Separator orientation="vertical" className="bg-foreground/40" />

        <div className="flex-1 flex flex-col items-start">
          <p className="text-xs text-foreground">Treasury</p>

          <div className="w-full h-6">
            {isTreasuryAdrLoading || isTreasuryBalanceLoading ? (
              <Skeleton className="h-full w-28 bg-foreground/10" />
            ) : (
              <p className="text-foreground text-left">
                {Number(Number(treasuryBalance) / Math.pow(10, 18)).toFixed(
                  2
                ) || "--"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
