import { Box } from "@/components/ui/box";
import { Suspense, memo } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./layout";

import { ORGProfile } from "./OrgProfile";
import { NotFoundPage } from "./NotFound";
import { HomePage } from "./Home";

export const Routing = memo(() => {
  return (
    <Suspense fallback={<Box />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/org/:address" element={<ORGProfile />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
});

Routing.displayName = "Routing";
