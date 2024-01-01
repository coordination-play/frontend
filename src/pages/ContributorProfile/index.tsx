import { Leaderboard } from "@/components/Leaderboard";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Salary } from "./Salary";
import { useParams } from "react-router-dom";
import { isAddress } from "@/lib/utils";

import { RecentActivities } from "./RecentActivities";
import { Points } from "./Points";
import { Profile } from "./Profile";

export const ContributorProfilePage = () => {
  const { address = "" } = useParams<{ address: string }>();

  const is = isAddress(address);

  if (!is) {
    return (
      <Box>
        <p>the address provided in url is not a valid address</p>
      </Box>
    );
  }

  return (
    <>
      {/* <div className="w-full h-full flex flex-1">
        <GetStarted />
      </div> */}

      <div className="w-full h-full flex flex-1 mt-16 justify-center">
        <Box className="max-w-7xl min-h-max flex w-full rounded-xl p-8 gap-4">
          <div className="flex flex-col gap-4 h-full min-w-[300px]">
            <Profile address={address} />
            <Salary address={address} />
            <RecentActivities address={address} />
          </div>

          <Box
            variant="shadow"
            className="h-full flex-1 flex border border-border flex-col rounded-lg p-8 gap-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text">
                JediSwap Contributor Profile
              </h2>

              <div className="flex items-center gap-2">
                <Button size="md" variant="ghost">
                  Share
                </Button>
              </div>
            </div>

            <Points address={address} />
            <Leaderboard />
            {/* <MeshNFTs /> */}
          </Box>
        </Box>
      </div>
    </>
  );
};
