"use client";
import React from "react";

import { Chain, sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  argent,
  braavos,
  jsonRpcProvider,
  useInjectedConnectors,
  voyager,
} from "@starknet-react/core";
import { getEnv } from "./lib/env";
// import { queryClient } from "./lib/queryClient";

export const StarknetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { connectors } = useInjectedConnectors({
    // Show these connectors if the user has no connector installed.
    recommended: [argent(), braavos()],
    // Hide recommended connectors if the user has any connector installed.
    includeRecommended: "onlyIfNoConnectors",
    // Randomize the order of the connectors.
    order: "random",
  });

  return (
    <StarknetConfig
      chains={[sepolia]}
      provider={jsonRpcProvider({
        rpc: (chain: Chain) => {
          if (chain.id !== sepolia.id) {
            alert("Unsupported chain. Please switch to Startnet Sepolia");
            return null;
          }

          return {
            nodeUrl: `https://starknet-sepolia.g.alchemy.com/v2/${getEnv(
              "VITE_ALCHEMY_API_KEY"
            )}`,
          };
        },
      })}
      connectors={connectors}
      explorer={voyager}
      autoConnect
      // queryClient={queryClient}
    >
      {children}
    </StarknetConfig>
  );
};
