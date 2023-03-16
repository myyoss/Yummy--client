import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <Link className="logo" to="/">
        <img src="images/yummy.png" alt="yummy.png"></img>
      </Link>
      <Link className="homeNavbar" to="/">
        Home
      </Link>
      <Link className="CreateRecipeNavbar" to="/createRecipe">
        Create Recipe
      </Link>
      {!cookies.access_token ? (
        <Link to="/auth">Login</Link>
      ) : (
        <>
          <Link to="/savedRecipes">Saved Recipes</Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Navbar;
