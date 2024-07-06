import "./App.css";
import { ClassState } from "./ClassState";
import { UseState } from "./UseState";

function App() {
  return (
    <div className="App">
      <UseState name="Use State" />
      <hr />
      <ClassState name="Class State" />
    </div>
  );
}

export default App;
