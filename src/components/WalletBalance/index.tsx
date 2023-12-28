import { Box } from "../ui/box";

export const WalletBalance = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box variant="shadow" className="rounded-lg">
      <div className="p-4 border-b border-b-border/20">
        <p className="text-lg font-semibold text-background">Wallet Balance</p>
      </div>

      <div className="p-4">
        <p className="text-3xl font-bold text-background">$18480.87</p>
      </div>

      {children}
    </Box>
  );
};
