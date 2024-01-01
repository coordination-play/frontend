import { Box } from "@/components/ui/box";
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
import { Label } from "@/components/ui/label";

export const CreateGuildDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Box
          asChild
          variant="navy"
          className="h-20 rounded-lg px-6 flex items-center font-bold"
        >
          <button>Create Guild</button>
        </Box>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Create Guild</DialogTitle>
        </DialogHeader>

        <Label htmlFor="name" className="mt-4">
          Guild Name
        </Label>

        <Input id="name" placeholder="Enter a name" />

        <DialogFooter>
          <Button type="submit" className="w-full" size="xl">
            Create Guild
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
