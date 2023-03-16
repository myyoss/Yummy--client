import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useGetUserID } from "../hooks/useGetUserID";


const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();


  useEffect(() => {
    const getSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://yummy-server-gf9i.onrender.com/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };

    getSavedRecipes();
  }, [savedRecipes]);

  const deleteRecipe = async (recipeID) => {
    try {
      await axios.delete(
        `https://yummy-server-gf9i.onrender.com/recipes/savedRecipes/${recipeID}`
      );
      setSavedRecipes(savedRecipes);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="savedWrapper">
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            {savedRecipes.includes(recipe._id) && <h1>SAVED</h1>}
            <div>
              <h2>{recipe.name}</h2>
              <img src={recipe.imageUrl} alt={recipe.name} />
            </div>
            <p>Ingredients:</p>
            {recipe.ingredients.map((ingredient, i) => (
              <div key={i}>{ingredient}</div>
            ))}
            <p>Instructions:</p>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
            <button onClick={() => deleteRecipe(recipe._id)}>
              {/* {isRecipeSaved(recipe._id) ? "Deleted" : "Save"} */}
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedRecipes;
