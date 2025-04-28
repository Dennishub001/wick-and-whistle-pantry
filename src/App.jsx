import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeCard from "./Components/RecipeCard";
import FavoritesPage from "./Components/FavouritesPage";
import Navbar from "./Components/Navbar";
import SignUpPage from "./Components/LoginForm";
import SearchBar from "./Components/SearchBar";


import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    const signedUp = localStorage.getItem("isSignedUp") === "true";
    setIsSignedUp(signedUp);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  function handleFavoriteToggle(recipeId, isFavorite) {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === recipeId ? { ...recipe, isFavorite } : recipe
    );
    setRecipes(updatedRecipes);
  }

  return (
    <Router>
      <Navbar isSignedUp={isSignedUp} setIsSignedUp={setIsSignedUp} />
      

      <Routes>
        <Route
          path="/signup"
          element={<SignUpPage setIsSignedUp={setIsSignedUp} />}
        />
        <Route
          path="/"
          element={
            <>
             <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="recipe-container">
              {recipes
                .filter((recipe) =>
                  recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onFavoriteToggle={handleFavoriteToggle}
                    isSignedUp={isSignedUp}
                  />
                ))}
            </div>
            </>
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              recipes={recipes}
              isSignedUp={isSignedUp}
              onFavoriteToggle={handleFavoriteToggle}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
