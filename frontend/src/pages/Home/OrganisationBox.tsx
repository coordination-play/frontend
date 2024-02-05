import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetOrgMetadata } from "@/contracts/read/organisation";
import { useOrgMetadataJSON } from "@/hooks/useMetadata";
import { getPinataUrl } from "@/lib/pinata";
import { truncateAddress } from "@/lib/utils";
import { Link } from "react-router-dom";

export const OrganisationBox = (org: { address: string; name: string }) => {
  const { data: metadataCid = "" } = useGetOrgMetadata({
    address: org.address,
  });

  const { data: metadata, isLoading: isMetadataLoading } =
    useOrgMetadataJSON(metadataCid);

  return (
    <Link
      to={`/org/${org.address}`}
      className="px-4 py-4 flex items-center gap-4 border-border rounded-lg bg-foreground/5"
    >
      <div className="w-14 h-14">
        {isMetadataLoading && metadataCid ? (
          <Skeleton className="h-full w-full bg-foreground/20 rounded-full" />
        ) : (
          <Avatar className="w-full h-full">
            <AvatarImage src={getPinataUrl(metadata?.logo)} />
            <AvatarFallback className="bg-foreground/10">
              {org.name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      <div className="flex flex-col">
        <h6 className="text-lg text-foreground/90 font-medium">{org.name}</h6>
        <p className="text-sm text-foreground/40">
          {truncateAddress(org.address)}
        </p>
      </div>

      {/* <div className="p-1.5 rounded-md border-border border ml-auto">
        <p className="text-sm text-foreground/70">
          300 Contributors{" "}
        </p>
      </div> */}
    </Link>
  );
};
