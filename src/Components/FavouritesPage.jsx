import React from 'react';
import RecipeCard from './RecipeCard';
import SearchBar from "./SearchBar";


function FavoritesPage({ recipes, onFavoriteToggle, isSignedUp, searchTerm, setSearchTerm  }) {
    const favoriteRecipes = recipes
    .filter(recipe => recipe.isFavorite)
    .filter(recipe => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (!isSignedUp) {
    return (
      <div>
        <h1>Recipe Favorites</h1>
        <p>You need to sign up to view your favorite recipes!</p>
      </div>
    );
  }

  return (
    <>
    <h1>Recipe Favorites</h1>
    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    <div className="recipe-container">        
      {favoriteRecipes.length > 0 ? (
        favoriteRecipes.map(recipe => (
          <RecipeCard 
          key={recipe.id} 
          recipe={recipe}
          isSignedUp={isSignedUp}
          onFavoriteToggle={onFavoriteToggle}
           />
        ))
      ) : (
        <p>No favorites yet. Add some from the homepage!</p>
      )}
    </div>
    </>
  );
}



export default FavoritesPage;