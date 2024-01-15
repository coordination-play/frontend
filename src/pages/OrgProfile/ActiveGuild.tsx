import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetGuildCumContributionPoints,
  useGetGuildMonthlyContributionPoints,
  useGetGuildMonthlyTotalContribution,
  useGetGuildName,
} from "@/contracts/read/guild";
import { useOrganisation } from "@/hooks/useOrganisation";
import { useAccount } from "@starknet-react/core";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { setActiveGuild, useGuildState } from "@/state/guild";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CopyButton } from "@/components/CopyButton";
import { truncateAddress } from "@/lib/utils";

export const ActiveGuild = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { activeGuild: activeGuildAddress } = useGuildState();

  const { data: guildName, isLoading: isGuildNameLoading } = useGetGuildName({
    address: activeGuildAddress,
  });

  if (!activeGuildAddress) {
    return null;
  }

  if (isDesktop) {
    return (
      <div className="flex flex-col gap-6 pt-4 mt-6 border-t border-t-border">
        <div className="flex flex-col">
          <div className="h-12">
            {isGuildNameLoading ? (
              <Skeleton className="h-full w-36" />
            ) : (
              <p className="font-semibold text-3xl bg-foreground/5 rounded-md px-2 py-2 w-fit">
                {guildName}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {truncateAddress(activeGuildAddress)}
            <CopyButton text={activeGuildAddress} />
          </div>
        </div>

        <ActiveGuildContent address={activeGuildAddress} />
      </div>
    );
  }

  return (
    <Drawer
      open
      onOpenChange={(open) => {
        if (!open) {
          setActiveGuild("");
        }
      }}
    >
      <DrawerContent className="p-4">
        <DrawerHeader>
          <DrawerTitle className="font-bold">{guildName}</DrawerTitle>
        </DrawerHeader>

        <ActiveGuildContent address={activeGuildAddress} />
      </DrawerContent>
    </Drawer>
  );
};

type ActiveGuildContentProps = {
  address: string;
};

const ActiveGuildContent = ({ address }: ActiveGuildContentProps) => {
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

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1">
        <p className="font-semibold text-2xl">Guild</p>

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
          <p className="font-semibold text-2xl">You</p>

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
                      ).toFixed()}%)`
                    : ""),
                isLoading:
                  isMonthlyContributionPointsLoading ||
                  isTotalContributionLoading,
              },
              {
                label: "Total Points all time:",
                value:
                  cumContributionPoints +
                  " " +
                  (cumContributionPoints
                    ? `(${(
                        (cumContributionPoints / totalContribution) *
                        100
                      ).toFixed()}%)`
                    : ""),
                isLoading:
                  isCumContributionPointsLoading || isTotalContributionLoading,
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
    </div>
  );
};
