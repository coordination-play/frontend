import { Box } from "../ui/box";
import { Button } from "../ui/button";

export const GetStarted = () => {
  return (
    <Box
      variant="navy"
      className="flex justify-center items-center flex-col gap-6 max-w-4xl px-4 w-full rounded-lg py-16"
    >
      <img
        alt="wallet"
        src="/assets/img/wallet.png"
        className="h-24 object-contain"
      />

      <p className="text-text/90 text-lg font-medium">
        Get started by connecting your wallet to see your organisation profile
      </p>

      <Button size="lg" className="w-fit">
        Connect Wallet
      </Button>
    </Box>
  );
};
