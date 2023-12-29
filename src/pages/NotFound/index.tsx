import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { memo } from "react";

import { Link } from "react-router-dom";

export const NotFoundPage = memo(() => (
  <>
    <Box className="flex flex-col items-center mt-44 h-full justify-center gap-4">
      <h1 className="font-bold text-4xl text-text">404</h1>

      <p className="text-text/50">
        Page not found. The URL may be misspelled or the page may have moved.
      </p>

      <Button asChild variant="secondary">
        <Link to="/">Return to Home</Link>
      </Button>
    </Box>
  </>
));

NotFoundPage.displayName = "NotFound";
