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
import { useWriteTreasuryContract } from "@/contracts/write";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrganisation } from "@/hooks/useOrganisation";
import {
  useGetOrgAllGuilds,
  useGetOrgTreasuryContract,
} from "@/contracts/read/organisation";
import { useState } from "react";
import { DrawerDialog } from "@/components/DrawerDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn, getMonthId } from "@/lib/utils";
import { toast } from "sonner";
import { months, years } from "@/lib/time";

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
  month: z.string(),
  year: z.string(),

  amounts: z
    .record(z.string().min(1), z.string())
    .transform((amounts) =>
      Object.fromEntries(
        Object.entries(amounts).map(([k, v]) => [
          k,
          Number(v) * Math.pow(10, 18),
        ])
      )
    ),
});

const UploadPointsForm = ({ onClose }: { onClose: () => void }) => {
  const { address } = useOrganisation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      month: String(new Date().getMonth() + 1),
      year: String(new Date().getFullYear()),

      amounts: {},
    },
  });

  const [selectedGuilds, setSelectedGuilds] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const { data: guilds, isLoading: isAllGuildsLoading } = useGetOrgAllGuilds({
    address,
  });

  const { data: trasuryAdr = "", isLoading: isTrasuryAdrLoading } =
    useGetOrgTreasuryContract({ address });

  const paySalaryMutate = useWriteTreasuryContract(
    trasuryAdr,
    "allocate_funds_for_salary",
    {
      successMessage: "Funds added to salary pool successfully",
    }
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const args = [
      getMonthId(values.month, values.year),
      Object.values(values.amounts).map((v) => BigInt(v)),
      Object.keys(values.amounts), // addresses
    ];
    console.log("args", args);

    toast.promise(paySalaryMutate.writeAsyncAndWait(args), {
      loading: "Adding funds...",
      success: () => {
        return `Salary has been add to guilds. Data can take couple minutes to reflect`;
      },
      finally: () => {
        onClose();
      },
      error: (err) => {
        return err?.message || "Failed to add funds to salary pool";
      },
    });
  };

  const fieldDisabled =
    isAllGuildsLoading ||
    isTrasuryAdrLoading ||
    paySalaryMutate.isLoading ||
    paySalaryMutate.isSuccess;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
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

        <div className="flex flex-col gap-2">
          <p className="font-medium text-foreground/90 text-sm">
            Guild Amounts
          </p>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {selectedGuilds.length
                  ? guilds?.guilds
                      .filter((guild) => selectedGuilds.includes(guild.address))
                      .map((g) => g.name)
                      .join(", ")
                  : "Select Guild(s)..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                {/* <CommandInput placeholder="Search Guild..." /> */}
                <CommandEmpty>No Guilds exist.</CommandEmpty>
                <CommandGroup>
                  {guilds?.guilds.map((guild) => (
                    <CommandItem
                      key={guild.address}
                      value={guild.address}
                      onSelect={(adr) => {
                        const alreadySelected = selectedGuilds.includes(adr);

                        if (alreadySelected) {
                          const updatedSelectedGuilds = selectedGuilds.filter(
                            (g) => g !== adr
                          );
                          setSelectedGuilds(updatedSelectedGuilds);

                          const amounts = form.getValues("amounts");
                          const filteredAmounts = Object.fromEntries(
                            Object.entries(amounts).filter(([k]) => k !== adr)
                          );

                          form.setValue(`amounts`, filteredAmounts);
                        } else {
                          setSelectedGuilds([...selectedGuilds, adr]);
                        }
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedGuilds.includes(guild.address)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {guild.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <div className="flex-col gap-2">
            {selectedGuilds.length ? (
              selectedGuilds.map((guild, i) => (
                <FormField
                  key={i}
                  control={form.control}
                  name={`amounts.${guild}`}
                  disabled={fieldDisabled}
                  render={({ field }) => (
                    <div className="flex flex-col gap-1">
                      <FormItem className="flex justify-between items-center">
                        <FormLabel>
                          {
                            guilds?.guilds.find((g) => g.address === guild)
                              ?.name
                          }
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="w-[70%]"
                            placeholder="Enter Amount"
                            // type="number"
                            defaultValue=""
                            {...field}
                          />
                        </FormControl>
                      </FormItem>

                      <FormMessage className="ml-auto" />
                    </div>
                  )}
                />
              ))
            ) : (
              <p className=" text text-sm text-foreground/60">
                No Guilds selected
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={
            paySalaryMutate.isLoading ||
            paySalaryMutate.isSuccess ||
            isAllGuildsLoading
          }
        >
          {paySalaryMutate.isLoading || isAllGuildsLoading ? (
            <Spinner />
          ) : (
            "Add Funds"
          )}
        </Button>
      </form>
    </Form>
  );
};
