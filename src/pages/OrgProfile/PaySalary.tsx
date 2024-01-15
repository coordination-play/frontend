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
import { useWriteSalaryContract } from "@/contracts/write";
import { Spinner } from "@/components/ui/spinner";

import { useOrganisation } from "@/hooks/useOrganisation";
import {
  useGetOrgAllGuilds,
  useGetOrgSalaryContract,
} from "@/contracts/read/organisation";
import { useState } from "react";
import { DrawerDialog } from "@/components/DrawerDialog";

export const PaySalaryDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      trigger={<Button className="w-full">Pay Salary</Button>}
      open={open}
      onOpenChange={setOpen}
      title="Pay Salary"
    >
      <UploadPointsForm onClose={() => setOpen(false)} />
    </DrawerDialog>
  );
};

const formSchema = z.object({
  monthId: z.string(),
  amounts: z.array(
    z
      .string()
      .optional()
      .transform((v) => Number(v) || 0)
  ),
});

const UploadPointsForm = ({ onClose }: { onClose: () => void }) => {
  const { address, monthId } = useOrganisation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthId: String(monthId),
      amounts: [],
    },
  });

  const { data: guilds, isLoading: isAllGuildsLoading } = useGetOrgAllGuilds({
    address,
  });

  const { data: salaryAdr = "", isLoading: isSalaryAdrLoading } =
    useGetOrgSalaryContract({ address });

  const uploadPointsMutate = useWriteSalaryContract(
    salaryAdr,
    "add_fund_to_salary_pools",
    {
      successMessage: "Funds added to salary pool successfully",
    }
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    await uploadPointsMutate.writeAsyncAndWait([
      values.monthId,
      values.amounts,
      guilds?.guilds.map((g) => g.address),
    ]);

    onClose();
  };

  const fieldDisabled =
    isAllGuildsLoading ||
    isSalaryAdrLoading ||
    uploadPointsMutate.isLoading ||
    uploadPointsMutate.isSuccess;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="monthId"
          disabled={fieldDisabled}
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

        <div className="flex flex-col gap-2">
          <p className="font-medium text-foreground/90 text-sm">
            Guild Amounts
          </p>

          <div className="flex-col gap-2">
            {guilds?.guilds.map((guild, i) => (
              <FormField
                key={i}
                control={form.control}
                name={`amounts.${i}`}
                disabled={fieldDisabled}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <FormItem className="flex justify-between items-center">
                      <FormLabel>{guild.name}</FormLabel>
                      <FormControl>
                        <Input
                          className="w-[70%]"
                          placeholder="Enter Amount"
                          type="number"
                          defaultValue=""
                          {...field}
                        />
                      </FormControl>
                    </FormItem>

                    <FormMessage className="ml-auto" />
                  </div>
                )}
              />
            ))}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={
            uploadPointsMutate.isLoading ||
            uploadPointsMutate.isSuccess ||
            isAllGuildsLoading
          }
        >
          {uploadPointsMutate.isLoading || isAllGuildsLoading ? (
            <Spinner />
          ) : (
            "Add Funds"
          )}
        </Button>
      </form>
    </Form>
  );
};
