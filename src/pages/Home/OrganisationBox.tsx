import { truncateAddress } from "@/lib/utils";
import { Link } from "react-router-dom";

export const OrganisationBox = (org: { address: string; name: string }) => {
  return (
    <Link
      to={`/org/${org.address}`}
      className="px-4 py-4 flex items-center gap-4 border-border rounded-lg bg-foreground/5"
    >
      {/* <img className="aspect-square h-full" /> */}
      <div className="flex flex-col">
        <h6 className="text-lg text-foreground/90 font-medium">{org.name}</h6>
        <p className="text-sm text-foreground/40">
          {truncateAddress(org.address)}
        </p>
      </div>

      {/* <div className="p-1.5 rounded-md border-border border ml-auto">
        <p className="text-sm text-foreground/70">
          300 Contributors{" "}
        </p>
      </div> */}
    </Link>
  );
};
