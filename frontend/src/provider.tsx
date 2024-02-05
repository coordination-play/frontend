"use client";
import React from "react";

import { goerli } from "@starknet-react/chains";
import {
  StarknetConfig,
  alchemyProvider,
  argent,
  braavos,
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
      chains={[goerli]}
      provider={alchemyProvider({
        apiKey: getEnv("VITE_ALCHEMY_API_KEY"),
      })}
      connectors={connectors}
      explorer={voyager}
      // autoConnect
      // queryClient={queryClient}
    >
      {children}
    </StarknetConfig>
  );
};
