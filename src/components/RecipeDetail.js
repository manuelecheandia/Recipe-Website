import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_KEY = "3beb197c9690416e8301673e7a94b78d";
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`; 

    const fetchRecipe = async () => {
      setIsLoading(true);
      try {
        const { data } = await Axios.get(url);
        setRecipe(data);
      } catch (error) {
        console.error("Failed to fetch recipe", error);
        setError('Failed to load recipe details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="recipe-detail-container">
      <div className="recipe-image">
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <div className="recipe-info">
        <h1>{recipe.title}</h1>
        <div>
          <h3>Health Information</h3>
          <ul>
            {recipe.vegan && <li>Vegan</li>}
            {recipe.dairyFree && <li>Dairy Free</li>}
            {recipe.glutenFree && <li>Gluten Free</li>}
          </ul>
        </div>
        <div>
          <h3>Ingredients</h3>
          <ul>
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.name} - {ingredient.measures.us.amount} {ingredient.measures.us.unitShort}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Cooking Instructions</h3>
          <div className='recipe__instructions'>{recipe.instructions || 'No specific cooking instructions provided.'}</div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
