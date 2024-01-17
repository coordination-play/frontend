import { CopyButton } from "@/components/CopyButton";
import { Spinner } from "@/components/ui/spinner";
import {
  useGetOrgOwner,
  useGetOrgSalaryContract,
  useGetOrgTreasuryContract,
} from "@/contracts/read/organisation";
import { useOrganisation } from "@/hooks/useOrganisation";
import { truncateAddress } from "@/lib/utils";
import { useMemo } from "react";

export const OrgAddresses = () => {
  const { address } = useOrganisation();

  const { data: salaryAdr = "", isLoading: isSalaryAdrLoading } =
    useGetOrgSalaryContract({ address });
  const { data: tresuryAdr = "", isLoading: isTresuryAdrLoading } =
    useGetOrgTreasuryContract({ address });
  const { data: ownerAdr = "", isLoading: isOwnerAdrLoading } = useGetOrgOwner({
    address,
  });

  const addresses = useMemo(() => {
    return [
      {
        label: "Organisation",
        text: truncateAddress(address),
        value: address,
      },
      {
        label: "Salary",
        text: salaryAdr ? truncateAddress(salaryAdr) : "---",
        value: salaryAdr,
        loading: isSalaryAdrLoading,
      },
      {
        label: "Treasury",
        text: tresuryAdr ? truncateAddress(tresuryAdr) : "---",
        value: tresuryAdr,
        loading: isTresuryAdrLoading,
      },
      {
        label: "Owner",
        text: ownerAdr ? truncateAddress(ownerAdr) : "---",
        value: ownerAdr,
        loading: isOwnerAdrLoading,
      },
    ];
  }, [
    address,
    salaryAdr,
    isSalaryAdrLoading,
    tresuryAdr,
    isTresuryAdrLoading,
    ownerAdr,
    isOwnerAdrLoading,
  ]);

  return (
    <div className="flex flex-col gap-3">
      {addresses.map(({ label, text, value, loading }, i) => (
        <div key={i} className="flex justify-between items-center gap-2">
          <p className="text-foreground/50 text-sm">{label}</p>
          <div className="flex items-center gap-2">
            {loading ? (
              <Spinner className="w-4 h-4" />
            ) : (
              <p className="text-foreground">{text}</p>
            )}
            <CopyButton label={`${label} address`} text={value} />
          </div>
        </div>
      ))}
    </div>
  );
};
