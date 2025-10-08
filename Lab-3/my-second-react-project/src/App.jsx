import "./App.css";
import ColorBoxesContainer from "./Components/ColorBoxesContainer";
import colors from "./data/data";

function App() {
  return (
    <>
      <h1>Color Box Grid</h1>
      <ColorBoxesContainer colors={colors} />
    </>
  );
}

export default App;
