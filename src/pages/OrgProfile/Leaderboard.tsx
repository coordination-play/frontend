import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterIcon } from "lucide-react";

export const DAOLeaderboard = () => {
  return (
    <div className="flex flex-col gap-2">
      <Select>
        <SelectTrigger className="w-[180px] gap-2 justify-start bg-background border-border">
          <FilterIcon className="w-4 h-4" />
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
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
        <div className="flex justify-between items-center py-4 px-10 bg-foreground/5">
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

        <div className="flex justify-between items-center py-4 px-10">
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

        <div className="flex justify-between items-center py-4 px-10 bg-foreground/5">
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

        <div className="flex items-center justify-center gap-6 py-4">
          <Button variant="link" className="mt-auto mb-2">
            Prev
          </Button>

          <Button variant="link" className="mt-auto mb-2">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
