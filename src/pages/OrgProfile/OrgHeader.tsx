import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetOrgMetadata,
  useGetOrgName,
} from "@/contracts/read/organisation";
import { useOrganisation } from "@/hooks/useOrganisation";

export const OrgHeader = () => {
  const { address } = useOrganisation();
  const { data: name, isLoading: isNameLoading } = useGetOrgName({ address });
  const { isLoading: isMetadataLoading } = useGetOrgMetadata({
    address,
  });

  if (isNameLoading || isMetadataLoading) {
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
          <p className="text-foreground">300</p>
        </div>

        <Separator orientation="vertical" className="bg-foreground/20" />

        <div className="flex-1 flex flex-col items-start">
          <p className="text-xs text-foreground">Treseroy</p>
          <p className="text-foreground">157k</p>
        </div>
      </div>
    </div>
  );
};
