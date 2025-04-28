import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './RecipeCard.css';

function RecipeCard({ recipe, onFavoriteToggle, isSignedUp }) {
  const [isFavorite, setIsFavorite] = useState(recipe?.isFavorite);
  const [showDetails, setShowDetails] = useState(false);
  
  console.log(isSignedUp)
  console.log("onFavoriteToggle:", onFavoriteToggle);
  
  const { id, title, publisher, image, ingredients, instructions } = recipe;
  
  function handleFavoriteClick(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log("Favorite button clicked");

    if (!isSignedUp) {
      Swal.fire({
        title: 'Sign Up Required',
        text: 'You need to sign up to add this to your favorites.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    const updatedFavorite = !isFavorite;
    if (typeof onFavoriteToggle === 'function') {
      onFavoriteToggle(id, updatedFavorite);
      setIsFavorite(updatedFavorite);
    } else {
      console.error('onFavoriteToggle is not a function');
    }
  }

  function handleDetailsClick(event) {
    event.stopPropagation();
    event.preventDefault();

    if (!isSignedUp) {
      Swal.fire({
        title: 'Sign Up Required',
        text: 'You need to sign up to view recipe details.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    setShowDetails((prev) => !prev);
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
          // disabled={!isSignedUp}
        >
          {isFavorite ? '★' : '☆'}
        </button>

        <button
          onClick={handleDetailsClick}
          className="toggle-details-button"
          // disabled={!isSignedUp}
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
