import { ListLayout } from "./components/ListLayout/ListLayout";
import { ToDoContextProvider } from "./contexts/ToDoContext";
import "./index.css";

function App() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <ToDoContextProvider>
        <ListLayout />
      </ToDoContextProvider>
    </div>
  );
}

export default App;
