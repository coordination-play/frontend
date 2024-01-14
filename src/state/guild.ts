import { proxy, useSnapshot } from "valtio";

const guildState = proxy({ activeGuild: "" });

export const useGuildState = () => {
  const state = useSnapshot(guildState);
  return state;
};

export const setActiveGuild = (guildAddress: string) => {
  guildState.activeGuild = guildAddress;
};
