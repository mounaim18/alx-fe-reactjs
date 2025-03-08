import { useParams, Link, Outlet } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const RecipeDetails = () => {
  const { recipeId } = useParams(); // Get the recipeId from the URL
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <ol>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      {/* Links to edit and delete */}
      <div>
        <Link to={`/recipes/${recipeId}/edit`}>Edit Recipe</Link>
        <Link to={`/recipes/${recipeId}/delete`}>Delete Recipe</Link>
      </div>

      {/* Outlet for nested routes (RecipeEdit and RecipeDelete) */}
      <Outlet />
    </div>
  );
};

export default RecipeDetails;
