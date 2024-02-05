import { useMemo } from "react";

import {
  UseContractReadResult,
  useContractRead as useStarketContractRead,
} from "@starknet-react/core";

import { UseContractReadProps as useStarknetContractReadProps } from "@starknet-react/core";

import { useToast } from "@/components/ui/use-toast";

export type UseContractReadProps = useStarknetContractReadProps & {
  functionName: string;
  parseResultFn?: (data: unknown) => unknown;
};

export const useContractRead = <R,>(
  props: UseContractReadProps
): Omit<UseContractReadResult, "data"> & { data: R | undefined } => {
  const { toast } = useToast();

  const res = useStarketContractRead(props);

  const data = useMemo<R | undefined>(() => {
    if (res.isError) return undefined;

    try {
      const retunedData = props.parseResultFn?.(res.data) as R;
      return retunedData;
    } catch (err) {
      console.error("fetch data", err, res.data);

      res.isError = true;
      res.error = err as unknown as Error;
      res.isSuccess = false;
      res.status = "error";

      toast({
        variant: "destructive",
        title: `Failed to parse '${props.functionName}' data`,
      });

      return undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res.data]);

  return { ...res, data };
};
