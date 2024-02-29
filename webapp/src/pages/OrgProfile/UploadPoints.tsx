import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  Control,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
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
import { getMonthId, isAddress, truncateAddress } from "@/lib/utils";
import { toast } from "sonner";
import { EditIcon, InfoIcon, PlusIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";

const COLUMNS = {
  CONTRIBUTOR_ADDRESS: "contributor_address",
  points: "points",
} as const;

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

  pointsData: z.array(z.object({ contributor: z.string(), point: z.number() })),
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
    "update_contributions",
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

        <CSVUpload
          name="pointsData"
          form={form}
          disabled={fieldDisabled}
          control={form.control}
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

type ContributorData = {
  contributor: string;
  point: number;
};

export const CSVUpload = <T extends FieldValues = FieldValues>({
  control,
  form,
  name,
  disabled,
}: {
  control?: Control<T> | undefined;
  form: UseFormReturn<T> | undefined;
  name: Path<T>;
  disabled?: boolean;
}) => {
  const [previewData, setPreviewData] = useState<ContributorData[]>([]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="w-full flex items-center justify-between">
          <p>Upload .CSV File</p>
          <CSVInfo />
        </div>

        <FormField
          control={control}
          name={name}
          disabled={disabled}
          render={({ field: { onChange, ...rest } }) => (
            <>
              <FormItem>
                <FormLabel className="flex flex-col gap-2">
                  <div className="relative border-2 w-full h-40 p-3 flex-col gap-2 rounded-md border-foreground/660 border-dotted flex items-center justify-center">
                    {previewData.length ? (
                      <>
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="absolute top-3 right-3 flex gap-2 items-center"
                        >
                          <div>
                            <EditIcon className="w-3 h-3" />
                            Edit
                          </div>
                        </Button>

                        <ScrollArea className="w-full mt-10">
                          {previewData?.map((c, i) => (
                            <div
                              key={i}
                              className="w-full flex items-center justify-between border-b border-b-border px-4 py-2"
                            >
                              <p className="text-sm text-foreground/60">
                                {truncateAddress(c.contributor)}
                              </p>

                              <p className="text-sm text-foreground/60">
                                {c.point}
                              </p>
                            </div>
                          ))}
                        </ScrollArea>
                      </>
                    ) : (
                      <>
                        <Button
                          asChild
                          variant="outline"
                          size="lg"
                          className="border-dotted border-2 rounded-full h-20 w-20 p-0 cursor-pointer"
                        >
                          <div>
                            <PlusIcon className="w-8 h-8" />
                          </div>
                        </Button>

                        <p className="text font-normal text-foreground/80">
                          Click to Upload
                        </p>

                        <FormMessage />
                      </>
                    )}
                  </div>
                </FormLabel>

                <FormControl>
                  <Input
                    className="hidden"
                    type="file"
                    accept=".csv"
                    {...rest}
                    value=""
                    onChange={async (event) => {
                      try {
                        const text = await event.target.files?.[0]?.text();

                        // identify data indexes
                        const cols = text
                          ?.split("\n")[0]
                          .split(",")
                          .map((c) => c.replace("\r", ""));

                        const contributorAdrIndex = cols?.findIndex(
                          (v) => v === COLUMNS.CONTRIBUTOR_ADDRESS
                        );
                        const pointsIndex = cols?.findIndex(
                          (v) => v === COLUMNS.points
                        );

                        if (
                          contributorAdrIndex === undefined ||
                          pointsIndex === undefined
                        ) {
                          setPreviewData([]);
                          // @ts-expect-error - Component prop typing issue
                          form?.setError("pointsData", {
                            message: "Required columns not found.",
                          });

                          return;
                        }

                        const data = (text?.split("\n") || [])
                          .map((line) => {
                            const cols = line.split(",");

                            const contributorData = {
                              contributor: cols[contributorAdrIndex].trim(),
                              point: Number(cols[pointsIndex].trim()),
                            };

                            // validate
                            if (
                              contributorData.contributor &&
                              contributorData.contributor
                                .trim()
                                .startsWith("0x") &&
                              isAddress(contributorData.contributor) &&
                              contributorData.point >= 0
                            ) {
                              return contributorData;
                            }

                            return undefined;
                          })
                          .filter(Boolean) as unknown as Array<ContributorData>;

                        if (!data.length) {
                          setPreviewData([]);
                          // @ts-expect-error - Component prop typing issue
                          form?.setError("pointsData", {
                            message: "No contributor data found.",
                          });

                          return;
                        }

                        // @ts-expect-error - Component prop typing issue
                        form?.clearErrors("pointsData");

                        setPreviewData(data);
                        onChange(data);
                      } catch (err) {
                        setPreviewData([]);
                        // @ts-expect-error - Component prop typing issue
                        form?.setError("pointsData", {
                          message: "Unable to parse contributor data.",
                        });
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            </>
          )}
        />
      </div>
    </>
  );
};

const CSVInfo = () => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Button type="button" variant="ghost" size="icon">
        <InfoIcon className="w-4 h-4" />
      </Button>
    </HoverCardTrigger>
    <HoverCardContent className="w-96 max-w-[100vw]">
      <p className="text-sm text-foreground/80">
        The table must have atleast two columns in a given row: <br />
        1. `<b>{COLUMNS.CONTRIBUTOR_ADDRESS}</b>` - for contributor's address
        <br /> 2. `<b>{COLUMNS.points}</b>` - for the given contributor's points
        <br />
        <br />
        other columns, empty rows, or rows with invalid address/points will be
        discarded.
      </p>
    </HoverCardContent>
  </HoverCard>
);
