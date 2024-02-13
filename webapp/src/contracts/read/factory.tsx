import { CONTRACTS_ADDRESSES, FactoryABI } from "../contracts";

import * as z from "zod";
import { UseContractReadProps, useContractRead } from ".";
import { num, shortString } from "starknet";

export const readFactory = {
  // get_all_organisations
  get_all_organisations: {
    returnType: z.object({ 0: z.bigint(), 1: z.array(z.bigint()) }),
    parsedType: z
      .object({
        count: z.number(),
        orgs: z.array(z.object({ address: z.string() })),
      })
      .optional(),
    parse: function (data: unknown): z.infer<typeof this.parsedType> {
      if (!data) return undefined;

      // parse
      const parsedData = this.returnType.parse(data);

      const orgsCount = Number(parsedData["0"]!);
      const orgs = [];

      for (let i = 0; i < orgsCount; i++) {
        const org = {
          address: String(parsedData["1"]?.[i]),
        };

        orgs.push(org);
      }

      return { count: orgsCount, orgs };
    },
  },
  get_all_organisations_details: {
    returnType: z.object({
      0: z.bigint(),
      1: z.array(
        z.object({
          metadata: z.array(z.bigint()),
          name: z.bigint(),
          organisation: z.bigint(),
        })
      ),
    }),
    parsedType: z
      .object({
        count: z.number(),
        orgs: z.array(
          z.object({ name: z.string(), address: z.string(), ipfs: z.string() })
        ),
      })
      .optional(),
    parse: function (data: unknown): z.infer<typeof this.parsedType> {
      if (!data) return undefined;

      // parse
      const parsedData = this.returnType.parse(data);

      const orgsCount = Number(parsedData["0"]!);
      const orgs = [];

      for (let i = 0; i < orgsCount; i++) {
        const org = {
          address: num.toHex(parsedData["1"][i].organisation),
          name: shortString.decodeShortString(
            parsedData["1"][i].name.toString()
          ),
          ipfs: parsedData["1"][i].metadata
            .map((shortStr: bigint) => {
              return shortString.decodeShortString(num.toHex(shortStr));
            })
            .join(""),
        };

        orgs.push(org);
      }

      return { count: orgsCount, orgs };
    },
  },
  get_creation_fee: {
    returnType: z.bigint(),
    parsedType: z.number().optional(),
    parse: function (data: unknown): z.infer<typeof this.parsedType> {
      if (!data) return undefined;

      const parsedData = this.returnType.parse(data);
      return Number(parsedData.toString());
    },
  },
  owner: {
    returnType: z.string(),
    parsedType: z.string().optional(),
    parse: function (data: unknown): z.infer<typeof this.parsedType> {
      if (!data) return undefined;

      // parse
      const parsedData = this.returnType.parse(data);

      return parsedData;
    },
  },
} as const;

const useReadFactoryContract = <R,>(props: UseContractReadProps) =>
  useContractRead<R>({
    abi: FactoryABI,
    address: CONTRACTS_ADDRESSES.FACTORY,
    ...props,
  });

// HOOKS
export const useGetAllOrganisations = () =>
  useReadFactoryContract<
    z.infer<typeof readFactory.get_all_organisations.parsedType>
  >({
    functionName: "get_all_organisations",
    parseResultFn: (d) => readFactory.get_all_organisations.parse(d),
  });

export const useGetAllOrganisationDetails = () =>
  useReadFactoryContract<
    z.infer<typeof readFactory.get_all_organisations_details.parsedType>
  >({
    functionName: "get_all_organisations_details",
    parseResultFn: (d) => readFactory.get_all_organisations_details.parse(d),
  });

export const useOrgCreationDeposit = () => {
  return useReadFactoryContract<
    z.infer<typeof readFactory.get_creation_fee.parsedType>
  >({
    functionName: "get_creation_fee",
    parseResultFn: (d) => readFactory.get_creation_fee.parse(d),
  });
};

export const useGetFactoryOwner = () =>
  useReadFactoryContract<z.infer<typeof readFactory.owner.parsedType>>({
    functionName: "get_all_organisations",
    parseResultFn: readFactory.owner.parse,
  });
