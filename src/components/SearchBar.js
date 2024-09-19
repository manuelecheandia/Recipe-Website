import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const searchRecipes = async () => {
    const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        apiKey: '3beb197c9690416e8301673e7a94b78d', 
        query: query
      }
    });
    setRecipes(result.data.results);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && searchRecipes()}
      />
      <button onClick={searchRecipes}>Search</button>
      {recipes.map(recipe => (
        <div key={recipe.id} onClick={() => navigate(`/recipe/${recipe.id}`)}>
          <img src={recipe.image} alt={recipe.title} />
          <p>{recipe.title}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchBar;
