import { useState } from "react";

import { LayoutGrid, Trophy } from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { CreateGuildDialog } from "./CreateGuild";
import { PaySalaryDialog } from "./PaySalary";
import { UploadPointsDialog } from "./UploadPoints";
import { AllGuilds } from "./AllGuilds";
import { ClaimRewards } from "./ClaimRewards";
import { OrgHeader } from "./OrgHeader";
import { useOrganisation } from "@/hooks/useOrganisation";
import { Button } from "@/components/ui/button";
import { OrgAddresses } from "./Addresses";
import { ContractsAlert } from "./ContractsAlert";
import { MonthIDSlider } from "./MonthIdSlider";

export const ORGProfile = () => {
  const { isOwner } = useOrganisation();

  const [activeTab, setActiveTab] = useState("allguilds");

  return (
    <>
      <div className="w-full h-full flex flex-1 mt-16 justify-center">
        <div className="max-w-7xl min-h-max w-full gap-6 flex flex-col">
          <ContractsAlert />

          <div className="flex w-full rounded-xl gap-6 flex-col md:flex-row">
            <div className="flex flex-col gap-4 h-fit w-full md:max-w-[300px]">
              <OrgHeader />

              {isOwner ? (
                <div className="w-full border border-border rounded-md p-4 gap-3 text-center flex flex-col items-center">
                  <PaySalaryDialog />
                  <UploadPointsDialog />
                </div>
              ) : null}

              <ClaimRewards />
              {/* <RecentActivities /> */}

              <OrgAddresses />
            </div>

            <div className="h-full flex-1 flex flex-col">
              <Tabs
                defaultValue="allguilds"
                className="w-full"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="flex w-full justify-start flex-wrap gap-2 h-12">
                  <TabsTrigger value="allguilds">
                    <LayoutGrid className="w-4 h-4" />
                    All Guilds
                  </TabsTrigger>

                  <TabsTrigger value="leaderboard" className="mr-auto">
                    <Trophy className="w-4 h-4" />
                    Leaderboard
                  </TabsTrigger>

                  <div className="flex items-center gap-3">
                    <MonthIDSlider />
                    {isOwner ? <CreateGuildDialog /> : null}
                  </div>
                </TabsList>

                <TabsContent
                  value="allguilds"
                  className="flex flex-col gap-3.5"
                >
                  <AllGuilds />
                </TabsContent>
                <TabsContent value="leaderboard">
                  {/* <DAOLeaderboard /> */}
                  <div className="w-full flex px-4 py-8 gap-6 items-center justify-center flex-col rounded-sm border border-border mt-4">
                    <div className="flex flex-col gap-1 items-center max-w-xl text-center">
                      <h6 className="font-medium text-2xl">Coming Soon</h6>
                      <p className="font-normal text-sm text-foreground/50">
                        This section is in development
                      </p>
                    </div>

                    <div className="flex gap-2 flex-col sm:flex-row">
                      <Button onClick={() => setActiveTab("allguilds")}>
                        See all Guilds
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
