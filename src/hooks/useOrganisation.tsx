import { useGetOrgOwner } from "@/contracts/read/organisation";
import { useAccount } from "@starknet-react/core";
import { useParams } from "react-router-dom";

export const useOrganisation = () => {
  const { address = "" } = useParams();

  const { address: account } = useAccount();
  const { data: owner } = useGetOrgOwner({ address });

  const monthId = 1;

  return { address, isOwner: account && owner && account === owner, monthId };
};