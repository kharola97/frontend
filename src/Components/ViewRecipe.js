import React, { useEffect, useState } from 'react';
import './ViewRecipe.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const errorToast = (message) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const successToast = (message) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

function ViewRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [dishName, setDishName] = useState('');
const [ingredients, setIngredients] = useState('');
const [rating, setRating] = useState('');
const [cookingtime, setCookingTime] = useState('');

  const getRecipeData = async () => {
    let url = '/getrecipe';
  const params = [];

  if (dishName) {
    params.push(`dishname=${dishName}`);
  }
  if (ingredients) {
    params.push(`ingredients=${ingredients}`);
  }
  if (rating) {
    params.push(`rating=${rating}`);
  }
  if (cookingtime) {
    params.push(`cookingtime=${cookingtime}`);
  }
  
  if (params.length) {
    url += `?${params.join('&')}`;
  }
  console.log(url, "url")
    const response = await fetch(url);
    const res = await response.json();
   
    if (res.status === false || !res) {
      let msg = res.message;
      errorToast(`No recipe found ${msg}`);
      return;
    } else {
      successToast('Here are the recipes');
      setRecipes(res.data);
      return;
    }
  };

  useEffect(() => {
    getRecipeData();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    getRecipeData();
  };

  
  return (
    <div>
     <div className='search-container'>
  <label for="dish-name"> Search by dish name<i  className="zmdi zmdi-search-for icon-with-space"></i></label>
  <input id="dish-name" type='text' placeholder='Search by dish name' value={dishName} onChange={(e) => setDishName(e.target.value)} />
  
  <label for="ingredients">  Search by ingredients<i className="zmdi zmdi-format-list-numbered icon-with-space"></i> </label>
  <input id="ingredients" type='text' placeholder='Search by ingredients' value={ingredients} onChange={(e) => setIngredients(e.target.value)}/>
  
  <label for="rating">Search by rating<i className="zmdi zmdi-star-half icon-with-space"></i> </label>
  <input id="rating" type='text' placeholder='Search by rating' value={rating} onChange={(e) => setRating(e.target.value)} />
  
  <label for="cooking-time">Cooking Time<i  className="zmdi zmdi-time icon-with-space"></i> </label>
  <select id="cooking-time" value={cookingtime} onChange={(e) => setCookingTime(e.target.value)}>
    <option value=''>Cooking Time</option>
    <option value='5'>Less than 5</option>
    <option value='10'>Less than 10</option>
    <option value='15'>Less than 15</option>
    <option value='16'>More than 15</option>
  </select>
  
  <button type='submit' onClick={handleSubmit}><i class="fa fa-search"></i> Search</button>
</div>
      <div className='Recipe'>
        {recipes.map((recipe) => {
          return (
            <div className='card' key={recipe._id} style={{ marginTop: '2rem' }}>
              <h2 className='label'>Dish name:</h2>
              <p>{recipe.dishname}</p>
              <h2 className='label'>Ingredients:</h2>
              <p>{recipe.ingredients.join(',')}</p>
              <h2 className='label'>Rating:</h2>
              <p>{recipe.rating}</p>
              <h2 className='label'>Cooking Time:</h2>
              <p>{recipe.cookingtime}</p>
              <h2 className='label'>Description:</h2>
              <p>{recipe.description}</p>
              <h2 className='label'>Instructions:</h2>
              <p>{recipe.instructions}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewRecipe;
