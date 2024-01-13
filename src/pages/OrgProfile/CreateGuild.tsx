import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useOrganisation } from "@/hooks/organisation";
import { useGetOrgAllGuilds } from "@/contracts/read/organisation";
import { useState } from "react";

export const CreateGuildDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Guild</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Guild</DialogTitle>
        </DialogHeader>

        <CreateGuildForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Guild name must be at least 2 characters.",
  }),
  owner: z.string(),
});

const CreateGuildForm = ({ onClose }: { onClose: () => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      owner: "",
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
    console.log("values", values);
    await createGuildMutate.writeAsyncAndWait([values.name, values.owner]);

    await refetchAllGuilds();

    onClose();
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
