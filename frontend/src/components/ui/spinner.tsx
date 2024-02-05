import { Loader } from "lucide-react";

export const Spinner = ({ className }: { className?: string }) => {
  return <Loader className={`animate-spin ${className}`} />;
};
