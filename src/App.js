import "./key";
import './App.css';
import React, { useState } from 'react';
import Axios from "axios";

function App() {
  const [query, setQuery] = useState("");

  const API_KEY = "3beb197c9690416e8301673e7a94b78d";
  var url = `https://api.spoonacular.com/recipes/716429/information?apiKey=${API_KEY}&includeNutrition=true`;

  async function getRecipes(){
    var result = await Axios.get(url);
    console.log(result.data);
    
  }

  const onSubmit = (e) =>{
    e.preventDefault();
    getRecipes();
  }

  return (
   <div className="app">
    <h1>Recipe Website</h1>
    <form className="app__searchForm" onSubmit={onSubmit}>
      <input 
        type="text" 
        className="app__input"
        placeholder="Enter ingredient" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}/>
      <input className="app__submit" type="submit" value="Search"/>
    </form>
   </div>
  );
}

export default App;
