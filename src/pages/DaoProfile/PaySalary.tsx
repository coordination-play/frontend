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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PaySalaryDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="md" variant="secondary">
          Pay Salary
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pay Salary</DialogTitle>
        </DialogHeader>

        <Label className="mt-2" htmlFor="guild">
          Select Guild
        </Label>

        <Select>
          <SelectTrigger className="w-full" id="guild">
            <SelectValue placeholder="Design" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="growth">Growth</SelectItem>
              <SelectItem value="communityManagement">
                Community Management
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input placeholder="Enter salary amount" />

        <Label className="mt-2 font-normal" htmlFor="method">
          Select distribution method
        </Label>

        <Select>
          <SelectTrigger className="w-full" id="method">
            <SelectValue placeholder="Method 1" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="1">Method 1</SelectItem>
              <SelectItem value="2">Method 2</SelectItem>
              <SelectItem value="3">Method 3</SelectItem>
              <SelectItem value="4">Method 4</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button type="submit" className="w-full" size="xl">
            Send Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
