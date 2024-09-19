import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const result = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
        params: {
          apiKey: '3beb197c9690416e8301673e7a94b78d' 
        }
      });
      setRecipe(result.data);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <p>Vegan: {recipe.vegan ? 'Yes' : 'No'}</p>
      <p>Dairy-free: {recipe.dairyFree ? 'Yes' : 'No'}</p>
      <h2>Ingredients</h2>
      <ul>
        {recipe.extendedIngredients.map(ingredient => (
          <li key={ingredient.id}>{ingredient.name} - {ingredient.amount} {ingredient.unit}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p>{recipe.instructions}</p>
    </div>
  );
}

export default RecipeDetail;
