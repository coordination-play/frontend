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

export const PaySalaryDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Pay Salary</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pay Salary</DialogTitle>
        </DialogHeader>

        <PaySalaryForm />
      </DialogContent>
    </Dialog>
  );
};

const formSchema = z.object({
  //   logo: z.string().url(),
  guild: z.string(),
  salaryAmount: z.string().min(0),
  monthId: z.string(),
});

const PaySalaryForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guild: "",
      salaryAmount: "",
      monthId: "",
    },
  });

  const paySalaryMutate = useWriteOrganisationContract("add_guild", {
    successMessage: "Guild created successfully",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await paySalaryMutate.writeAsyncAndWait([
      values.guild,
      values.salaryAmount,
      values.monthId,
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
          name="salaryAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter Salary Amount"
                  {...field}
                />
              </FormControl>
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

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={
            paySalaryMutate.isLoading ||
            paySalaryMutate.isError ||
            paySalaryMutate.isSuccess
          }
        >
          {paySalaryMutate.isLoading ? <Spinner /> : "Send Payment"}
        </Button>
      </form>
    </Form>
  );
};
