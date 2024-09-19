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

  return (
   <div className="app">
    <h1 onClick={getRecipes}>Recipe Website</h1>
    <form className="app__searchForm">
      <input type="text" placeholder="Enter ingredient"></input>
    </form>
   </div>
  );
}

export default App;
