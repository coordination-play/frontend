import { Box } from "../ui/box";
import { Button } from "../ui/button";

export const Leaderboard = () => {
  return (
    <Box variant="shadow" className="rounded-lg flex flex-col flex-1">
      <Box variant="pinkPurple" className="px-6 py-5 rounded-t-[inherit]">
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
          <Button variant="link" className="mt-auto mb-2">
            Prev
          </Button>

          <Button variant="link" className="mt-auto mb-2">
            Next
          </Button>
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
  );
};
