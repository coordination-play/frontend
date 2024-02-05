import { Tooltip } from "@/components/Tooltip";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetOrgMetadata,
  useGetOrgName,
  useGetOrgTreasuryContract,
} from "@/contracts/read/organisation";
import { useOrganisation } from "@/hooks/useOrganisation";

// import { useGetHelia } from "@/hooks/useHelia";
import { useReadETHContract } from "@/contracts/read/eth";
import { useOrgMetadataJSON } from "@/hooks/useMetadata";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPinataUrl } from "@/lib/pinata";
import { Button } from "@/components/ui/button";
import { GlobeIcon, MessageCircleMoreIcon } from "lucide-react";

export const OrgHeader = () => {
  const { address } = useOrganisation();
  const { data: name, isLoading: isNameLoading } = useGetOrgName({ address });

  const { data: metadataCid = "", isLoading: isMetadataCidLoading } =
    useGetOrgMetadata({
      address,
    });

  const { data: metadata, isLoading: isMetadataLoading } =
    useOrgMetadataJSON(metadataCid);

  const description = metadata?.description;
  const discord = metadata?.socials?.discord;
  const website = metadata?.socials?.website;

  // treasury
  const { data: treasuryAdr = "", isLoading: isTreasuryAdrLoading } =
    useGetOrgTreasuryContract({ address });

  const { data: treasuryBalance = 0, isLoading: isTreasuryBalanceLoading } =
    useReadETHContract({
      functionName: "balanceOf",
      args: [treasuryAdr],
      enabled: !!treasuryAdr,
    });

  if (isNameLoading || isMetadataCidLoading) {
    return <Skeleton className="w-full h-80" />;
  }

  return (
    <div className="w-full bg-foreground/5 h-80 rounded-md p-4 gap-4 text-center flex flex-col items-center">
      <div className="w-16 h-16">
        {isMetadataLoading ? (
          <Skeleton className="h-full w-full bg-foreground/20 rounded-full" />
        ) : (
          <Avatar className="w-full h-full">
            <AvatarImage src={getPinataUrl(metadata?.logo)} />
            <AvatarFallback className="bg-foreground/10">
              {name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      <h1 className="font-medium text-foreground text-2xl">{name}</h1>

      {(!metadata || !metadataCid) && !isMetadataLoading ? (
        <p className="italic text text-foreground/50"> No metadata found</p>
      ) : null}

      {description ? (
        <h1 className="text-foreground/60 text">{description}</h1>
      ) : null}

      <div className="flex items-center justify-center">
        {discord ? (
          <Button
            variant="icon"
            size="icon"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <a href={discord} target="_blank">
              <MessageCircleMoreIcon className="w-5 h-5" />
            </a>
          </Button>
        ) : null}

        {website ? (
          <Button
            variant="icon"
            size="icon"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <a href={website} target="_blank">
              <GlobeIcon className="w-5 h-5" />
            </a>
          </Button>
        ) : null}
      </div>

      <div className="flex bg-foreground/10 p-2 gap-2 rounded-md w-full mt-auto">
        <div className="flex-1 flex flex-col items-start">
          <p className="text-xs text-foreground">Contributors</p>

          <Tooltip text="In development">***</Tooltip>
        </div>

        <Separator orientation="vertical" className="bg-foreground/40" />

        <div className="flex-1 flex flex-col items-start max-w-[50%] overflow-hidden">
          <p className="text-xs text-foreground">Treasury</p>

          <div className="w-full h-6 text-left overflow-ellipsis">
            {isTreasuryAdrLoading || isTreasuryBalanceLoading ? (
              <Skeleton className="h-full w-28 bg-foreground/10" />
            ) : (
              <Tooltip text={Number(treasuryBalance) / Math.pow(10, 18)}>
                {Number(Number(treasuryBalance) / Math.pow(10, 18)) || "--"}
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
