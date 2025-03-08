import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import RecipeEdit from "./components/RecipeEdit";
import RecipeDelete from "./components/RecipeDelete";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Home page (optional) */}
          <Route path="/" element={<Home />} />

          {/* Route for RecipeDetails */}
          <Route path="/recipes/:recipeId" element={<RecipeDetails />}>
            {/* Nested routes for editing and deleting */}
            <Route path="edit" element={<RecipeEdit />} />
            <Route path="delete" element={<RecipeDelete />} />
          </Route>
        </Routes>
      </Router>

      <AddRecipeForm />
      <RecipeList />
    </>
  );
}

export default App;
