import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch the recipe data based on the ID
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedRecipe = data.find(
          (recipe) => recipe.id === parseInt(id)
        );
        setRecipe(selectedRecipe);
      })
      .catch((error) => console.error("Error fetching recipe details:", error));
  }, [id]);

  if (!recipe) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Recipe Image */}
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />

        {/* Recipe Title */}
        <h1 className="text-3xl font-bold mt-6 mb-4">{recipe.title}</h1>

        {/* Ingredients Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700 mb-2">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        {/* Cooking Steps Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Cooking Instructions</h2>
          <ol className="list-decimal list-inside">
            {recipe.instructions.map((instructions, index) => (
              <li key={index} className="text-gray-700 mb-2">
                {instructions}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
