import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import "./key";
import "./App.css";
import React, { useState, useEffect } from 'react';
import Axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(5);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const cuisines = [
    { label: "African", value: "African" },
    { label: "Asian", value: "Asian" },
    { label: "American", value: "American" },
    { label: "British", value: "British" },
    { label: "Cajun", value: "Cajun" },
    { label: "Caribbean", value: "Caribbean" },
    { label: "Chinese", value: "Chinese" },
    { label: "Eastern European", value: "Eastern European" },
    { label: "European", value: "European" },
    { label: "French", value: "French" },
    { label: "German", value: "German" },
    { label: "Greek", value: "Greek" },
    { label: "Indian", value: "Indian" },
    { label: "Irish", value: "Irish" },
    { label: "Italian", value: "Italian" },
    { label: "Japanese", value: "Japanese" },
    { label: "Jewish", value: "Jewish" },
    { label: "Korean", value: "Korean" },
    { label: "Latin American", value: "Latin American" },
    { label: "Mediterranean", value: "Mediterranean" },
    { label: "Mexican", value: "Mexican" },
    { label: "Middle Eastern", value: "Middle Eastern" },
    { label: "Nordic", value: "Nordic" },
    { label: "Southern", value: "Southern" },
    { label: "Spanish", value: "Spanish" },
    { label: "Thai", value: "Thai" },
    { label: "Vietnamese", value: "Vietnamese" },
  ];

  useEffect(() => {
    getRecipes();
  }, [currentPage, selectedCuisine]);

  const API_KEY = "3beb197c9690416e8301673e7a94b78d";
  var url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}${query ? `&query=${query}` : ''}&number=${recipesPerPage}&offset=${(currentPage - 1) * recipesPerPage}${selectedCuisine ? `&cuisine=${selectedCuisine}` : ''}`;

const getRecipes = async () => {
  setIsLoading(true);
  setError(null);
  try {
    const result = await Axios.get(url);
    if(result.data && result.data.results) {
      setRecipes(result.data.results);
      setTotalResults(result.data.totalResults);
      setTotalPages(Math.ceil(result.data.totalResults / recipesPerPage));
    } else {
      setRecipes([]);
      setTotalResults(0);
      setTotalPages(0);
    }
  } catch (error) {
    setError('Failed to fetch recipes');
    console.error('Error fetching recipes', error);
  } finally {
    setIsLoading(false);
  }
};


const onSubmit = (e) => {
  e.preventDefault();
  setCurrentPage(1);
  getRecipes(); 
};


  return (
    <div className="app">
      <h1>Recipe Website</h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input
          type="text"
          className="app__input"
          placeholder="Enter ingredient"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
          className="app__cuisineSelect"
        >
          <option value="">All Cuisines</option>
          {cuisines.map((cuisine) => (
            <option key={cuisine.value} value={cuisine.value}>
              {cuisine.label}
            </option>
          ))}
        </select>
        <input className="app__submit" type="submit" value="Search" />
      </form>
      {/* {isLoading && <p>Loading...</p>} */}
      {error && <p>{error}</p>}
      <div className="app__recipes">
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            
            <img
              className="recipe__image"
              src={recipe.image}
              alt={recipe.title}
            />
            <h6 className="recipe__name">{recipe.title}</h6>
          </div>
        ))}
      </div>
      <div className="pagination-info">
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <p>Total Results: {totalResults}</p>
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={recipes.length < recipesPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
