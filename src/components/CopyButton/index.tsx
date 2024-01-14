import { Copy } from "lucide-react";
import { Button } from "../ui/button";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "sonner";

type CopyButtonProps = {
  text: string;
  onCopy?: () => void;

  label?: string;
  showToast?: boolean;
};

export const CopyButton = ({
  text,
  showToast = true,
  label = "Text",
  onCopy,
}: CopyButtonProps) => {
  return (
    <CopyToClipboard
      text={text}
      onCopy={() => {
        onCopy?.();

        if (showToast) {
          toast.success(`${label} copied to clipboard`);
        }
      }}
    >
      <Button variant="ghost" size="icon">
        <Copy className="text-inherit w-4 h-4" />
      </Button>
    </CopyToClipboard>
  );
};
