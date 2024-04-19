import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useGetOrgSalaryContract } from "@/contracts/read/organisation";
import { useGetClaimedSalary, useGetCumSalary } from "@/contracts/read/salary";
import { useWriteSalaryContract } from "@/contracts/write";
import { useOrganisation } from "@/hooks/useOrganisation";
import { useAccount } from "@starknet-react/core";
import { GiftIcon } from "lucide-react";
import { toast } from "sonner";
import BigNumber from "bignumber.js";
import { formatDecimals, formatDisplay } from "@/lib/numbers";
import { useMemo } from "react";

export const ClaimRewards = () => {
  const { address: account = "" } = useAccount();

  const { address } = useOrganisation();
  const { data: salaryAddress = "", isLoading: isSalaryAdrLoading } =
    useGetOrgSalaryContract({ address });

  const { data: cumSalary, isLoading: isCumSalaryLoading } = useGetCumSalary({
    address: salaryAddress,
    args: [account],
  });

  const { data: claimedSalary, isLoading: isClaimedSalaryLoading } =
    useGetClaimedSalary({
      address: salaryAddress,
      args: [account],
    });

  const hasClaimableSalary = !isCumSalaryLoading && cumSalary;

  const claimSalaryMutate = useWriteSalaryContract(
    salaryAddress,
    "claim_salary",
    {
      successMessage: "Salary claimed successfully",
    }
  );

  const onClaimSalary = async () => {
    toast.promise(claimSalaryMutate.writeAsyncAndWait([account]), {
      loading: "Claiming salary...",
      success: () => {
        return `Successfully claimed the salary. Data can take couple minutes to reflect`;
      },
      error: (err: { message: string }) => {
        return err?.message || "Failed to claim the salary";
      },
    });
  };

  const unclaimedSalary = useMemo(() => {
    return formatDecimals(
      BigInt(
        BigNumber(cumSalary?.value.toString() || "0")
          .minus(claimedSalary?.value.toString() || "0")
          .toString()
      ),
      18
    );
  }, [cumSalary, claimedSalary]);

  if (!account || isSalaryAdrLoading) {
    return null;
  }

  return (
    <div className="w-full border border-border rounded-md">
      <div className="flex gap-2 items-center p-4 border-b border-border">
        <GiftIcon className="w-4 h-4" />
        <p className="font-semibold text-foreground/90">Unclaimed Rewards</p>
      </div>

      {!salaryAddress ? (
        <p className="font-medium text p-4 text-destructive">
          No salary contract found
        </p>
      ) : (
        <div className="p-4 flex flex-col gap-2 pt-2">
          {isCumSalaryLoading || isClaimedSalaryLoading ? (
            <Skeleton className="w-full h-9" />
          ) : (
            <p className="font-semibold text-3xl text-foreground/90">
              ${formatDisplay(unclaimedSalary)}
            </p>
          )}

          {isClaimedSalaryLoading ? (
            <Skeleton className="w-full h-5" />
          ) : (
            <p className="text-sm text-foreground/60">
              {claimedSalary?.label || "0"} claimed
            </p>
          )}

          <Button
            className="w-full"
            disabled={
              !hasClaimableSalary ||
              claimSalaryMutate.isLoading ||
              claimSalaryMutate.isSuccess ||
              Number(unclaimedSalary) <= 0
            }
            onClick={onClaimSalary}
          >
            {claimSalaryMutate.isLoading ? <Spinner /> : "Claim"}
          </Button>
        </div>
      )}
    </div>
  );
};
