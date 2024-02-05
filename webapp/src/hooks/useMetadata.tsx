import { getPinataUrl } from "@/lib/pinata";
import { useQuery } from "@tanstack/react-query";

export const useOrgMetadataJSON = (cid?: string) =>
  useQuery({
    queryKey: ["metadata", cid],
    queryFn: async () => {
      const res = await fetch(getPinataUrl(cid || ""));
      const data = await res.json();
      return data;
    },
    enabled: !!cid,
  });
