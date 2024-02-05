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
import { months, years } from "@/lib/time";
import { getMonthId } from "@/lib/utils";
import { toast } from "sonner";

export const UploadPointsDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      trigger={<Button className="w-full">Upload Points</Button>}
      open={open}
      onOpenChange={setOpen}
      title="Upload Points"
    >
      <UploadPointsForm onClose={() => setOpen(false)} />
    </DrawerDialog>
  );
};

const formSchema = z.object({
  //   logo: z.string().url(),
  guild: z.string(),
  month: z.string(),
  year: z.string(),

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
            contributor: contributor.trim(),
            point: Number(point.trim()),
          };
        });
        console.log(contributorsData);

        return contributorsData;
      }
    ),
});

const UploadPointsForm = ({ onClose }: { onClose: () => void }) => {
  const { address } = useOrganisation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guild: undefined,
      month: String(new Date().getMonth() + 1),
      year: String(new Date().getFullYear()),
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
    const monthIdStr = getMonthId(values.month, values.year);

    toast.promise(
      uploadPointsMutate.writeAsyncAndWait([monthIdStr, values.pointsData]),
      {
        loading: "Uploading points...",
        success: () => {
          return `Successfully added points to ${values.guild} Guild. Data can take couple minutes to reflect`;
        },
        finally: () => {
          onClose();
        },
        error: (err) => {
          return err?.message || "Failed to upload points";
        },
      }
    );
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

        <div className="flex gap-2 w-full">
          <FormField
            control={form.control}
            name="month"
            disabled={fieldDisabled}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Month</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger disabled={field.disabled}>
                      <SelectValue placeholder="Select a guild" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {months.map((m, i) => (
                      <SelectItem key={i} value={String(i + 1)}>
                        {m}
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
            name="year"
            disabled={fieldDisabled}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Year</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger disabled={field.disabled}>
                      <SelectValue placeholder="Select a guild" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {years.map((year, i) => (
                      <SelectItem key={i} value={String(year)}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
