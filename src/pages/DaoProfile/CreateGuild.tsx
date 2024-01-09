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
import { useWriteOrganisationContract } from "@/contracts";
import { Spinner } from "@/components/ui/spinner";

export const CreateGuildDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Guild</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Guild</DialogTitle>
        </DialogHeader>

        <CreateGuildForm />
      </DialogContent>
    </Dialog>
  );
};

const formSchema = z.object({
  //   logo: z.string().url(),
  name: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  owner: z.custom<string>(() => true, "Invalid Address"),
});

const CreateGuildForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      owner: "",
    },
  });

  const createOrgMutate = useWriteOrganisationContract("add_guild", {
    successMessage: "Guild created successfully",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createOrgMutate.writeAsyncAndWait([values.name, values.owner]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="name"
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
            createOrgMutate.isLoading ||
            createOrgMutate.isError ||
            createOrgMutate.isSuccess
          }
        >
          {createOrgMutate.isLoading ? <Spinner /> : "Create Guild"}
        </Button>
      </form>
    </Form>
  );
};
