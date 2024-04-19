import { CONTRACTS_ADDRESSES } from "@/contracts/contracts";
import { truncateAddress } from "@/lib/utils";
import { CopyButton } from "../CopyButton";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { useExplorer } from "@starknet-react/core";

export const Footer = () => {
  const explorer = useExplorer();

  return (
    <div className="w-full flex items-center px-6 py-4">
      <div className="flex flex-col">
        {Object.entries(CONTRACTS_ADDRESSES).map(([name, adr], i) => (
          <div key={i} className="flex items-center gap-2">
            <p className="uppercase font-medium text-foreground/60">
              {name}:{" "}
              <span className="text-foreground/90">{truncateAddress(adr)}</span>
            </p>

            <div className="flex items-center">
              <CopyButton text={adr} label={name + " address"} />

              <Button variant="ghost" size="icon" asChild>
                <a href={explorer.contract(adr)} target="_blank">
                  <ExternalLink className="w-4 h-4 text-foreground/60" />
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
