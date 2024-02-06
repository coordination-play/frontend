import dayjs from "dayjs";
import { proxy, useSnapshot } from "valtio";

import { getMonthId } from "@/lib/utils";
import { toast } from "sonner";

const orgState = proxy({
  activeGuild: "",
  monthId: getMonthId(dayjs().month() + 1, dayjs().year()),
});

export const useOrgState = () => {
  const state = useSnapshot(orgState);
  return state;
};

export const setActiveGuild = (guildAddress: string) => {
  orgState.activeGuild = guildAddress;
};

export const setMonthId = (month: number, year: number) => {
  if (month === 0) {
    toast.error("0 is not a valid month id, months are 1 indexed");
  }

  orgState.monthId = getMonthId(month, year);
};
