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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const UploadPointsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Upload Points</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Points</DialogTitle>
        </DialogHeader>

        <UploadPointsForm />
      </DialogContent>
    </Dialog>
  );
};

const formSchema = z.object({
  //   logo: z.string().url(),
  guild: z.string(),
  monthId: z.string(),
  points: z.string().min(0),
});

const UploadPointsForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guild: "",
      monthId: "",
      points: "",
    },
  });

  const uploadPointsMutate = useWriteOrganisationContract("add_guild", {
    successMessage: "Guild created successfully",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await uploadPointsMutate.writeAsyncAndWait([
      values.guild,
      values.monthId,
      values.points,
    ]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="guild"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guild</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a guild" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="monthId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Month ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter Month ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="points"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload .CSV File</FormLabel>
              <FormControl>
                <Input type="file" placeholder="Click to Select" {...field} />
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
            uploadPointsMutate.isLoading ||
            uploadPointsMutate.isError ||
            uploadPointsMutate.isSuccess
          }
        >
          {uploadPointsMutate.isLoading ? <Spinner /> : "Update Points"}
        </Button>
      </form>
    </Form>
  );
};
