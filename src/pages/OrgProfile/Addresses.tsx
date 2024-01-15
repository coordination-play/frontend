import { CopyButton } from "@/components/CopyButton";
import {
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
    ];
  }, [address, salaryAdr, isSalaryAdrLoading, tresuryAdr, isTresuryAdrLoading]);

  return (
    <div className="flex flex-col gap-3">
      {addresses.map(({ label, text, value }, i) => (
        <div key={i} className="flex justify-between items-center gap-2">
          <p className="text-foreground/50 text-sm">{label}</p>
          <div className="flex items-center gap-2">
            <p className="text-foreground">{text}</p>
            <CopyButton text={value} />
          </div>
        </div>
      ))}
    </div>
  );
};
