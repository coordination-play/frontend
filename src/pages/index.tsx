import { Box } from "@/components/ui/box";
import { Suspense, memo } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./layout";

import { DAOProfile } from "./DaoProfile";
import { NotFoundPage } from "./NotFound";
import { ContributorProfilePage } from "./ContributorProfile";

export const Routing = memo(() => {
  return (
    <Suspense fallback={<Box />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DAOProfile />} />
          <Route path="/contributor" element={<ContributorProfilePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
});

Routing.displayName = "Routing";
