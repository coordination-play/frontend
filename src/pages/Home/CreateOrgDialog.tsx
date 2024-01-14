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
      <CreateDAOForm />
    </DrawerDialog>
  );
};

const formSchema = z.object({
  //   logo: z.string().url(),
  name: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  description: z
    .string()
    // .min(10, {
    //   message: "Organization description must be at least 10 characters.",
    // })
    .optional(),
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

  const createOrgMutate = useCreateOrganisationContract();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    await createOrgMutate.createOrganisation({ name: values.name });
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
            // createOrgMutate.isError ||
            createOrgMutate.isSuccess
          }
        >
          {createOrgMutate.isLoading ? <Spinner /> : "Create Organisation"}
        </Button>
      </form>
    </Form>
  );
};
