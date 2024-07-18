import "./App.css";
import { ClassState } from "./ClassState";
import { UseReducer } from "./UseReducer";
import { UseState } from "./UseState";

function App() {
  return (
    <div className="App">
      <UseState name="Use State" />
      <hr />
      <UseReducer name="Use Reducer" />
      <hr />
      <ClassState name="Class State" />
    </div>
  );
}

export default App;
