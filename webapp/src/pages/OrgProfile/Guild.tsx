import { useGetGuildCumContributionPoints } from "@/contracts/read/guild";
import { cn, truncateAddress } from "@/lib/utils";
import { setActiveGuild, useGuildState } from "@/state/guild";
import { useAccount } from "@starknet-react/core";
import { Circle } from "lucide-react";

type GuildProps = {
  name: string;
  address: string;
};

export const Guild = ({ name, address }: GuildProps) => {
  const { activeGuild } = useGuildState();

  const { address: account = "" } = useAccount();

  const { data: monthlyContributionPoints = 0 } =
    useGetGuildCumContributionPoints({
      address,
      contributor: account,
    });

  return (
    <div
      className={cn(
        "flex p-4 bg-foreground/5 gap-6 items-start flex-col rounded-sm border border-border cursor-pointer",
        activeGuild === address
          ? "bg-primary/20 border border-primary/50 transition-colors"
          : ""
      )}
      onClick={() => setActiveGuild(address)}
    >
      <div className="flex flex-col gap-1 max-w-xl w-full">
        <p className="text text-foreground font-medium">{name}</p>

        <div className="flex items-center justify-between w-full">
          <p className="font-normal text-sm text-foreground/80">
            {truncateAddress(address)}
          </p>

          {monthlyContributionPoints ? (
            <p className="text-success text-sm flex items-center gap-1">
              <Circle className="w-1.5 h-1.5 fill-current" />
              {monthlyContributionPoints} points
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
