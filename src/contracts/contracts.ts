import { getEnv } from "@/lib/env";

import FactoryABI from "./abis/Factory.json";
import OrganisationABI from "./abis/Organisation.json";
import GuildABI from "./abis/Guild.json";
import SalaryABI from "./abis/Salary.json";
import TreasuryABI from "./abis/Treasury.json";
import ETHTokenABI from "./abis/ETHToken.json";

export const CONTRACTS_ADDRESSES = {
  FACTORY: getEnv("VITE_FACTORY_CONTRACT_ADDRESS"),
  ETH_TOKEN: getEnv("VITE_ETH_TOKEN_CONTRACT_ADDRESS"),
};

export {
  FactoryABI,
  OrganisationABI,
  GuildABI,
  SalaryABI,
  TreasuryABI,
  ETHTokenABI,
};
