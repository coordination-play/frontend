import { Button } from "@/components/ui/button";
import { GiftIcon } from "lucide-react";

export const ClaimRewards = () => {
  return (
    <div className="w-full border border-border rounded-md">
      <div className="flex gap-2 items-center p-4 border-b border-border">
        <GiftIcon className="w-4 h-4" />
        <p className="font-semibold text-foreground/90">Unclaimed Rewards</p>
      </div>

      <div className="p-4 flex flex-col gap-4 pt-2">
        <p className="font-semibold text-3xl text-foreground/90">$110.87</p>

        <Button className="w-full">Claim</Button>
      </div>
    </div>
  );
};
