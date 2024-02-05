import { useGetOrgOwner } from "@/contracts/read/organisation";
import { getMonthId } from "@/lib/utils";
import { useAccount } from "@starknet-react/core";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

export const useOrganisation = () => {
  const { address = "" } = useParams();

  const { address: account } = useAccount();
  const { data: owner } = useGetOrgOwner({ address });

  const monthId = useMemo(() => {
    return getMonthId(new Date().getMonth() + 1, new Date().getFullYear());
  }, []);

  return {
    address,
    monthId,
    isOwner: account && owner && account === owner,
  };
};
