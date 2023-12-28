import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { memo } from "react";

import { Link } from "react-router-dom";

export const NotFoundPage = memo(() => (
  <>
    <Box className="flex flex-col items-center h-full">
      <h1 className="font-bold text-2xl text-foreground">404</h1>

      <p className="text-foreground/50">
        Page not found. The URL may be misspelled or the page may have moved.
      </p>

      <Button asChild variant="secondary">
        <Link to="/">Return to Home</Link>
      </Button>
    </Box>
  </>
));

NotFoundPage.displayName = "NotFound";
