import React, { useEffect } from "react";
import useRecipeStore from "./useRecipeStore"; // Adjust the import path as necessary

const RecommendationsList = () => {
  // Access the store
  const { recommendations, generateRecommendations, favorites } =
    useRecipeStore();

  // Generate recommendations when the component mounts or when favorites change
  useEffect(() => {
    generateRecommendations();
  }, [favorites, generateRecommendations]);

  return (
    <div>
      <h2>Recommended Recipes</h2>
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((recipe) => (
            <li key={recipe.id}>
              <h3>{recipe.name}</h3>
              <p>{recipe.description}</p>
              {/* Add more recipe details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>
          No recommendations available. Add some favorites to get personalized
          recommendations!
        </p>
      )}
    </div>
  );
};

export default RecommendationsList;
