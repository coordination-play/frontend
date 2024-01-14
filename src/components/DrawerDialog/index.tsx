import * as React from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type DrawerDialogProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;

  title: string;
  description?: string;

  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const DrawerDialog = ({
  trigger,
  children,
  title,
  description,
  open,
  onOpenChange: setOpen,
}: DrawerDialogProps) => {
  //   const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description ? (
              <DialogDescription>{description}</DialogDescription>
            ) : null}
          </DialogHeader>

          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      </DrawerTrigger>

      <DrawerContent className="p-4 pt-0">
        <DrawerHeader className="text-left px-0">
          <DrawerTitle>{title}</DrawerTitle>
          {description ? (
            <DrawerDescription>{description}</DrawerDescription>
          ) : null}
        </DrawerHeader>

        {children}
      </DrawerContent>
    </Drawer>
  );
};
