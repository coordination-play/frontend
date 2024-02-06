import { useGetOrgOwner } from "@/contracts/read/organisation";
import { setMonthId } from "@/state/organisation";
import { useAccount } from "@starknet-react/core";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const useOrganisation = () => {
  const { address = "" } = useParams();

  const { address: account } = useAccount();
  const { data: owner } = useGetOrgOwner({ address });

  const [monthYear, setMonthYear] = useState({ month: 0, year: 0 });

  // const [monthId, setMonthId] = useState(() => {
  //   return getMonthId(monthYear.month, monthYear.year);
  // });

  const updateMonthYear = (month: number, year: number) => {
    if (month === 0) {
      toast.error("0 is not a valid month id, months are 1 indexed");
    }

    console.log("updateMonthYear", month, year);

    setMonthYear({ month, year });
    setMonthId(month, year);
    // setMonthId(getMonthId(monthYear.month, monthYear.year));
  };

  return {
    address,
    monthYear,
    updateMonthYear,
    isOwner: account && owner && account === owner,
  };
};
