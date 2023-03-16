import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Editor, editor } from "@tinymce/tinymce-react";


const CreateRecipe = ({ setRecipes }) => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);

  const initialState = {
    name: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  };
  const [recipe, setRecipe] = useState(initialState);


  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredients = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  // const handleInstructionsChange = (content) => {
  //   const cleanContent = content.replace(/<[^>]+>/g, "");
  //   const value = content;
  //   setRecipe({ ...recipe, instructions: value });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://yummy-server-gf9i.onrender.com/recipes",
        { ...recipe },
        { headers: { authorization: cookies.access_token } }
      );
      alert("Recipe Created!");

      // navigate("/");
      setRecipes();
      setRecipe(initialState);
      document.forms["formSubmit"].reset();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="create-recipe">
      <h1>Create-Recipe</h1>
      <form onSubmit={handleSubmit} name="formSubmit">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleOnChange} />
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button
          type="button"
          className="addIngredientsBtn"
          onClick={handleAddIngredients}
        >
          Add Ingredients
        </button>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleOnChange}
        />
        {/* <Editor
          type="text"
          id="instructions"
          name="instructions"
          initialValue="<p>hiii..</p>"
          onEditorChange={handleInstructionsChange}
          // onChange={(event, editor) =>
          //   handleInstructionsChange((editorRef.current = editor))
          // }
          // onChange={(event) => handleInstructionsChange(event)}
        /> */}

        <label htmlFor="imageUrl">Image Url</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleOnChange}
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleOnChange}
        />
        <button type="submit" className="submitBtn">
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
