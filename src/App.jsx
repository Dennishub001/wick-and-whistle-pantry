 import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RecipeCard from './Components/RecipeCard';
import FavoritesPage from './Components/FavouritesPage';
import './App.css'; // make sure you have your styles
import SearchBar from './Components/SearchBar';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('Error fetching recipes:', err));
  }, []);

  return (
    <Router>
      {/* Navigation */}
      <nav className="app-nav">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/favorites" className="nav-button">My Favorites</Link>
      </nav>
      <SearchBar />

      {/* Routes */}
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <div className="recipe-container">
              {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          }
        />
        {/* Favorites Route */}
        <Route
          path="/favorites"
          element={<FavoritesPage recipes={recipes} />}
        />
      </Routes>
    </Router>
  );
}

export default App;     