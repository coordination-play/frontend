import { ConnectWalletModal } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useAccount } from "@starknet-react/core";

export const AllGuilds = () => {
  const { isConnected } = useAccount();

  const noGuilds = false;
  const isNew = isConnected && !noGuilds && true;

  return (
    <>
      {noGuilds ? (
        <div className="w-full bg-foreground/5 flex px-4 py-8 gap-1 items-center justify-center flex-col rounded-sm border border-border mt-4">
          <h6 className="font-medium text-2xl">Create a Guild</h6>
          <p className="font-normal text-sm text-foreground/50">
            All guilds of your organisation will be displayed here
          </p>

          <Button className="mt-4">Create a Guild</Button>
        </div>
      ) : null}

      {!isConnected ? (
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

      <div className="grid gap-3.5 grid-cols-3 grid-flow-row">
        <div className="flex p-4 bg-foreground/5 gap-6 items-start flex-col rounded-sm border border-border">
          <div className="flex flex-col gap-1 items-center max-w-xl text-center">
            <p className="text text-foreground font-medium">Development</p>

            <p className="font-normal text-sm text-foreground/80">
              8 Contributors
            </p>
          </div>
        </div>

        <div className="flex p-4 bg-foreground/5 gap-6 items-start flex-col rounded-sm border border-border">
          <div className="flex flex-col gap-1 items-center max-w-xl text-center">
            <p className="text text-foreground font-medium">Development</p>

            <p className="font-normal text-sm text-foreground/80">
              8 Contributors
            </p>
          </div>
        </div>

        <div className="flex p-4 bg-foreground/5 gap-6 items-start flex-col rounded-sm border border-border">
          <div className="flex flex-col gap-1 items-center max-w-xl text-center">
            <p className="text text-foreground font-medium">Development</p>

            <p className="font-normal text-sm text-foreground/80">
              8 Contributors
            </p>
          </div>
        </div>

        <div className="flex p-4 bg-foreground/5 gap-6 items-start flex-col rounded-sm border border-border">
          <div className="flex flex-col gap-1 items-center max-w-xl text-center">
            <p className="text text-foreground font-medium">Development</p>

            <p className="font-normal text-sm text-foreground/80">
              8 Contributors
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
