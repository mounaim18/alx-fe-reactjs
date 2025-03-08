import useRecipeStore from "./recipeStore";
import { Links } from "react-router-dom";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}

      <Links to={`/recipes/${recipes[0].id}`}>filteredRecipe</Links>
    </div>
  );
};

export default RecipeList;
