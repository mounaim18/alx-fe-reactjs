import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRecipeStore } from "./recipeStore";

const EditRecipeForm = () => {
  const { recipeId } = useParams(); // Get the recipeId from the URL
  const navigate = useNavigate();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [ingredients, setIngredients] = useState(recipe.ingredients.join(", "));
  const [instructions, setInstructions] = useState(
    recipe.instructions.join("\n")
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedRecipe = {
      ...recipe,
      title,
      description,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
      instructions: instructions.split("\n").map((step) => step.trim()),
    };
    updateRecipe(updatedRecipe);
    navigate(`/recipes/${recipeId}`); // Navigate back to RecipeDetails
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Ingredients (comma separated):</label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>
      <div>
        <label>Instructions (one per line):</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={() => navigate(`/recipes/${recipeId}`)}>
        Cancel
      </button>
    </form>
  );
};

export default EditRecipeForm;
