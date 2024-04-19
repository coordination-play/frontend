import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        className: "group toast group-[.toaster]:backdrop-blur-xl",
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",

          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",

          // variants
          error: "group-[.toaster]:bg-destructive/30 ",
          success: "group-[.toaster]:bg-success/30",
          warning: "group-[.toaster]:bg-accent/30",
          info: "group-[.toaster]:bg-primary/30",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
