import React from 'react';
import RecipeCard from './RecipeCard';

function FavoritesPage({ recipes, onFavoriteToggle }) {
  const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite);

  return (
    <>
    <h1>Recipe Favorites</h1>
    <div className="recipe-container">        
      {favoriteRecipes.length > 0 ? (
        favoriteRecipes.map(recipe => (
          <RecipeCard 
          key={recipe.id} 
          recipe={recipe}
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