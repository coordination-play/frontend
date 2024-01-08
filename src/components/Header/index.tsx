import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  useConnect,
  Connector,
  useAccount,
  useDisconnect,
  useNetwork,
} from "@starknet-react/core";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { truncateAddress } from "@/lib/utils";

export const Header = () => {
  const { address } = useAccount();

  return (
    <div className="flex items-center justify-between gap-2 px-12 py-5 border-b border-border">
      <Link to="/">
        <img alt="logo" src="/assets/img/logo.png" />
      </Link>

      <div className="flex gap-3 items-center justify-between">
        {address ? <WalletModal /> : <ConnectWalletModal />}
      </div>
    </div>
  );
};

export const ConnectWalletModal = () => {
  const { connect, connectors } = useConnect();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Connect Wallet</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="font-bold">Connect Wallet</DialogTitle>

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
      </DialogContent>
    </Dialog>
  );
};

const WalletModal = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const {
    chain: { name },
  } = useNetwork();

  const addressShort = address ? truncateAddress(address) : null;

  return (
    <>
      <Button variant="outline" className="w-fit">
        {name}
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">{addressShort}</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogTitle className="font-bold">Wallet</DialogTitle>

          <p className="text-xs font-medium">{address}</p>

          <div className="flex flex-col gap-2">
            <DialogClose asChild>
              <Button asChild>
                <Link to={`/contributor/${address}`}>Dashboard</Link>
              </Button>
            </DialogClose>

            <Button variant="secondary" onClick={() => disconnect()}>
              Disconnect
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
