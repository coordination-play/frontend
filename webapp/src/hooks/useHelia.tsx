// import { useCallback, useEffect, useState } from "react";

// import { createHelia } from "helia";
// import { JSON, json } from "@helia/json";
// import { Strings, strings } from "@helia/strings";

// import { CID } from "multiformats/cid";

// export const useHelia = () => {
//   const [helia, setHelia] = useState<{ json?: JSON; string?: Strings }>({
//     json: undefined,
//     string: undefined,
//   });

//   const setupHelia = async () => {
//     const heliaProvider = await createHelia({});
//     const heliaJson = json(heliaProvider);
//     const string = strings(heliaProvider);

//     setHelia({ json: heliaJson, string });
//   };

//   useEffect(() => {
//     // IPFS
//     setupHelia();
//   }, []);

//   return { json: helia.json!, strings: helia.string! };
// };

// export const useGetHeliaString = ({ cid = "" }: { cid?: string }) => {
//   const [data, setData] = useState<string>();
//   const [loading, setLoading] = useState(false);

//   const { strings } = useHelia();

//   const getMetadata = useCallback(async () => {
//     if (!cid) return;

//     setLoading(true);
//     const data: string = await strings.get(CID.parse(cid));

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

// export const useGetHeliaJson = ({ cid = "" }: { cid?: string }) => {
//   const [data, setData] = useState<Record<string, string>>();
//   const [loading, setLoading] = useState(false);

//   const { json } = useHelia();

//   const getMetadata = useCallback(async () => {
//     if (!cid) return;

//     setLoading(true);
//     const data: Record<string, string> = await json.get(CID.parse(cid));

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
