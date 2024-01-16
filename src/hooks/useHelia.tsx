// import { useCallback, useEffect, useState } from "react";

// import { createHelia } from "helia";
// import { JSON, json } from "@helia/json";
// import { CID } from "multiformats/cid";

export const useHelia = () => {};

// export const useHelia = () => {
//   const [helia, setHelia] = useState<JSON>();

//   const setupHelia = async () => {
//     const heliaProvider = await createHelia();
//     const heliaJson = json(heliaProvider);

//     setHelia(heliaJson);
//   };

//   useEffect(() => {
//     // IPFS
//     setupHelia();
//   }, []);

//   return { helia: helia! };
// };

// export const useGetHelia = ({ cid = "" }: { cid?: string }) => {
//   const [data, setData] = useState<Record<string, string>>();
//   const [loading, setLoading] = useState(false);

//   const { helia } = useHelia();

//   const getMetadata = useCallback(async () => {
//     if (!cid) return;

//     setLoading(true);
//     const data: Record<string, string> = await helia.get(CID.parse(cid));

//     setData(data);
//     setLoading(false);

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [cid]);

//   useEffect(() => {
//     if (cid) {
//       getMetadata();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [cid]);

//   return { data, loading };
// };
