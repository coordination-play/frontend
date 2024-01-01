import { Box } from "@/components/ui/box";

export const AllGuilds = () => {
  return (
    <div className="flex gap-2 w-full">
      <Box
        variant="pinkPurple"
        className="py-4 rounded-lg px-4 w-full flex flex-col gap-1 font-bold"
      >
        <p className="font-semibold">Design</p>
        <p className="font-medium text-xs">8 contributers</p>
      </Box>

      <Box
        variant="orange"
        className="py-4 rounded-lg px-4 w-full flex flex-col gap-1 font-bold"
      >
        <p className="font-semibold">Development</p>
        <p className="font-medium text-xs">12 contributers</p>
      </Box>

      <Box
        variant="green"
        className="py-4 rounded-lg px-4 w-full flex flex-col gap-1 font-bold"
      >
        <p className="font-semibold">Community</p>
        <p className="font-medium text-xs">2 contributers</p>
      </Box>

      <Box
        variant="red"
        className="py-4 rounded-lg px-4 w-full flex flex-col gap-1 font-bold"
      >
        <p className="font-semibold">Growth</p>
        <p className="font-medium text-xs">4 contributers</p>
      </Box>
    </div>
  );
};
