import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="flex items-center justify-between gap-2 px-12 py-5 border-b border-b-purple-800">
      <Link to="/">
        <img alt="logo" src="/assets/img/logo.png" />
      </Link>

      <div className="flex gap-2 items-center justify-between">
        <Button variant="secondary" size="lg">
          Starknet Goerli
        </Button>
        <Button size="lg">Connect Wallet</Button>
      </div>
    </div>
  );
};
