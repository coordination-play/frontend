import { Leaderboard } from "@/components/Leaderboard";
import { MeshNFTs } from "@/components/MeshNFTs";
import { RecentActivities } from "@/components/RecentActivities";
import { WalletBalance } from "@/components/WalletBalance";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";

export const ContributorProfilePage = () => {
  return (
    <>
      {/* <div className="w-full h-full flex flex-1">
        <GetStarted />
      </div> */}

      <div className="w-full h-full flex flex-1 mt-16 justify-center">
        <Box className="max-w-7xl min-h-max flex w-full rounded-xl p-8 gap-4">
          <div className="flex flex-col gap-4 h-full min-w-[300px]">
            <Box
              variant="shadow"
              className="flex items-center border border-border flex-col rounded-lg"
            >
              <Box
                variant="pinkPurple"
                className="w-full h-[100px] rounded-t-[inherit]"
              />

              <div className="p-8 w-full flex flex-col gap-3 -mt-24">
                <div className="p-2 rounded-lg bg-background/10 aspect-square max-w-36 mx-auto">
                  <img
                    alt="contributor"
                    src="/assets/img/contributor.png"
                    className="w-full aspect-square object-cover rounded-[inherit]"
                  />
                </div>

                <p className="text-xl text-text font-bold text-center">
                  0x013d...d114
                </p>

                <div className="flex gap-2">
                  <Button size="sm">Edit Profile</Button>
                  <Button size="sm" variant="link">
                    Copy Address
                  </Button>
                </div>

                <Button variant="tertiary" className="w-full">
                  Switch Account
                </Button>
              </div>
            </Box>

            <WalletBalance>
              <Button className="mb-5 ml-5">Claim Salary</Button>
            </WalletBalance>

            <RecentActivities />
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

            <div className="flex flex-col gap-3">
              <div className="flex items-center flex-wrap gap-2">
                <div className="flex gap-6 w-full">
                  <Box
                    variant="pinkPurple"
                    className="p-6 relative overflow-hidden rounded-lg w-full flex flex-col gap-1 text-text font-bold"
                  >
                    <p className="font-semibold">Design</p>

                    <div className="my-4">
                      <p className="text-4xl font-bold">930</p>
                      <p className="font-bold text-xs">Mesh Points</p>
                    </div>

                    <div className="absolute -bottom-10 -right-10 opacity-30">
                      <img
                        alt="halftone"
                        src="/assets/img/halftone.png"
                        className="w-28 h-28"
                      />
                    </div>
                  </Box>

                  {/* <Box
                    variant="pinkPurple"
                    className="py-4 rounded-lg px-4 w-full flex flex-col gap-1 text-text font-bold"
                  >
                    <p className="font-semibold">Design</p>
                    <p className="font-medium text-xs">8 contributers</p>
                  </Box> */}

                  <Box
                    variant="shadow"
                    className="p-6 relative overflow-hidden rounded-lg w-full flex flex-col gap-1 text-text font-bold"
                  >
                    <p className="font-semibold">Development</p>

                    <div className="mt-auto">
                      <p className="text-sm font-medium text-text/90">
                        Kick Start your journey
                      </p>

                      <Button variant="link" className="px-0">
                        Start Contributing
                      </Button>
                    </div>
                  </Box>

                  <Box
                    variant="orange"
                    className="p-6 relative overflow-hidden rounded-lg w-full flex flex-col gap-1 text-text font-bold"
                  >
                    <p className="font-semibold">Growth</p>

                    <div className="my-4">
                      <p className="text-4xl font-bold">120</p>
                      <p className="font-bold text-xs">Mesh Points</p>
                    </div>

                    <div className="absolute -bottom-10 -right-10 opacity-30">
                      <img
                        alt="halftone"
                        src="/assets/img/halftone.png"
                        className="w-28 h-28"
                      />
                    </div>
                  </Box>

                  <Box
                    variant="shadow"
                    className="p-6 relative overflow-hidden rounded-lg w-full flex flex-col gap-1 text-text font-bold"
                  >
                    <p className="font-semibold">Problem S</p>

                    <div className="mt-auto">
                      <p className="text-sm font-medium text-text/90">
                        Kick Start your journey
                      </p>

                      <Button variant="link" className="px-0">
                        Start Contributing
                      </Button>
                    </div>
                  </Box>
                </div>
              </div>
            </div>

            <Leaderboard />
            <MeshNFTs />
          </Box>
        </Box>
      </div>
    </>
  );
};
