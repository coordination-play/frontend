import { UseContractReadProps, useContractRead } from ".";
import { GuildABI } from "../contracts";

import * as z from "zod";

const readGuild = {
  get_cum_contribution_points: {
    returnType: z.bigint(),
    parsedType: z.number(),
    parse: function (data: unknown): z.infer<typeof this.parsedType> {
      if (!data) return 0;

      const parsedData = this.returnType.parse(data);
      return Number(parsedData.toString()) || 0;
    },
  },
  get_monthly_total_contribution: {
    returnType: z.bigint(),
    parsedType: z.number(),
    parse: function (data: unknown): z.infer<typeof this.parsedType> {
      if (!data) return 0;

      const parsedData = this.returnType.parse(data);
      return Number(parsedData.toString()) || 0;
    },
  },
  get_contributions_data: {
    returnType: z.array(z.bigint()),
    parsedType: z.array(z.number()),
    parse: function (data: unknown): z.infer<typeof this.parsedType> {
      if (!data) return [];

      // parse
      const parsedData = this.returnType.parse(data);
      return parsedData.map((d) => Number(d.toString()));
    },
  },
  get_monthly_contribution_points: {
    returnType: z.bigint(),
    parsedType: z.number(),
    parse: function (data: unknown): z.infer<typeof this.parsedType> {
      if (!data) return 0;

      // parse
      const parsedData = this.returnType.parse(data);

      return Number(parsedData.toString()) || 0;
    },
  },
  owner: {
    returnType: z.string(),
    parsedType: z.string(),
    parse: function (data: unknown): z.infer<typeof this.parsedType> {
      if (!data) return "";

      // parse
      const parsedData = this.returnType.parse(data);

      return parsedData;
    },
  },
};

// HOOKS
const useReadGuildContract = <R,>(props: UseContractReadProps) =>
  useContractRead<R>({
    abi: GuildABI,
    ...props,
  });

export const useGetGuildCumContributionPoints = ({
  address,
  contributor,
}: {
  address: string;
  contributor: string;
}) =>
  useReadGuildContract<
    z.infer<typeof readGuild.get_cum_contribution_points.parsedType>
  >({
    address,
    args: [contributor],
    functionName: "get_cum_contribution_points",
    parseResultFn: (d) => readGuild.get_cum_contribution_points.parse(d),
  });

export const useGetGuildMonthlyTotalContribution = ({
  address,
  monthId,
}: {
  address: string;
  monthId: number;
}) =>
  useReadGuildContract<
    z.infer<typeof readGuild.get_monthly_total_contribution.parsedType>
  >({
    address,
    args: [monthId],
    functionName: "get_monthly_total_contribution",
    parseResultFn: (d) => readGuild.get_monthly_total_contribution.parse(d),
  });

export const useGetGuildContributionsData = ({
  address,
  contributor,
}: {
  address: string;
  contributor: string;
}) =>
  useReadGuildContract<
    z.infer<typeof readGuild.get_contributions_data.parsedType>
  >({
    address,
    args: [contributor],
    functionName: "get_contributions_data",
    parseResultFn: (d) => readGuild.get_contributions_data.parse(d),
  });

export const useGetGuildMonthlyContributionPoints = ({
  address,
  contributor,
  monthId,
}: {
  address: string;
  contributor: string;
  monthId: number;
}) =>
  useReadGuildContract<
    z.infer<typeof readGuild.get_monthly_contribution_points.parsedType>
  >({
    address,
    args: [contributor, monthId],
    functionName: "get_monthly_contribution_points",
    parseResultFn: (d) => readGuild.get_monthly_contribution_points.parse(d),
  });

export const useGetGuildOwner = ({ address }: { address: string }) =>
  useReadGuildContract<z.infer<typeof readGuild.owner.parsedType>>({
    address,
    functionName: "owner",
    parseResultFn: readGuild.owner.parse,
  });
