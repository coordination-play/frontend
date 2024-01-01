import { Routing } from "./pages";
import { StarknetProvider } from "./provider";

function App() {
  return (
    <>
      <StarknetProvider>
        <Routing />
      </StarknetProvider>
    </>
  );
}

export default App;
