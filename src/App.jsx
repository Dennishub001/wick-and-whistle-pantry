import React, { useEffect, useState } from 'react';
 
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import RecipeCard from './Components/RecipeCard';
import FavoritesPage from './Components/FavouritesPage';
import LoginForm from './Components/LoginForm'; // Import LoginForm component
import './App.css'; // make sure you have your styles
 

const ProtectedRoute = ({ children, user }) => {
  return user ? children : <Navigate to="/login" />; // If not authenticated, redirect to login
};

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
        <Link to="/login" className="nav-button">Login</Link>
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
          element={
            <ProtectedRoute user={user}>
              <FavoritesPage recipes={recipes} />
            </ProtectedRoute>
          }
        />
        {/* Login Route */}
        <Route path="/login" element={<LoginForm />} />

        {/* Redirect any undefined routes to the login page */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
