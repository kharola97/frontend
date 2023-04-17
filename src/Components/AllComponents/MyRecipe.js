import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { getCookie } from '../../Cookie/Cookies';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../AllCss/Myrecipe.css';


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
  const [comments, setComments] = useState({});
  const navigate = useNavigate()



  const getMyRecipe = async () => {

    try {
      
      
      const token = getCookie('jwtoken');
    if (token) {
      //decode the JWT
      const decoded = jwt_decode(token);

      //get the user ID from the decoded JWT
      const userId = decoded.userId;
      const response = await fetch(`https://rapp-t5nt.onrender.com/getRecipeByUser/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          cookie: 'Token ' + token,
        },
      });
      const res = await response.json();
      console.log(res)
      if (res.status === false || !res) {
        let msg = res.message;
        errorToast(`error  ${msg}`);
        return;
      } else {
        setRecipes(res.data);
        return;
      }
    }
  } catch (error) {
      throw error
  }
  };
  


const getComments = async (recipeId) => {
  try {
    
    const token = getCookie('jwtoken');
    if (token) {
      const response = await fetch(`https://rapp-t5nt.onrender.com/getComment/${recipeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          cookie: 'Token ' + token,
        },
      });
      const res = await response.json();
      if (res.status === false || !res) {
        let msg = res.message;
        errorToast(`user ${msg}`);
        return;
      } else {
        if (res.data === undefined) {
          setComments((prevComments) => ({
            ...prevComments,
            [recipeId]: [],
          }));
          return;
        } else {
          setComments((prevComments) => ({
            ...prevComments,
            [recipeId]: res.data.comment,
          }));
          return;
        }
      }
    }
  } catch (error) {
    return { status: false, message: error.message };
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

  const handleEdit = async (recipeId) => {
    
    navigate(`/EditRecipe/${recipeId}`)
   
  };

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
              <div className='label'>isPublic</div>
              <div className='input'>{recipe.isPublic.toString()}</div>
              <div className='label'>Comments</div>
              {comments[recipe._id] === undefined ? (
               <div className='input'>No comments yet</div>
           ) : (comments[recipe._id].map((comment, index) => (
                 <div key={index}>
                     <div className='input'>{comment}</div>
                        </div>)))}
              
                           
                        
              <div className='editbutton' style={{ textAlign: 'right' }}>
              <button onClick={() => handleEdit(recipe._id)}>Edit Recipe</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyRecipe;
