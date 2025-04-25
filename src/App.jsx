import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeCard from './Components/RecipeCard';
import FavoritesPage from './Components/FavouritesPage';
import SearchBar from './Components/SearchBar';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('Failed to fetch recipes:', err));
  }, []);

  const filteredRecipes = recipes.filter(recipe => {
    const term = searchTerm.toLowerCase();
    return (
      recipe.title.toLowerCase().includes(term) ||
      recipe.ingredients?.some(ing => ing.toLowerCase().includes(term))
    );
  });

  return (
    <Router>
      {/* Nav Bar */}
      <nav className="app-nav">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/favorites" className="nav-button">My Favorites</Link>
      </nav>

      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <div className="recipe-container">
                {filteredRecipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </>
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
