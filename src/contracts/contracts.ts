import { getEnv } from "@/lib/env";

import FactoryABI from "./abis/Factory.json";
import OrganisationABI from "./abis/Organisation.json";
import GuildABI from "./abis/Guild.json";
import SalaryABI from "./abis/Salary.json";
import ETHTokenABI from "./abis/ETHToken.json";

export const CONTRACTS_ADDRESSES = {
  FACTORY: getEnv("VITE_FACTORY_CONTRACT_ADDRESS"),
  // ORGANISATION: getEnv("VITE_ORGANISATION_CONTRACT_ADDRESS"),
  // GUILD: getEnv("VITE_GUILD_CONTRACT_ADDRESS"),
  SALARY: getEnv("VITE_SALARY_CONTRACT_ADDRESS"),
  ETH_TOKEN: getEnv("VITE_ETH_TOKEN_CONTRACT_ADDRESS"),
};

export { FactoryABI, OrganisationABI, GuildABI, SalaryABI, ETHTokenABI };
