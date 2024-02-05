import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  useGetOrgSalaryContract,
  useGetOrgTreasuryContract,
} from "@/contracts/read/organisation";
import { useDeployOrganisationContracts } from "@/contracts/write/organisation";
import { useOrganisation } from "@/hooks/useOrganisation";
import { RocketIcon } from "lucide-react";
import { toast } from "sonner";

export const ContractsAlert = () => {
  const { address, isOwner } = useOrganisation();

  const {
    data: salaryAdr = "",
    isLoading: isSalaryAdrLoading,
    isError: isSalaryAdrError,
  } = useGetOrgSalaryContract({ address });
  const {
    data: tresuryAdr = "",
    isLoading: isTresuryAdrLoading,
    isError: isTreasuryAdrError,
  } = useGetOrgTreasuryContract({ address });

  const deployContractsMutate = useDeployOrganisationContracts({ address });

  const onClickDeploy = () => {
    toast.promise(deployContractsMutate.deploySalaryAndTreasuryContract, {
      loading: "Deploying contracts...",
      success: () => {
        return `Successfully deployed the Treasury & Salary contracts. Data has take couple minutes to reflect`;
      },
      error: (err: { message: string }) => {
        return err?.message || "Failed to deploy the contracts";
      },
    });
  };

  // should be owner
  if (!isOwner) return null;

  if (
    isSalaryAdrLoading ||
    isTresuryAdrLoading ||
    isSalaryAdrError ||
    isTreasuryAdrError
  ) {
    return null;
  }

  if (salaryAdr && tresuryAdr) return null;

  return (
    <Alert className="bg-foreground/5 flex items-center">
      <RocketIcon className="h-4 w-4" />

      <div className="flex flex-col">
        <AlertTitle>Salary & Treasury contract not deployed</AlertTitle>
        <AlertDescription>
          Deploy your salary and treasury contracts to pay & manage funds.
        </AlertDescription>
      </div>

      <Button
        className="ml-auto w-fit"
        disabled={
          deployContractsMutate.isLoading || deployContractsMutate.isSuccess
        }
        onClick={onClickDeploy}
      >
        {deployContractsMutate.isLoading ? <Spinner /> : "Deploy"}
      </Button>
    </Alert>
  );
};
