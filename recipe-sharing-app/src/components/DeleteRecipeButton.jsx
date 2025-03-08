import { useParams, useNavigate } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const DeleteRecipeButton = () => {
  const { recipeId } = useParams(); // Get the recipeId from the URL
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    deleteRecipe(recipeId);
    navigate("/"); // Navigate back to the home page after deletion
  };

  return (
    <div>
      <p>Are you sure you want to delete this recipe?</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate(`/recipes/${recipeId}`)}>Cancel</button>
    </div>
  );
};

export default DeleteRecipeButton;
