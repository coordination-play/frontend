import { Toaster } from "./components/ui/toaster";

import { Routing } from "./pages";
import { StarknetProvider } from "./provider";

function App() {
  return (
    <>
      <StarknetProvider>
        <Toaster />
        <Routing />
      </StarknetProvider>
    </>
  );
}

export default App;
