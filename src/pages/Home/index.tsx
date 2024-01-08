import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useReadFactoryContract } from "@/contracts";
import { useAccount } from "@starknet-react/core";
import { Globe } from "lucide-react";
import { CreateOrgDialog } from "./CreateOrgDialog";

export const HomePage = () => {
  const { isConnected } = useAccount();

  const { data, isLoading } = useReadFactoryContract({
    functionName: "get_all_organisations",
  });

  console.log("data", data);

  return (
    <div className="h-full flex-1 mt-16 max-w-5xl mx-auto flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2 w-full">
        <h5 className="text-3xl font-medium">Explore Organizations</h5>
        <p className="text-foreground/50">
          Find and explore hundreds of web3 Organisations
        </p>
      </div>

      <div>
        <Input
          className="w-full"
          placeholder="Search organisation with name and contract address"
        />
      </div>

      <Tabs defaultValue="allorgs" className="w-full">
        <TabsList className="flex w-full justify-start">
          <TabsTrigger value="allorgs">
            <Globe className="w-4 h-4" />
            All Organizations
          </TabsTrigger>
          {isConnected ? (
            <TabsTrigger value="myorgs">My Organizations</TabsTrigger>
          ) : null}

          {isConnected ? <CreateOrgDialog /> : null}
        </TabsList>
        <TabsContent value="allorgs">
          {isLoading ? (
            <Spinner />
          ) : !data ? (
            <p className="font-medium text-sm"> No Organisations found </p>
          ) : null}
        </TabsContent>
        <TabsContent value="myorgs">
          <div className="px-4 py-4 flex items-center gap-4 border-border rounded-lg bg-foreground/5">
            <img className="aspect-square h-full" />
            <div className="flex flex-col">
              <h6 className="text-lg text-foreground/90 font-medium">
                Vector DAO
              </h6>
              <p className="text-sm text-foreground/40">
                Creator DAO for application designers and developers working in
                web3.
              </p>
            </div>

            <div className="p-1.5 rounded-md border-border border ml-auto">
              <p className="text-sm text-foreground/70">300 Contributors </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
