import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Spinner } from "@/components/ui/spinner";
import { useCreateOrganisationContract } from "@/contracts/write/factory";
import { DrawerDialog } from "@/components/DrawerDialog";
import { useState } from "react";
import { toast } from "sonner";
import { ImgUpload } from "@/components/ImgUpload";
import { useReadETHBalanceOf } from "@/contracts/read/eth";
import { useAccount } from "@starknet-react/core";
import { useOrgCreationDeposit } from "@/contracts/read/factory";
import BigNumber from "bignumber.js";

export const CreateOrgDialog = ({
  triggerClassName,
}: {
  triggerClassName?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button className={triggerClassName}>Create Organization</Button>
      }
      title="Create Organisation"
    >
      <CreateDAOForm onClose={() => setOpen(false)} />
    </DrawerDialog>
  );
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  logo: z.instanceof(File, {
    message: "Please upload an image file",
  }), // TODO: Validate image format
  description: z.string({
    required_error: "Short description is required",
  }),
  discord: z.string().trim().url().optional().or(z.literal("")),
  website: z.string().trim().url().optional().or(z.literal("")),
});

const CreateDAOForm = ({ onClose }: { onClose: () => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: undefined,
      discord: undefined,
      website: undefined,
      logo: undefined,
    },
  });

  const createOrgMutate = useCreateOrganisationContract();

  const { address } = useAccount();
  const {
    data: balance,
    isLoading: isBalanceLoading,
    status: balanceStatus,
  } = useReadETHBalanceOf(address);
  const {
    data: creationDeposit,
    isLoading: isCreationDepositLoading,
    isError: isCreationDepositError,
    status: creationDepositStatus,
  } = useOrgCreationDeposit();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast.promise(createOrgMutate.createOrganisation(values), {
      loading: "Creating organisation...",
      success: () => {
        return `Successfully created ${values.name} Organisation. Data can take couple minutes to reflect`;
      },
      finally: () => {
        onClose();
      },
      error: (err: { message: string }) => {
        return err?.message || "Failed to create the organisation";
      },
    });
  };

  const noEnoughBalance =
    balanceStatus === "success" && creationDepositStatus === "success"
      ? BigNumber(balance?.toString() ?? "0").isLessThan(
          BigNumber(creationDeposit?.value?.toString() ?? "0")
        )
      : false;

  const isDisabled =
    noEnoughBalance ||
    isCreationDepositLoading ||
    isCreationDepositError ||
    isBalanceLoading ||
    createOrgMutate.isLoading ||
    // createOrgMutate.isError ||
    createOrgMutate.isSuccess;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <ImgUpload name="logo" control={form.control} />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter a name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-line description</FormLabel>
              <FormControl>
                <Input placeholder="Add description here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discord"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add organisation discord</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your discord link here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add organisation website</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your website link here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-3">
          {isCreationDepositError ? (
            <p className="text-destructive font-medium text-xs">
              Error fetching creation deposit
            </p>
          ) : (
            <>
              <p className="text-warn font-medium text-xs">
                Note: Creating organisation requires deposit of{" "}
                {!isCreationDepositLoading ? (
                  <>{creationDeposit?.label}</>
                ) : (
                  "..."
                )}{" "}
                ETH
              </p>
            </>
          )}

          {noEnoughBalance ? (
            <p className="text-destructive font-medium text-xs">
              You don't have enough balance to submit org. creation fee
            </p>
          ) : null}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isDisabled}
          >
            {createOrgMutate.isLoading ? <Spinner /> : "Create Organisation"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
