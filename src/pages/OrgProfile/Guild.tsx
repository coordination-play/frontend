import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetGuildCumContributionPoints,
  useGetGuildMonthlyContributionPoints,
  useGetGuildMonthlyTotalContribution,
} from "@/contracts/read/guild";
import { useOrganisation } from "@/hooks/useOrganisation";
import { truncateAddress } from "@/lib/utils";
import { useAccount } from "@starknet-react/core";

type GuildProps = {
  name: string;
  address: string;
};

export const Guild = ({ name, address }: GuildProps) => {
  const { monthId } = useOrganisation();
  const { address: account = "", isConnected } = useAccount();

  const { data: totalContribution = 0, isLoading: isTotalContributionLoading } =
    useGetGuildMonthlyTotalContribution({
      address,
      monthId,
    });

  const {
    data: cumContributionPoints = 0,
    isLoading: isCumContributionPointsLoading,
  } = useGetGuildCumContributionPoints({
    address,
    contributor: account,
  });

  const {
    data: monthlyContributionPoints = 0,
    isLoading: isMonthlyContributionPointsLoading,
  } = useGetGuildMonthlyContributionPoints({
    address,
    contributor: account,
    monthId,
  });

  //   console.log({
  //     totalContribution,
  //     cumContributionPoints,
  //     monthlyContributionPoints,
  //   });

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="flex p-4 bg-foreground/5 gap-6 items-start flex-col rounded-sm border border-border">
          <div className="flex flex-col gap-1 max-w-xl">
            <p className="text text-foreground font-medium">{name}</p>

            <p className="font-normal text-sm text-foreground/80">
              {/* 8 Contributors */}
              {truncateAddress(address)}
            </p>
          </div>
        </div>
      </HoverCardTrigger>

      <HoverCardContent className="w-80 space-y-4">
        <div className="space-y-1">
          <p className="font-bold">Guild</p>

          <div className="space-y-2">
            {[
              {
                label: "Total Points this month:",
                value: totalContribution,
                isLoading: isTotalContributionLoading,
              },
            ].map((c, i) => (
              <div key={i} className="space-x-2 flex items-center">
                <p className="text-sm">{c.label}</p>

                {isTotalContributionLoading ? (
                  <Skeleton className="w-20 h-6" />
                ) : (
                  <span className="text-sm text-foreground font-bold">
                    {c.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {isConnected ? (
          <div className="space-y-1">
            <p className="font-bold">You</p>

            <div className="space-y-2">
              {[
                {
                  label: "Total Earned this month:",
                  value:
                    monthlyContributionPoints +
                    " " +
                    (monthlyContributionPoints
                      ? `(${(
                          (monthlyContributionPoints / totalContribution) *
                          100
                        ).toFixed(2)}%)`
                      : ""),
                  isLoading:
                    isMonthlyContributionPointsLoading ||
                    isTotalContributionLoading,
                },
                {
                  label: "Total Points all time:",
                  value: cumContributionPoints,
                  isLoading: isCumContributionPointsLoading,
                },
              ].map((c, i) => (
                <div key={i} className="space-x-2 flex items-center">
                  <p className="text-sm">{c.label}</p>

                  {isTotalContributionLoading ? (
                    <Skeleton className="w-20 h-6" />
                  ) : (
                    <span className="text-sm text-foreground font-bold">
                      {c.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </HoverCardContent>
    </HoverCard>
  );
};
