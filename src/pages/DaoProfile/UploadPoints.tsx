import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export const UploadPointsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="md" variant="secondary">
          Upload Points
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Points</DialogTitle>
        </DialogHeader>
        <Input id="picture" type="file" className="text-text" />
        <DialogFooter>
          <Button type="submit" className="w-full" size="xl">
            Upload Points
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
