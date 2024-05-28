import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { CONTRACTS_ADDRESSES } from "@/contracts/contracts";
import {
  useGetOrgSalaryContract,
  useGetOrgTreasuryContract,
} from "@/contracts/read/organisation";
import { useDeployOrganisationContracts } from "@/contracts/write/organisation";
import { useOrganisation } from "@/hooks/useOrganisation";
import { useAccount } from "@starknet-react/core";
import { RocketIcon } from "lucide-react";
import { toast } from "sonner";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

const formSchema = z.object({
  tokenAddress: z
    .union([
      z
        .string()
        .min(66, "Address is too short, must be 66 chars long including 0x")
        .refine((value) => !value || /^0x[a-fA-F0-9]{64}$/g.test(value), {
          message: "Invalid address",
        }),
      z.string().length(0),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

export const ContractsAlert = () => {
  const { isConnected } = useAccount();
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

  // form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenAddress: `${CONTRACTS_ADDRESSES.ETH_TOKEN}`,
    },
  });

  const onFormSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);

    toast.promise(
      () =>
        deployContractsMutate.deploySalaryAndTreasuryContract(
          values.tokenAddress
        ),
      {
        loading: "Deploying contracts...",
        success: () => {
          return `Successfully deployed the Treasury & Salary contracts. Data can take couple minutes to reflect`;
        },
        error: (err: { message: string }) => {
          return err?.message || "Failed to deploy the contracts";
        },
      }
    );
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

      <Dialog>
        <DialogTrigger asChild>
          <Button className="ml-auto w-fit gap-2" disabled={!isConnected}>
            Deploy
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader className="gap-2">
            <DialogTitle>Deploy Contracts</DialogTitle>
            <DialogDescription>
              Deploy salary and treasury contracts to pay & manage funds in your
              organisation.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onFormSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="tokenAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token Address (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="0x" {...field} />
                    </FormControl>
                    <FormDescription>
                      Address of the token contract to use for salary payments
                      &nbsp; <b>(default: ETH)</b>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="submit"
                  className="ml-auto w-fit gap-2"
                  disabled={
                    deployContractsMutate.isLoading ||
                    deployContractsMutate.isSuccess ||
                    !isConnected
                  }
                >
                  {deployContractsMutate.isLoading ? <Spinner /> : <>Deploy</>}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Alert>
  );
};
