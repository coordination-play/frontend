import { ComponentProps } from "react";
import { Button } from "../ui/button";
import { SpinnerSvg } from "../icons";

type ContractWriteButtonProps = ComponentProps<typeof Button> & {
  label: React.ReactNode;
  args: unknown;

  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;

  writeAsyncAndWait: (args: unknown) => Promise<void>;
};

export const ContractWriteButton = ({
  label,
  args,

  isLoading,
  isSuccess,
  isError,

  writeAsyncAndWait,
  onClick,

  ...props
}: ContractWriteButtonProps) => {
  return (
    <Button
      disabled={isLoading || isError || isSuccess}
      onClick={onClick || (() => writeAsyncAndWait(args))}
      {...props}
    >
      {isLoading ? <SpinnerSvg /> : label}
    </Button>
  );
};
