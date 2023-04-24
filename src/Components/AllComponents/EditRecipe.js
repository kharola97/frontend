import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getCookie } from '../../Cookie/Cookies';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../AllCss/EditRecipe.css"
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

function EditRecipe() {
  const { recipeId } = useParams();
  const navigate = useNavigate()
  const [isPublic, setIsPublic] = useState(true);
  const [editedRecipe, setEditedRecipe] = useState({
    dishname: '',
    description: '',
    ingredients: '',
    instructions: '',
    cookingtime: ''
  });

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token')

      if (token) {
        //decode the JWT
        const decoded = jwt_decode(token)
        const userId = decoded.userId
  
        const response = await axios.delete(`http://localhost:4500/deleteRecipe/${recipeId}/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "jwtoken=" + token,
          },
        });
  
        const res = response.data;
        if (res.status === false || !res) {
          let msg = res.message;
          errorToast(`user ${msg}`);
          return;
        } else {
          successToast("Recipe deleted successfully")
          navigate('/')
          return;
        }
      }
    } catch (error) {
      throw error
    }
  }




//   const handleDelete = async()=>{

//   try {
    
//     const token = getCookie('jwtoken');
//   if(token){
//     //decode the JWT
//     const decoded = jwt_decode(token)
//     const userId = decoded.userId
//     const response = await fetch(`http://localhost:4500/deleteRecipe/${recipeId}/${userId}`,{
//       method:"DELETE",
//       headers:{
//         'Content-Type': 'application/json',
//         "Cookie": token,
//       }
//     })
    
//     const res = await response.json();
//     if (res.status === false || !res) {
//       let msg = res.message;
//       errorToast(`user ${msg}`);
//       return;
//     } else {
//       successToast("Recipe deleted successfully")
//       navigate('/')
//       return;
//     }
//   }
// } catch (error) {
//       throw error
// }
// }



const getRecipe = async () => {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      const response = await axios.get(`http://localhost:4500/recipeById/${recipeId}`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "jwtoken=" + token,
        },
      });
      const res = response.data;
      if (res.status === false || !res) {
        let msg = res.message;
        errorToast(`user went ${msg}`);
        return;
      } else {
        setEditedRecipe(res.data);
        setIsPublic(res.data.isPublic);
        return;
      }
    }
  } catch (error) {
    throw error;
  }
};

// const getRecipe = async () => {
//   try {
    
//     const token = getCookie('jwtoken');
//   if (token) {
    
//     const response = await fetch(`http://localhost:4500/recipeById/${recipeId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         "Cookie": token,
//       },
//     });
//     const res = await response.json();
//     if (res.status === false || !res) {
//       let msg = res.message;
//       errorToast(`user went ${msg}`);
//       return;
//     } else {
//       setEditedRecipe(res.data);
//       setIsPublic(res.data.isPublic)
//       return;
//     }
//   }
// } catch (error) {
//      throw error
// }
// };

 useEffect(()=>{
 
  getRecipe();
 },[])
 const handleToggle = (e)=>{

   setIsPublic(e.target.value === "public");
 }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe({ ...editedRecipe, [name]: value });
  };

//   const handleSubmit = async () => {
//    try {
    
//     const token = getCookie('jwtoken');
//     if(token){
//       const decoded = jwt_decode(token)
//       const userId = decoded.userId
     
//     // Send the edited recipe details to the server for saving
//     let response = await fetch(`http://localhost:4500/updateRecipe/${userId}/${recipeId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         "Cookie": token,
//       },
//       body: JSON.stringify({...editedRecipe,isPublic})
//     })

//     const res = await response.json()
    
//     if(res.status===false||!res){
//       let msg = res.message
//       errorToast(`${msg}`)
//     }
//     else{
//       setEditedRecipe(res.data)
//       navigate('/MyRecipe')
//     }
//   }
// } catch (error) {
//     throw error
// }
//   };

const handleSubmit = async (e) => {
  try {
    e.preventDefault()
    const token = localStorage.getItem('token')

    if (token) {
      const decoded = jwt_decode(token);
      const userId = decoded.userId;

      // Send the edited recipe details to the server for saving
      let response = await axios.put(`http://localhost:4500/updateRecipe/${userId}/${recipeId}`, {
        ...editedRecipe,
        isPublic
      }, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : "jwtoken=" + token
        }
      });

      const res = response.data;
      
      if (res.status === false || !res) {
        let msg = res.message;
        errorToast(`${msg}`);
      } else {
        setEditedRecipe(res.data);
        navigate('/MyRecipe');
      }
    }
  } catch (error) {
    throw error;
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
        
  <div className='recipeprivacy' >
  <label>Recipe privacy:</label>
    <label>
      <input type="radio" value="private" name="options" checked={!isPublic} onChange={handleToggle} />
      Private
    </label>
    <label>
      <input type="radio" value="public" name='options' checked={isPublic} onChange={handleToggle} />
      Public
    </label>
  </div>

        
        <button className='save' type='submit'>Save</button>
        <button onClick={()=>handleDelete()} className='delete' type='button'>Delete</button>
      </form>
    </div>
  );
}

export default EditRecipe;
