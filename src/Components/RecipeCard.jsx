import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

function RecipeCard({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(recipe?.isFavorite);
  const [showDetails, setShowDetails] = useState(false);

  if (!recipe) return null;

  const { id, title, publisher, image, ingredients, instructions } = recipe;

  function handleFavoriteClick(event) {
    event.stopPropagation();
    event.preventDefault();

    const updatedFavorite = !isFavorite;

    fetch(`http://localhost:3000/recipes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isFavorite: updatedFavorite }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update favorite status.");
        return res.json();
      })
      .then(() => {
        setIsFavorite(updatedFavorite);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="recipe-card">
      <img
        src={image || 'https://via.placeholder.com/280x180.png?text=No+Image+Available'}
        alt={title}
        className="recipe-image"
      />
  
      <div className="recipe-info">
        <Link to={`/recipes/${id}`}>
          <h3>{title}</h3>
        </Link>
        <p>By: {publisher}</p>
  
        <button
          onClick={handleFavoriteClick}
          className="favorite-button"
          aria-label={isFavorite ? "Remove from Pantry" : "Add to Pantry"}
          title={isFavorite ? "Remove from Pantry" : "Add to Pantry"}
        >
          {isFavorite ? '★' : '☆'}
        </button>
  
        <button
          onClick={() => setShowDetails((prev) => !prev)}
          className="toggle-details-button"
        >
          {showDetails ? "Hide Details" : "View Details"}
        </button>
  
        {showDetails && (
          <div className="recipe-details">
            <h4>Ingredients:</h4>
            <ul>
              {ingredients && ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
  
            <h4>Instructions:</h4>
            <p>{instructions}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
