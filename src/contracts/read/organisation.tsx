import { num, shortString } from "starknet";
import { UseContractReadProps, useContractRead } from ".";
import { OrganisationABI } from "../contracts";

import * as z from "zod";

const readOrganisation = {
  name: {
    returnType: z.bigint(),
    parsedType: z.string().optional(),
    parse: function (data: unknown): z.infer<typeof this.parsedType> {
      if (!data) return undefined;

      // parse
      const parsedData = this.returnType.parse(data);

      return shortString.decodeShortString(parsedData.toString());
    },
  },
  metadata: {
    returnType: z.array(z.bigint()),
    parsedType: z.string().optional(),
    parse: function (data: unknown): z.infer<typeof this.parsedType> {
      if (!data) return undefined;

      const parsedData = this.returnType.parse(data);

      const cid = parsedData
        .map((shortStr: bigint) => {
          return shortString.decodeShortString(num.toHex(shortStr));
        })
        .join("");

      return cid;

      // const await j.get(myImmutableAddress))
    },
  },
  all_guilds_details: {
    returnType: z.object({
      0: z.bigint(),
      1: z.array(
        z.object({
          name: z.bigint(),
          guild: z.bigint(),
        })
      ),
    }),
    parsedType: z
      .object({
        count: z.number(),
        guilds: z.array(z.object({ name: z.string(), address: z.string() })),
      })
      .optional(),
    parse: function (data: unknown): z.infer<typeof this.parsedType> {
      if (!data) return undefined;

      // parse
      const parsedData = this.returnType.parse(data);

      const guildsCount = Number(parsedData["0"]!);
      const guilds = [];

      for (let i = 0; i < guildsCount; i++) {
        const guild = {
          name: shortString.decodeShortString(
            parsedData["1"][i].name.toString()
          ),
          address: num.toHex(parsedData["1"][i].guild),
        };

        guilds.push(guild);
      }

      return { count: guildsCount, guilds };
    },
  },
  get_salary_contract: {
    returnType: z.bigint(),
    parsedType: z.string().optional(),
    parse: function (data: unknown): z.infer<typeof this.parsedType> {
      if (!data) return undefined;

      const parsedData = this.returnType.parse(data);
      return num.toHex(parsedData.toString());
    },
  },
  get_treasury_contract: {
    returnType: z.bigint(),
    parsedType: z.string().optional(),
    parse: function (data: unknown): z.infer<typeof this.parsedType> {
      if (!data) return undefined;

      const parsedData = this.returnType.parse(data);
      return num.toHex(parsedData.toString());
    },
  },
  is_granted: {
    returnType: z.boolean(),
    parsedType: z.boolean().optional(),
    parse: function (data: unknown): z.infer<typeof this.parsedType> {
      if (!data) return undefined;

      const parsedData = this.returnType.parse(data);
      return parsedData;
    },
  },
} as const;

const useReadOrganisationContract = <R,>(props: UseContractReadProps) =>
  useContractRead<R>({
    abi: OrganisationABI,
    ...props,
  });

// HOOKS
type Props = {
  address: string;
};

export const useGetOrgName = (props: Props) => {
  return useReadOrganisationContract<
    z.infer<typeof readOrganisation.name.parsedType>
  >({
    functionName: "name",
    address: props.address,
    parseResultFn: (d) => readOrganisation.name.parse(d),
  });
};

export const useGetOrgMetadata = (props: Props) => {
  return useReadOrganisationContract<
    z.infer<typeof readOrganisation.metadata.parsedType>
  >({
    functionName: "metadata",
    address: props.address,
    parseResultFn: (d) => readOrganisation.metadata.parse(d),
  });
};

export const useGetOrgAllGuilds = (props: Props) => {
  return useReadOrganisationContract<
    z.infer<typeof readOrganisation.all_guilds_details.parsedType>
  >({
    functionName: "get_all_guilds_details",
    address: props.address,
    parseResultFn: (d) => readOrganisation.all_guilds_details.parse(d),
  });
};

export const useGetOrgSalaryContract = (props: Props) => {
  return useReadOrganisationContract<
    z.infer<typeof readOrganisation.get_salary_contract.parsedType>
  >({
    functionName: "get_salary_distributor_contract",
    address: props.address,
    parseResultFn: (d) => readOrganisation.get_salary_contract.parse(d),
  });
};

export const useGetOrgTreasuryContract = (props: Props) => {
  return useReadOrganisationContract<
    z.infer<typeof readOrganisation.get_treasury_contract.parsedType>
  >({
    functionName: "get_treasury",
    address: props.address,
    parseResultFn: (d) => readOrganisation.get_treasury_contract.parse(d),
  });
};

export const useGetOrgIsGranted = (
  props: Props & { where: string; who: string; permissionId: string }
) => {
  return useReadOrganisationContract<
    z.infer<typeof readOrganisation.is_granted.parsedType>
  >({
    functionName: "is_granted",
    address: props.address,
    args: [props.where, props.who, props.permissionId],
    parseResultFn: (d) => readOrganisation.is_granted.parse(d),
  });
};
