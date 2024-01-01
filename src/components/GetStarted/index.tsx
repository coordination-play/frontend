import { ConnectWalletModal } from "../Header";
import { Box } from "../ui/box";

export const GetStarted = () => {
  return (
    <Box
      variant="navy"
      className="flex justify-center items-center flex-col gap-6 max-w-4xl px-4 w-full h-fit rounded-lg py-16"
    >
      <img
        alt="wallet"
        src="/assets/img/wallet.png"
        className="h-24 object-contain"
      />

      <p className="text-text/90 text-lg font-medium">
        Get started by connecting your wallet to see your organisation profile
      </p>

      <ConnectWalletModal />
    </Box>
  );
};
