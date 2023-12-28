import { cn } from "@/lib/utils";
import { Box } from "../ui/box";
import { Button } from "../ui/button";

export const RecentActivities = ({ className }: { className?: string }) => {
  return (
    <Box variant="shadow" className={cn("rounded-lg flex flex-col", className)}>
      <div className="p-4 border-b border-b-border/20">
        <p className="text-lg font-semibold text-background">
          Recent Activities
        </p>
      </div>

      <div className="p-4 flex flex-col gap-6 flex-1">
        {/* <p className="text-sm font-medium m-auto text-background text-center max-w-xs">
            Your recent activities will be populated here
          </p> */}

        <div className="flex flex-col gap-1">
          <p className="text-background text-sm font-medium">
            Growth Guild created
          </p>
          <p className="text-background/60 text-xs">1m ago</p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-background text-sm font-medium">
            Growth Guild created
          </p>
          <p className="text-background/60 text-xs">1m ago</p>
        </div>

        <Button variant="link" className="mt-auto mb-2 self-start">
          See More
        </Button>
      </div>
    </Box>
  );
};
