import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetOrgAllGuilds } from "@/contracts/read/organisation";
import { useOrganisation } from "@/hooks/useOrganisation";
import { FilterIcon } from "lucide-react";
import { useState } from "react";

export const DAOLeaderboard = () => {
  const { address } = useOrganisation();
  const { data: allGuilds, isLoading: isAllGuildsLoading } = useGetOrgAllGuilds(
    { address }
  );

  const [activeGuild, setActiveGuild] = useState("allguilds");

  return (
    <div className="flex flex-col gap-2">
      <Select
        disabled={isAllGuildsLoading}
        value={activeGuild}
        onValueChange={setActiveGuild}
      >
        <SelectTrigger className="w-[180px] gap-2 justify-start bg-background border-border">
          <FilterIcon className="w-4 h-4" />
          <SelectValue placeholder="Choose Guild" />
        </SelectTrigger>
        <SelectContent>
          {allGuilds?.guilds.map((guild) => (
            <SelectItem key={guild.address} value={guild.address}>
              {guild.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="w-full py-4 px-2 flex justify-between items-center">
        <p className="font-semibold text-sm text-left flex-1 text-foreground/60">
          Address
        </p>
        <p className="font-semibold text-sm text-center flex-1 text-foreground/60">
          Overall Rank (#)
        </p>
        <p className="font-semibold text-sm text-right flex-1 text-foreground/60">
          Total Points
        </p>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between items-center py-4 px-5 sm:px-10 bg-foreground/5">
          <p className="font-medium text-sm text-left flex-1 text-foreground/90">
            0x03eb...a44f636
          </p>
          <p className="font-medium text-sm text-center flex-1 text-foreground">
            #1
          </p>
          <p className="font-medium text-sm text-right flex-1 text-foreground">
            2100
          </p>
        </div>

        <div className="flex justify-between items-center py-4 px-5 sm:px-10 bg-foreground/5">
          <p className="font-medium text-sm text-left flex-1 text-foreground/90">
            0x03eb...a44f636
          </p>
          <p className="font-medium text-sm text-center flex-1 text-foreground">
            #1
          </p>
          <p className="font-medium text-sm text-right flex-1 text-foreground">
            2100
          </p>
        </div>
      </div>
    </div>
  );
};
