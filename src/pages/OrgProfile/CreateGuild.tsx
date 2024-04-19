import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useWriteOrganisationContract } from "@/contracts/write";
import { Spinner } from "@/components/ui/spinner";
import { useOrganisation } from "@/hooks/useOrganisation";
import { useGetOrgAllGuilds } from "@/contracts/read/organisation";
import { useState } from "react";
import { DrawerDialog } from "@/components/DrawerDialog";
import { toast } from "sonner";

export const CreateGuildDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>Create Guild</Button>}
      title="Create Guild"
    >
      <CreateGuildForm onClose={() => setOpen(false)} />
    </DrawerDialog>
  );
};

const formSchema = z.object({
  name: z
    .string({
      required_error: "Guild name is required",
    })
    .min(2, {
      message: "Guild name must be at least 2 characters.",
    }),
  owner: z.string({
    required_error: "Guild Owner's address is required",
  }),
});

const CreateGuildForm = ({ onClose }: { onClose: () => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      owner: undefined,
    },
  });

  const { address } = useOrganisation();
  const { refetch: refetchAllGuilds } = useGetOrgAllGuilds({
    address,
  });

  const createGuildMutate = useWriteOrganisationContract(address, "add_guild", {
    successMessage: "Guild created successfully",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast.promise(
      createGuildMutate.writeAsyncAndWait([values.name, values.owner]),
      {
        loading: "Creating guild...",
        success: () => {
          refetchAllGuilds();

          return `Successfully created ${values.name} Guild. Data can take couple minutes to reflect`;
        },
        finally: () => {
          onClose();
        },
        error: (err: { message: string }) => {
          return err?.message || "Failed to create the guild";
        },
      }
    );
  };

  const disableField =
    createGuildMutate.isLoading || createGuildMutate.isSuccess;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="name"
          disabled={disableField}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guild Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter a name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="owner"
          disabled={disableField}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guild Owner</FormLabel>
              <FormControl>
                <Input placeholder="Enter Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={
            createGuildMutate.isLoading ||
            // createOrgMutate.isError ||
            createGuildMutate.isSuccess
          }
        >
          {createGuildMutate.isLoading ? <Spinner /> : "Create Guild"}
        </Button>
      </form>
    </Form>
  );
};
