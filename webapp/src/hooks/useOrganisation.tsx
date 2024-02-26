import { useGetOrgIsGranted } from "@/contracts/read/organisation";
import { getDateFromMonthId } from "@/lib/utils";
import { useOrgState } from "@/state/organisation";
import { useAccount } from "@starknet-react/core";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

export const useOrganisation = () => {
  const { address = "" } = useParams();

  const { address: account = "" } = useAccount();
  const { data: isOwner, isLoading: isOwnerLoading } = useGetOrgIsGranted({
    address,
    where: address,
    who: account,
    permissionId: "ROOT_PERMISSION_ID",
  });

  const { monthId, activeGuild } = useOrgState();

  const monthIdDate = useMemo(() => {
    return getDateFromMonthId(monthId);
  }, [monthId]);

  return {
    address,
    monthId,
    monthIdDate,
    activeGuild,
    isOwner,
    isLoading: account && isOwnerLoading,
  };
};
