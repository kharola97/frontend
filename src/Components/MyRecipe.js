import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { getCookie } from '../Cookie/Cookies';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Myrecipe.css';

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

function MyRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [comments, setComments] = useState([]);

  const getMyRecipe = async () => {
    const token = getCookie('jwtoken');
    if (token) {
      //decode the JWT
      const decoded = jwt_decode(token);

      //get the user ID from the decoded JWT
      const userId = decoded.userId;
      const response = await fetch(`/getRecipeByUser/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          cookie: 'Token ' + token,
        },
      });
      const res = await response.json();
      if (res.status === false || !res) {
        let msg = res.message;
        errorToast(`user not found ${msg}`);
        return;
      } else {
        setRecipes(res.data);
        return;
      }
    }
  };
  

const getComments = async (recipeId) => {
    const token = getCookie('jwtoken');
    if (token) {
      const response = await fetch(`/getComment/${recipeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          cookie: 'Token ' + token,
        },
      });
      const res = await response.json();
      if (res.status === false || !res) {
        let msg = res.message;
        errorToast(`user not found ${msg}`);
        return;
      } else {
        let commentArray = res.data.comment;
          
        if (commentArray === undefined) {
          setComments([]);
          return;
        } else {
          setComments(commentArray);
          return;
        }
      }
    }
  };
  useEffect(() => {
    recipes.forEach(recipe => {
        getComments(recipe._id);
    });
}, [recipes]);

  useEffect(() => {
    getMyRecipe();
  }, []);

  const handleEdit = async (recipeId) => {};

  return (
    <div>
      <div className='Recipe'>
        {recipes.map((recipe) => {
          return (
            <div className='card' key={recipe._id}>
              <div className='label'>Dish name:</div>
              <div className='input'>{recipe.dishname}</div>
              <div className='label'>Ingredients:</div>
              <div className='input'>{recipe.ingredients.join(',')}</div>
              <div className='label'>Rating:</div>
              <div className='input'>{recipe.rating}</div>
              <div className='label'>Cooking Time:</div>
              <div className='input'>{recipe.cookingtime} Minutes</div>
              <div className='label'>Description:</div>
              <div className='input'>{recipe.description}</div>
              <div className='label'>Instructions:</div>
              <div className='input'>{recipe.instructions}</div>
              <div className='label'>Comments</div>
              {comments.length===0 ? (
                <div className='input'>No comments yet</div>
                 ) : (
                  comments.map((comment,index) => (
                    <div key={index}>
                       <div className='input' >{comment}</div>
                          </div>
                          ))
                            )}
                            <br></br>
              <div className='editbutton' style={{ textAlign: 'right' }}>
                <button className='label' onClick={() => handleEdit(recipe._id)}>
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyRecipe;
