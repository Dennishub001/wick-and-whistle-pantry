import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(recipe?.isFavorite);

  if (!recipe) return null;

  const { id, title, publisher, image } = recipe;

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
      <Link to={`/recipes/${id}`}>
        <img
          src={image || 'https://via.placeholder.com/280x180.png?text=No+Image+Available'}
          alt={title}
        />
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
    </div>
  );
}

export default RecipeCard;
