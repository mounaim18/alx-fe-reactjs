import React, { useState } from "react";

const AddRecipeForm = () => {
  // State for form inputs
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    const validate = {};
    if (!title.trim()) {
      validate.title = "Title is required.";
    }
    if (!ingredients.trim()) {
      validate.ingredients = "Ingredients are required.";
    } else if (ingredients.split(",").length < 2) {
      validate.ingredients = "Please include at least two ingredients.";
    }
    if (!instructions.trim()) {
      validate.instructions = "Preparation steps are required.";
    }

    // If there are errors, set them and stop submission
    if (Object.keys(validate).length > 0) {
      setErrors(validate);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    // Log the new recipe (for now)
    const newRecipe = {
      id: Date.now(), // Temporary ID
      title,
      summary: "A new recipe added by the user.",
      imageUrl: "https://via.placeholder.com/400", // Placeholder image
      ingredients: ingredients.split(",").map((item) => item.trim()),
      instructions: instructions
        .split("\n")
        .map((instructions) => instructions.trim()),
    };

    console.log("New Recipe:", newRecipe);

    // Reset form fields
    setTitle("");
    setIngredients("");
    setInstructions("");

    alert("Recipe added successfully!");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Add a New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700">
            Recipe Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`mt-1 block w-full p-2 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Ingredients Field */}
        <div>
          <label
            htmlFor="ingredients"
            className="block text-lg font-medium text-gray-700">
            Ingredients (comma-separated)
          </label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className={`mt-1 block w-full p-2 border ${
              errors.ingredients ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            rows="3"
          />
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
        </div>

        {/* Steps Field */}
        <div>
          <label
            htmlFor="steps"
            className="block text-lg font-medium text-gray-700">
            Preparation Steps (one per line)
          </label>
          <textarea
            id="steps"
            value={steps}
            onChange={(e) => setInstructions(e.target.value)}
            className={`mt-1 block w-full p-2 border ${
              errors.steps ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            rows="5"
          />
          {errors.instructions && (
            <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;
