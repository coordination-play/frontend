import { ConnectWalletModal } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetOrgAllGuilds } from "@/contracts/read/organisation";
import { useOrganisation } from "@/hooks/organisation";
import { truncateAddress } from "@/lib/utils";
import { useAccount } from "@starknet-react/core";

export const AllGuilds = () => {
  const { isConnected } = useAccount();

  const { address, isOwner } = useOrganisation();

  const { data, isLoading } = useGetOrgAllGuilds({
    address,
  });

  const hasGuilds = !!data?.count;
  const isNew = isConnected && hasGuilds && false; // is New

  if (isLoading) {
    return (
      <div className="grid gap-3.5 grid-cols-3 grid-flow-row">
        {[...Array(3)].map((_, i) => (
          <>
            <Skeleton key={i} className="h-32" />
          </>
        ))}
      </div>
    );
  }

  return (
    <>
      {data?.guilds.length ? (
        <div className="grid gap-3.5 grid-cols-3 grid-flow-row">
          {data?.guilds.map((guild, i) => (
            <div
              key={i}
              className="flex p-4 bg-foreground/5 gap-6 items-start flex-col rounded-sm border border-border"
            >
              <div className="flex flex-col gap-1 max-w-xl">
                <p className="text text-foreground font-medium">{guild.name}</p>

                <p className="font-normal text-sm text-foreground/80">
                  {/* 8 Contributors */}
                  {truncateAddress(guild.address)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {!hasGuilds && isOwner ? (
        <div className="w-full bg-foreground/5 flex px-4 py-8 gap-1 items-center justify-center flex-col rounded-sm border border-border">
          <h6 className="font-medium text-2xl">Create a Guild</h6>
          <p className="font-normal text-sm text-foreground/50">
            All guilds of your organisation will be displayed here
          </p>

          <Button className="mt-4">Create a Guild</Button>
        </div>
      ) : null}
      {!hasGuilds && !isOwner ? (
        <div className="w-full bg-foreground/5 flex px-4 py-8 gap-1 items-center justify-center flex-col rounded-sm border border-border">
          <h6 className="font-semibold text-2xl">No Guilds!</h6>
          <p className="font-normal text-sm text-foreground/70">
            No Guilds exist for this organisation.
          </p>
        </div>
      ) : null}

      {!isConnected && hasGuilds ? (
        <div className="w-full flex px-4 py-8 bg-foreground/5 gap-6 items-center justify-center flex-col rounded-sm border border-border">
          <div className="flex flex-col gap-1 items-center max-w-xl text-center">
            <p className="font-normal text-sm text-foreground/60">
              Connect wallet to start your contribution journey
            </p>
          </div>

          <ConnectWalletModal />
        </div>
      ) : null}

      {isNew ? (
        <div className="w-full flex px-4 py-8 bg-foreground/5 gap-6 items-center justify-center flex-col rounded-sm border border-border">
          <div className="flex flex-col gap-1 items-center max-w-xl text-center">
            <p className="font-normal text-sm text-foreground/60">
              You are just just one step away from starting your contribution
              journey
            </p>
          </div>

          <Button>Start Contributing</Button>
        </div>
      ) : null}
    </>
  );
};
