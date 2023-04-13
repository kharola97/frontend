import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getCookie } from '../Cookie/Cookies';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./EditRecipe.css"

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

function EditRecipe() {
  const { recipeId } = useParams();
  const navigate = useNavigate()
  const [editedRecipe, setEditedRecipe] = useState({
    dishname: '',
    description: '',
    ingredients: '',
    instructions: '',
    cookingtime: ''
  });


// const getrecipe = async()=>{
//   const token = getCookie('jwtoken');
//   if (token) {
//     console.log(recipeId)
//     const response = await fetch(`/recipeById/${recipeId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         "cookie": 'Token ' + token,
//       },
//     });
//     const res = await response.json();
    
//     if(res.status===false,!res){
//       let msg = res.message
//       errorToast(`${msg}`)
//     }
//     else{
//       setEditedRecipe({
//         dishname: res.dishname,
//         description: res.description,
//         ingredients: res.ingredients,
//         instructions: res.instructions,
//         cookingtime: res.cookingtime
//       });
//     }
    
//   }

// }
const getRecipe = async () => {
  const token = getCookie('jwtoken');
  if (token) {
    //decode the JWT
    //const decoded = jwt_decode(token);

    //get the user ID from the decoded JWT
    //const userId = decoded.userId;
    const response = await fetch(`/recipeById/${recipeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "cookie": 'Token ' + token,
      },
    });
    const res = await response.json();
    if (res.status === false || !res) {
      let msg = res.message;
      errorToast(`user not found ${msg}`);
      return;
    } else {
      setEditedRecipe(res.data);
      return;
    }
  }
};

 useEffect(()=>{
 
  getRecipe();
 },[])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedRecipe({ ...editedRecipe, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = getCookie('jwtoken');
    if(token){
      const decoded = jwt_decode(token)
      const userId = decoded.userId
    // Send the edited recipe details to the server for saving
    let response = await fetch(`/updateRecipe/${userId}/${recipeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedRecipe)
    })

    const res = response.json()
    console.log(res,"update")
    if(res.status===false||!res){
      let msg = res.message
      errorToast(`${msg}`)
    }
    else{
      setEditedRecipe(res.data)
      navigate('/MyRecipe')
    }
  }
  };

  return (
    <div className='form'>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='dishname'>Dish Name:</label>
          <input
            type='text'
            name='dishname'
            value={editedRecipe.dishname}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='description'>Description:</label>
          <textarea
            name='description'
            value={editedRecipe.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='ingredients'>Ingredients:</label>
          <textarea
            name='ingredients'
            value={editedRecipe.ingredients}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='instructions'>Instructions:</label>
          <textarea
            name='instructions'
            value={editedRecipe.instructions}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='cookingtime'>Cooking time:</label>
          <input
            type='text'
            name='cookingtime'
            value={editedRecipe.cookingtime}
            onChange={handleInputChange}
          />
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
}

export default EditRecipe;
