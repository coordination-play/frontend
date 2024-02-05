import {
  TooltipContent,
  TooltipProvider,
  Tooltip as TooltipRoot,
  TooltipTrigger,
} from "../ui/tooltip";

export const Tooltip = ({
  text,
  children,
  asChild,
}: {
  text: React.ReactNode;
  children: React.ReactNode;
  asChild?: boolean;
}) => {
  return (
    <TooltipProvider>
      <TooltipRoot delayDuration={10}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
};
