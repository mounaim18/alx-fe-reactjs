import "./App.css";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <div className="App">
        <TodoList />
        <AddTodoForm />
      </div>
    </>
  );
}

export default App;
