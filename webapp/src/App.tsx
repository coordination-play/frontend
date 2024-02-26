import { Toaster } from "./components/ui/sonner";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Routing } from "./pages";
import { StarknetProvider } from "./provider";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StarknetProvider>
          <Toaster richColors />
          <Routing />
        </StarknetProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
