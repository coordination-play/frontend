import { GetStarted } from "@/components/GetStarted";
import { Leaderboard } from "@/components/Leaderboard";
import { RecentActivities } from "@/components/RecentActivities";
import { WalletBalance } from "@/components/WalletBalance";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";

import { PaySalaryDialog } from "./PaySalary";
import { UploadPointsDialog } from "./UploadPoints";
import { CreateGuildDialog } from "./CreateGuild";
import { AllGuilds } from "./AllGuilds";
import { useAccount } from "@starknet-react/core";

export const DAOProfile = () => {
  const { isConnected } = useAccount();

  return (
    <>
      <div className="w-full h-full flex flex-1 mt-16 justify-center">
        <Box
          variant="shadow"
          className="max-w-7xl min-h-max flex border-2 border-border w-full rounded-xl p-8 gap-4"
        >
          <div className="flex flex-col gap-4 h-full min-w-[300px]">
            <div className="flex gap-2 items-center">
              <p className="text-2xl text-text font-medium">0x013d...d114</p>
            </div>

            <WalletBalance />
            <RecentActivities className="flex-1" />
          </div>

          <Box
            variant="shadow"
            className="h-full flex-1 flex flex-col rounded-lg p-8 gap-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Hello Admin!</h2>

              <div className="flex items-center gap-2">
                <Button size="md" variant="outline">
                  Help
                </Button>

                <PaySalaryDialog />
                <UploadPointsDialog />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold">All Guilds</h2>

              <div className="flex items-center flex-wrap gap-2">
                <AllGuilds />
                <CreateGuildDialog />
              </div>
            </div>

            <Leaderboard />
          </Box>
        </Box>
      </div>
    </>
  );
};
