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
import { useWriteGuildContract } from "@/contracts/write";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrganisation } from "@/hooks/useOrganisation";
import { useGetOrgAllGuilds } from "@/contracts/read/organisation";
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
  guild: z.string(),
  monthId: z.string(),
  pointsData: z
    .instanceof(File, {
      message: "Please upload a .csv file",
    })
    .refine((file) => file.type === "text/csv")
    .transform(
      async (file): Promise<Array<{ contributor: string; point: number }>> => {
        const text = await file.text();
        const contributorsData = text.split("\n").map((line) => {
          const [contributor, point] = line.split(",");
          return {
            contributor,
            point: Number(point),
          };
        });
        console.log(contributorsData);

        return contributorsData;
      }
    ),
});

const UploadPointsForm = ({ onClose }: { onClose: () => void }) => {
  const { address, monthId } = useOrganisation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guild: undefined,
      monthId: String(monthId),
      pointsData: undefined,
    },
  });

  const { data: guilds, isLoading: isAllGuildsLoading } = useGetOrgAllGuilds({
    address,
  });

  const guildAddress = form.watch("guild");
  const uploadPointsMutate = useWriteGuildContract(
    guildAddress,
    "update_contibutions",
    {
      successMessage: "Contributions uploaded successfully",
    }
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await uploadPointsMutate.writeAsyncAndWait([
      values.monthId,
      values.pointsData,
    ]);

    onClose();
  };

  const fieldDisabled =
    isAllGuildsLoading ||
    uploadPointsMutate.isLoading ||
    uploadPointsMutate.isSuccess;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="guild"
          disabled={fieldDisabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guild</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger disabled={field.disabled}>
                    <SelectValue placeholder="Select a guild" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {guilds?.guilds.map((g, i) => (
                    <SelectItem key={i} value={g.address}>
                      {g.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="pointsData"
          disabled={fieldDisabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload .CSV File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Click to Select"
                  accept=".csv"
                  disabled={field.disabled}
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
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
            uploadPointsMutate.isSuccess ||
            isAllGuildsLoading
          }
        >
          {uploadPointsMutate.isLoading || isAllGuildsLoading ? (
            <Spinner />
          ) : (
            "Update Points"
          )}
        </Button>
      </form>
    </Form>
  );
};
