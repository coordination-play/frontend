import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { truncateAddress } from "@/lib/utils";
import { useEffect, useState } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";

export const Profile = ({ address }: { address: string }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  return (
    <Box
      variant="shadow"
      className="flex items-center border border-border flex-col rounded-lg"
    >
      <Box
        variant="pinkPurple"
        className="w-full h-[100px] rounded-t-[inherit]"
      />

      <div className="p-8 w-full flex flex-col gap-3 -mt-24">
        <div className="p-2 rounded-lg bg-text-inverse/10 aspect-square max-w-36 mx-auto">
          <img
            alt="contributor"
            src="/assets/img/contributor.png"
            className="w-full aspect-square object-cover rounded-[inherit]"
          />
        </div>

        <div className="flex flex-col items-center">
          <p className="text-xl text-text font-bold text-center">
            {truncateAddress(address)}
          </p>

          <CopyToClipboard text={address} onCopy={() => setCopied(true)}>
            <Button size="sm" variant="link">
              {!copied ? "Copy Address" : "Copied!"}
            </Button>
          </CopyToClipboard>
        </div>

        {/* <Button variant="tertiary" className="w-full">
            Switch Account
          </Button> */}
      </div>
    </Box>
  );
};
