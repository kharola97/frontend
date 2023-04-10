import React, { useState, useEffect } from 'react';

function RecipeFilter() {
  // Define state variables for the filters and the filtered recipes
  const [dishNameFilter, setDishNameFilter] = useState('');
  const [ingredientFilter, setIngredientFilter] = useState('');
  const [cookTimeFilter, setCookTimeFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Fetch the recipe data from the backend API on component mount
  useEffect(() => {
    fetch('/api/recipes')
      .then(response => response.json())
      .then(data => {
        setRecipes(data);
        setFilteredRecipes(data);
      })
      .catch(error => console.error(error));
  }, []);

  // Define a function to filter the recipes based on the selected filters
  const handleFilter = () => {
    let filtered = [...recipes];

    if (dishNameFilter) {
      filtered = filtered.filter(recipe => recipe.name.toLowerCase().includes(dishNameFilter.toLowerCase()));
    }

    if (ingredientFilter) {
      filtered = filtered.filter(recipe => recipe.ingredients.includes(ingredientFilter));
    }

    if (cookTimeFilter) {
      filtered = filtered.filter(recipe => recipe.cookTime <= parseInt(cookTimeFilter));
    }

    if (ratingFilter) {
      filtered = filtered.filter(recipe => recipe.rating >= parseFloat(ratingFilter));
    }

    setFilteredRecipes(filtered);
  };

  return (
    <div>
      <h2>Filters</h2>
      <div>
        <label>Dish Name:</label>
        <input type="text" value={dishNameFilter} onChange={e => setDishNameFilter(e.target.value)} />
      </div>
      <div>
        <label>Ingredient:</label>
        <input type="text" value={ingredientFilter} onChange={e => setIngredientFilter(e.target.value)} />
      </div>
      <div>
        <label>Cook Time (minutes):</label>
        <input type="number" value={cookTimeFilter} onChange={e => setCookTimeFilter(e.target.value)} />
      </div>
      <div>
        <label>Rating:</label>
        <input type="number" step="0.1" min="0" max="5" value={ratingFilter} onChange={e => setRatingFilter(e.target.value)} />
      </div>
      <button onClick={handleFilter}>Filter Recipes</button>

      <h2>All Recipes</h2>
      {filteredRecipes.map(recipe => (
        <div key={recipe.id}>
          <h3>{recipe.name}</h3>
          <p>Ingredients: {recipe.ingredients.join(', ')}</p>
          <p>Cook Time: {recipe.cookTime} minutes</p>
          <p>Rating: {recipe.rating} stars</p>
        </div>
      ))}
    </div>
  );
}

export default RecipeFilter;
