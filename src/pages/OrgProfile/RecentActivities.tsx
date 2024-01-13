import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityIcon } from "lucide-react";

export const RecentActivities = () => {
  return (
    <div className="w-full border border-border rounded-md">
      <div className="flex gap-2 items-center p-4 border-b border-border">
        <ActivityIcon className="w-4 h-4" />
        <p className="font-semibold text-foreground/90">Recent Activities</p>
      </div>

      <div className="p-4 flex flex-col gap-4 pt-2">
        <Tabs defaultValue="allorgs" className="w-full">
          <TabsList className="flex w-full justify-start">
            <TabsTrigger value="allorgs">Organisation</TabsTrigger>
            <TabsTrigger value="myorgs">My Activities</TabsTrigger>
          </TabsList>

          <TabsContent value="allorgs" className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <p className="text-foreground font-medium text-sm">
                  Salary paid to Design guild
                </p>
                <p className="text-foreground/60 text-sm">1m ago</p>
              </div>

              <div className="flex flex-col">
                <p className="text-foreground font-medium text-sm">
                  Salary paid to Design guild
                </p>
                <p className="text-foreground/60 text-sm">1m ago</p>
              </div>
            </div>

            <Button variant="link" className="w-fit p-0 h-fit">
              See More
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
