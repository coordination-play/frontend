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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useWriteFactoryContract } from "@/contracts";
import { Spinner } from "@/components/ui/spinner";

export const CreateOrgDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto">Create Organization</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Organisation</DialogTitle>
        </DialogHeader>

        <CreateDAOForm />
      </DialogContent>
    </Dialog>
  );
};

const formSchema = z.object({
  //   logo: z.string().url(),
  name: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Organization description must be at least 10 characters.",
  }),
});

const CreateDAOForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //   logo: "",
      name: "",
      description: "",
    },
  });

  const createOrgMutate = useWriteFactoryContract("create_organisation", {
    successMessage: "Organization created successfully",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    await createOrgMutate.writeAsyncAndWait([values.name]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
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
          {createOrgMutate.isLoading ? <Spinner /> : "Create Organisation"}
        </Button>
      </form>
    </Form>
  );
};
