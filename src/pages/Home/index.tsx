import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAccount } from "@starknet-react/core";
import { Globe } from "lucide-react";
import { CreateOrgDialog } from "./CreateOrgDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useGetAllOrganisationDetails } from "@/contracts/read/factory";
import { OrganisationBox } from "./OrganisationBox";

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState("allorgs");

  const { isConnected } = useAccount();

  const { data, isLoading } = useGetAllOrganisationDetails();

  return (
    <div className="h-full flex-1 mt-16 max-w-5xl mx-auto flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2 w-full">
        <h5 className="text-3xl font-medium">Explore Organizations</h5>
        <p className="text-foreground/50">
          Find and explore hundreds of web3 Organisations
        </p>
      </div>

      {/* <div>
        <Input
          className="w-full"
          placeholder="Search organisation with name and contract address"
        />
      </div> */}

      <Tabs
        defaultValue="allorgs"
        className="w-full"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="flex w-full justify-start gap-2 flex-wrap h-full">
          <TabsTrigger value="allorgs">
            <Globe className="w-4 h-4" />
            All Organizations {data?.count ? `(${data.count})` : ""}
          </TabsTrigger>
          {isConnected ? (
            <TabsTrigger value="myorgs">My Organizations</TabsTrigger>
          ) : null}

          {isConnected ? (
            <CreateOrgDialog triggerClassName="hidden ml-auto sm:flex" />
          ) : null}
        </TabsList>

        <TabsContent value="allorgs">
          {isLoading ? (
            <Spinner />
          ) : !data?.count ? (
            <p className="font-medium text-sm"> No Organisations found </p>
          ) : (
            <div className="flex flex-col gap-2">
              {data.orgs.map((org, i) => (
                <OrganisationBox key={i} {...org} />
              ))}
            </div>
          )}

          {isConnected ? (
            <CreateOrgDialog triggerClassName="flex sm:hidden mt-8 w-full" />
          ) : null}
        </TabsContent>
        <TabsContent value="myorgs">
          <div className="w-full flex px-4 py-8 gap-6 items-center justify-center flex-col rounded-sm border border-border mt-4">
            <div className="flex flex-col gap-1 items-center max-w-xl text-center">
              <h6 className="font-medium text-2xl">
                Join or Create an Organisation
              </h6>
              <p className="font-normal text-sm text-foreground/50">
                You will see here a list of organisations you are a part of as a
                contributor and the organisations you have created
              </p>
            </div>

            <div className="flex gap-2 flex-col sm:flex-row">
              <Button
                variant="secondary"
                onClick={() => setActiveTab("allorgs")}
              >
                Explore All Organisations
              </Button>

              <CreateOrgDialog />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
