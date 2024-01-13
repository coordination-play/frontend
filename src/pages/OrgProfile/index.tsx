import { LayoutGrid, Trophy } from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { CreateGuildDialog } from "./CreateGuild";
import { PaySalaryDialog } from "./PaySalary";
import { UploadPointsDialog } from "./UploadPoints";
import { AllGuilds } from "./AllGuilds";
import { ClaimRewards } from "./ClaimRewards";
import { OrgHeader } from "./OrgHeader";
import { DAOLeaderboard } from "./Leaderboard";
import { useOrganisation } from "@/hooks/organisation";

export const ORGProfile = () => {
  const { isOwner } = useOrganisation();

  return (
    <>
      <div className="w-full h-full flex flex-1 mt-16 justify-center">
        <div className="max-w-7xl min-h-max flex w-full rounded-xl p-8 gap-4">
          <div className="flex flex-col gap-4 h-full w-full max-w-[300px]">
            <OrgHeader />
            {isOwner ? (
              <div className="w-full border border-border rounded-md p-4 gap-3 text-center flex flex-col items-center">
                <PaySalaryDialog />
                <UploadPointsDialog />
              </div>
            ) : null}

            <ClaimRewards />
            {/* <RecentActivities /> */}
          </div>

          <div className="h-full flex-1 flex flex-col">
            <Tabs defaultValue="allorgs" className="w-full">
              <TabsList className="flex w-full justify-start">
                <TabsTrigger value="allorgs">
                  <LayoutGrid className="w-4 h-4" />
                  All Guilds
                </TabsTrigger>

                <TabsTrigger value="myorgs">
                  <Trophy className="w-4 h-4" />
                  Leaderboard
                </TabsTrigger>

                {isOwner ? (
                  <div className="ml-auto">
                    <CreateGuildDialog />
                  </div>
                ) : null}
              </TabsList>
              <TabsContent value="allorgs" className="flex flex-col gap-3.5">
                <AllGuilds />
              </TabsContent>
              <TabsContent value="myorgs">
                <DAOLeaderboard />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};
