import { getEnv } from "./env";

export const getPinataUrl = (cid: string) =>
  getEnv("VITE_PINATA_GATEWAY_URL").replace("{CID}", cid);
