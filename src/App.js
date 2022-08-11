import "./App.css";
import Board from "./components/Board";
import { store } from "./app/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Board />
    </Provider>
  );
}

export default App;
