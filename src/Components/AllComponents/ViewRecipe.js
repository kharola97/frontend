import React, { useEffect, useState } from 'react';
import '../AllCss/ViewRecipe.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';
import { getCookie } from '../../Cookie/Cookies';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


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

const navigate = useNavigate()

// const getRecipeData = async () => {
//    try {
    
//   const token = getCookie('jwtoken');
//           if(token){
             
//   //decode the JWT
//   const decoded = jwt_decode(token);

//     //get the user ID from the decoded JWT
//     const userId = decoded.userId
//     let url = `http://localhost:4500/getrecipe/${userId}`;
//   const params = [];

//   if (dishName) {
//     params.push(`dishname=${dishName}`);
//   }
//   if (ingredients) {
//     params.push(`ingredients=${ingredients}`);
//   }
//   if (rating) {
//     params.push(`rating=${rating}`);
//   }
//   if (cookingtime) {
//     params.push(`cookingtime=${cookingtime}`);
//   }
  
//   if (params.length) {
//     url += `?${params.join('&')}`;
//   }
        
//       const response = await fetch(url, {
//       method : "GET",
//       headers:{
//         "Content-Type" : "application/json",

//             "Cookie" : token
//       }
//     });
  
//     const res = await response.json();
   
//     if (res.status === false || !res) {
//       let msg = res.message;
//       errorToast(`No recipe found ${msg}`);
//       return;
//     } else {
      
//       setRecipes(res.data);
//       return;
//     }
//   };
// } catch (error) {
//     throw error
// }
  
// }

const getRecipeData = async () => {
  try {
    const token = localStorage.getItem('token')

    console.log(token)
    if (token) {
      // Decode the JWT
      const decoded = jwt_decode(token);
      const userId = decoded.userId;

      let url = `http://localhost:4500/getrecipe/${userId}`;
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

      const config = {
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : "jwtoken=" + token
        },
      };

      const response = await axios.get(url, config);

      const res = response.data;

      if (res.status === false || !res) {
        let msg = res.message;
        errorToast(`No recipe found ${msg}`);
        return;
      } else {
        setRecipes(res.data);
        return;
      }
    }
  } catch (error) {
    throw error;
  }
};



const handleComment = async (recipeId)=>{
      navigate(`/RecipeComments/${recipeId}`)
}

  useEffect(() => {
    
    getRecipeData();
    return
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    getRecipeData();
    successToast('Here are the recipes');
    return
  };

  
  return (
    <div>
     <div className='search-container'>
  <label htmlFor="dish-name"> Search by dish name<i  className="zmdi zmdi-search-for icon-with-space"></i></label>
  <input id="dish-name" type='text' placeholder='Search by dish name' value={dishName} onChange={(e) => setDishName(e.target.value)} />
  
  <label htmlFor="ingredients">  Search by ingredients<i className="zmdi zmdi-format-list-numbered icon-with-space"></i> </label>
  <input id="ingredients" type='text' placeholder='Search by ingredients' value={ingredients} onChange={(e) => setIngredients(e.target.value)}/>
  
  <label htmlFor="rating">Search by rating<i className="zmdi zmdi-star-half icon-with-space"></i> </label>
  <input id="rating" type='text' placeholder='Search by rating' value={rating} onChange={(e) => setRating(e.target.value)} />
  
  <label htmlFor="cooking-time">Cooking Time<i  className="zmdi zmdi-time icon-with-space"></i> </label>
  <select id="cooking-time" value={cookingtime} onChange={(e) => setCookingTime(e.target.value)}>
    <option value=''>Cooking Time</option>
    <option value='5'>Less than 5</option>
    <option value='10'>Less than 10</option>
    <option value='15'>Less than 15</option>
    <option value='16'>More than 15</option>
  </select>
  
  <button type='submit' onClick={handleSubmit}> Search </button>
</div>
      <div className='Recipe'>
        {recipes.map((recipe) => {
          return (
            <div className='card' key={recipe._id}>
            <div className='label'>Dish name:</div>
            <div className='input' >{recipe.dishname}</div>
            <div className='label'>Ingredients:</div>
            <div className='input' >{recipe.ingredients.join(',')}</div>
            <div className='label'>Rating:</div>
            <div className='input' >{recipe.rating}</div>
            <div className='label'>Cooking Time:</div>
            <div className='input' >{recipe.cookingtime} Minutes</div>
            <div className='label'>Description:</div>
            <div className='input' >{recipe.description}</div>
            <div className='label'>Instructions:</div>
            <div className='input' >{recipe.instructions}</div>
            <div className='label'>Comments</div>
            <button onClick={() => handleComment(recipe._id)}>See comments</button>
             </div>

          );
        })}
      </div>
      
    </div>
  );
}

export default ViewRecipe