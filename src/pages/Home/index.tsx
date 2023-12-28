// import { GetStarted } from "@/components/GetStarted";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";

export const HomePage = () => {
  return (
    <>
      {/* <div className="w-full h-full flex flex-1">
        <GetStarted />
      </div> */}

      <div className="w-full h-full flex flex-1 mt-16 justify-center">
        <Box
          variant="shadow"
          className="max-w-7xl min-h-max flex border-2 border-border w-full rounded-xl p-8 gap-4"
        >
          <div className="flex flex-col gap-4 h-full min-w-[300px]">
            <div className="flex gap-2 items-center">
              <p className="text-2xl text-background font-medium">
                0x013d...d114
              </p>
            </div>

            <Box variant="shadow" className="rounded-lg">
              <div className="p-4 border-b border-b-border/20">
                <p className="text-lg font-semibold text-background">
                  Wallet Balance
                </p>
              </div>

              <div className="p-4">
                <p className="text-3xl font-bold text-background">$18480.87</p>
              </div>
            </Box>

            <Box variant="shadow" className="rounded-lg flex-1 flex flex-col">
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

                <p className="font-semibold text-cyan-400 text-xs mt-auto mb-2 cursor-pointer">
                  See More
                </p>
              </div>
            </Box>
          </div>

          <Box
            variant="shadow"
            className="h-full flex-1 flex flex-col rounded-lg p-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-background">
                Hello Admin!
              </h2>

              <div className="flex items-center gap-2">
                <Button size="md" variant="outline">
                  Help
                </Button>
                <Button size="md" variant="secondary">
                  Pay Salary
                </Button>
                <Button size="md" variant="secondary">
                  Upload Points
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <h2 className="text-xl font-semibold text-background">
                All Guilds
              </h2>

              <div className="flex items-center flex-wrap gap-2">
                <div className="flex gap-2 w-full">
                  <Box
                    variant="pinkPurple"
                    className="py-4 rounded-lg px-4 w-full flex flex-col gap-1 text-background font-bold"
                  >
                    <p className="font-semibold">Design</p>
                    <p className="font-medium text-xs">8 contributers</p>
                  </Box>

                  <Box
                    variant="orange"
                    className="py-4 rounded-lg px-4 w-full flex flex-col gap-1 text-background font-bold"
                  >
                    <p className="font-semibold">Development</p>
                    <p className="font-medium text-xs">12 contributers</p>
                  </Box>

                  <Box
                    variant="green"
                    className="py-4 rounded-lg px-4 w-full flex flex-col gap-1 text-background font-bold"
                  >
                    <p className="font-semibold">Community</p>
                    <p className="font-medium text-xs">2 contributers</p>
                  </Box>

                  <Box
                    variant="red"
                    className="py-4 rounded-lg px-4 w-full flex flex-col gap-1 text-background font-bold"
                  >
                    <p className="font-semibold">Growth</p>
                    <p className="font-medium text-xs">4 contributers</p>
                  </Box>
                </div>

                <Box
                  asChild
                  variant="navy"
                  className="h-20 rounded-lg px-6 flex items-center text-background font-bold"
                >
                  <button>Create Guild</button>
                </Box>
              </div>
            </div>

            <Box
              variant="shadow"
              className="mt-6 rounded-lg flex flex-col flex-1"
            >
              <Box
                variant="pinkPurple"
                className="px-6 py-5 rounded-t-[inherit]"
              >
                <p className="text-xl font-semibold text-background">
                  Leaderboard (Design)
                </p>
              </Box>

              <Box
                variant="grey"
                className="w-full py-4 px-10 flex justify-between items-center"
              >
                <p className="font-semibold text-[14px] text-left flex-1 text-background/90">
                  Address
                </p>
                <p className="font-semibold text-[14px] text-center flex-1 text-background/90">
                  Overall Rank
                </p>
                <p className="font-semibold text-[14px] text-right flex-1 text-background/90">
                  Total Points
                </p>
              </Box>

              <div className="flex flex-col">
                <div className="flex justify-between items-center py-4 px-10 border-b border-border/20">
                  <p className="font-medium text-[14px] text-left flex-1 text-background/90">
                    0x03eb...a44f636
                  </p>
                  <p className="font-medium text-[14px] text-center flex-1 text-background">
                    #1
                  </p>
                  <p className="font-medium text-[14px] text-right flex-1 text-background">
                    2100
                  </p>
                </div>

                <div className="flex justify-between items-center py-4 px-10 border-b border-border/20">
                  <p className="font-medium text-[14px] text-left flex-1 text-background/90">
                    0x03eb...a44f636
                  </p>
                  <p className="font-medium text-[14px] text-center flex-1 text-background">
                    #1
                  </p>
                  <p className="font-medium text-[14px] text-right flex-1 text-background">
                    2100
                  </p>
                </div>

                <div className="flex justify-between items-center py-4 px-10 border-b border-border/20">
                  <p className="font-medium text-[14px] text-left flex-1 text-background/90">
                    0x03eb...a44f636
                  </p>
                  <p className="font-medium text-[14px] text-center flex-1 text-background">
                    #1
                  </p>
                  <p className="font-medium text-[14px] text-right flex-1 text-background">
                    2100
                  </p>
                </div>

                <div className="flex items-center justify-center gap-6 py-4">
                  <button className="font-semibold text-cyan-400 text-xs mt-auto mb-2 cursor-pointer">
                    Prev
                  </button>

                  <button className="font-semibold text-cyan-400 text-xs mt-auto mb-2 cursor-pointer">
                    Next
                  </button>
                </div>
              </div>

              {/* <div className="p-4 flex h-full flex-col w-full items-center justify-center gap-2 my-auto text-center">
                <div className="max-w-xs">
                  <p className="text-sm font-semibold text-background/80">
                    Select guild from above to see respective leaderboard
                  </p>
                </div>
              </div> */}
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};
