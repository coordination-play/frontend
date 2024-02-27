import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetGuildCumContributionPoints,
  useGetGuildMonthlyContributionPoints,
  useGetGuildMonthlyTotalContribution,
  useGetGuildName,
} from "@/contracts/read/guild";
import { useAccount } from "@starknet-react/core";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { setActiveGuild } from "@/state/organisation";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CopyButton } from "@/components/CopyButton";
import { truncateAddress } from "@/lib/utils";
import { useOrganisation } from "@/hooks/useOrganisation";
import { useGetSalaryPoolAmount } from "@/contracts/read/salary";
import { useGetOrgSalaryContract } from "@/contracts/read/organisation";

export const ActiveGuild = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { activeGuild: activeGuildAddress } = useOrganisation();

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
  const { address: orgAddress, monthId, monthIdDate } = useOrganisation();

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

  const { data: salaryAdr = "", isLoading: isSalaryAdrLoading } =
    useGetOrgSalaryContract({ address: orgAddress });

  const { data: salaryPoolAmount, isLoading: isSalaryPoolAmountLoading } =
    useGetSalaryPoolAmount({
      address: salaryAdr,
      args: {
        monthId,
        guildAddress: address,
      },
    });

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1">
        {/* <p className="font-semibold text-2xl">Guild</p> */}

        <div className="space-y-2">
          {[
            {
              label: `Total Points guild earned in ${monthIdDate.format(
                "MMM YYYY"
              )}:`,
              value: totalContribution,
              isLoading: isTotalContributionLoading,
            },
            salaryAdr
              ? {
                  label: `Pool amount guild earned in ${monthIdDate.format(
                    "MMM YYYY"
                  )}:`,
                  value: salaryPoolAmount?.label || "0",
                  isLoading: isSalaryAdrLoading || isSalaryPoolAmountLoading,
                }
              : null,
          ].map((c, i) => {
            if (!c) return;
            return (
              <InfoBox key={i} loading={isTotalContributionLoading} {...c} />
            );
          })}
        </div>
      </div>

      {isConnected ? (
        <div className="space-y-1">
          {/* <p className="font-semibold text-2xl">You</p> */}

          <div className="space-y-2">
            {[
              {
                label: `Total points you earned in ${monthIdDate.format(
                  "MMM YYYY"
                )}:`,
                value: monthlyContributionPoints,
                isLoading:
                  isMonthlyContributionPointsLoading ||
                  isTotalContributionLoading,
              },
              {
                label: "Total points you earned all time:",
                value: cumContributionPoints,
                isLoading:
                  isCumContributionPointsLoading || isTotalContributionLoading,
              },
            ].map((c, i) => (
              <InfoBox key={i} loading={isTotalContributionLoading} {...c} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const InfoBox = ({
  label,
  value,
  loading,
}: {
  label: string;
  value: string | number;
  loading: boolean;
}) => {
  return (
    <div className="space-x-2 flex items-center h-5">
      <p className="text-sm">{label}</p>

      {loading ? (
        <Skeleton className="w-10 h-5" />
      ) : (
        <span className="text-sm text-foreground font-bold">{value}</span>
      )}
    </div>
  );
};
