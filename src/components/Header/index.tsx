import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  useConnect,
  Connector,
  useAccount,
  useDisconnect,
  useNetwork,
} from "@starknet-react/core";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { truncateAddress } from "@/lib/utils";
import { Wallet2Icon } from "lucide-react";
import { DrawerDialog } from "../DrawerDialog";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { CopyButton } from "../CopyButton";

export const Header = () => {
  const { address } = useAccount();

  return (
    <div className="flex items-center justify-between gap-2 px-5 py-5 border-b border-border">
      <Link to="/" className="flex items-center gap-4">
        <img alt="logo" src="/logo.svg" className="w-8 h-8" />
        <p className="font-semibold text-xl hidden sm:block">
          Coordination Play
        </p>
      </Link>

      <div className="flex gap-3 items-center justify-between">
        {address ? <WalletModal /> : <ConnectWalletModal />}
      </div>
    </div>
  );
};

export const ConnectWalletModal = () => {
  const [open, setOpen] = useState(false);
  const { connect, connectors } = useConnect();

  return (
    <DrawerDialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>Connect Wallet</Button>}
      title="Connect Wallet"
    >
      <div className="flex flex-col gap-4">
        {connectors.map((connector: Connector) => (
          <Button
            key={connector.id}
            onClick={() => connect({ connector })}
            disabled={!connector.available()}
          >
            Connect {connector.name}
          </Button>
        ))}
      </div>
    </DrawerDialog>
  );
};

const WalletModal = () => {
  const { address } = useAccount();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const {
    chain: { name: chainName },
  } = useNetwork();

  const addressShort = address ? truncateAddress(address) : null;

  if (isDesktop) {
    return (
      <>
        <Button variant="outline" className="w-fit hidden md:flex">
          {chainName}
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Wallet2Icon className="w-4 h-4" />
              {addressShort}
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle className="font-bold">Wallet</DialogTitle>
            <WalletModalContent />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Wallet2Icon className="w-4 h-4" />
          {addressShort}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-bold">Wallet</SheetTitle>
        </SheetHeader>

        <WalletModalContent />
      </SheetContent>
    </Sheet>
  );
};

const WalletModalContent = () => {
  const { address = "" } = useAccount();
  const { disconnect } = useDisconnect();

  const addressShort = address ? truncateAddress(address) : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <CopyButton label="Address" text={address} />
        <p className="text font-medium">{addressShort}</p>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="destructive" onClick={() => disconnect()}>
          Disconnect
        </Button>
      </div>
    </div>
  );
};
