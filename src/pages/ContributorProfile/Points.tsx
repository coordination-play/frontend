import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";

export const Points = ({ address }: { address: string }) => {
  return (
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
  );
};
