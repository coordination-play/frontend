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
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export const Header = () => {
  const { address } = useAccount();

  return (
    <div className="flex items-center justify-between gap-2 px-12 py-5 border-b border-lightPink/30">
      <Link to="/">
        <img alt="logo" src="/assets/img/logo.png" />
      </Link>

      <div className="flex gap-3 items-center justify-between">
        {address ? <DisconnectModal /> : <ConnectModal />}
      </div>
    </div>
  );
};

const ConnectModal = () => {
  const { connect, connectors } = useConnect();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">Connect Wallet</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Connect Wallet</DialogTitle>

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

const DisconnectModal = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const {
    chain: { name },
  } = useNetwork();

  const addressShort = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  return (
    <>
      <Button variant="secondary" size="lg" className="w-fit px-2 font-medium">
        {name}
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="tertiary" size="lg" className="px-2">
            {addressShort}
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>Disconnect Wallet</DialogHeader>
          <div className="flex flex-col gap-4">
            <Button onClick={() => disconnect()}>Disconnect</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
