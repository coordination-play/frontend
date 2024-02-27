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

// import React, { createContext, useContext, useState } from "react";

// type Props = {
//   children: React.ReactNode;
// };
// type Context = {
//   activeGuild: string;
//   monthId: string;

//   setActiveGuild: (adr: string) => void;
//   setMonthId: (month: number, year: number) => void;
// };

// const OrgContext = createContext<Context | null>({
//   activeGuild: "",
//   monthId: getMonthId(dayjs().month() + 1, dayjs().year()),

//   setActiveGuild: () => {},
//   setMonthId: () => {},
// });

// export const OrgContextProvider = ({ children }: Props) => {
//   const [state, setState] = useState<Context>({
//     activeGuild: "",
//     monthId: getMonthId(dayjs().month() + 1, dayjs().year()),
//     setActiveGuild: () => {},
//     setMonthId: () => {},
//   });

//   const setActiveGuild = (guildAddress: string) => {
//     setState({ ...state, activeGuild: guildAddress });
//   };

//   const setMonthId = (month: number, year: number) => {
//     if (month === 0) {
//       toast.error("0 is not a valid month id, months are 1 indexed");
//     }

//     setState({ ...state, monthId: getMonthId(month, year) });
//   };

//   return (
//     <OrgContext.Provider value={{ ...state, setActiveGuild, setMonthId }}>
//       {children}
//     </OrgContext.Provider>
//   );
// };

// export const useOrgState = () => {
//   const context = useContext(OrgContext);

//   if (!context)
//     throw new Error("XContext must be called from within the XContextProvider");

//   return context;
// };
