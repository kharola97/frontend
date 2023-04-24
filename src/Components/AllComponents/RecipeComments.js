import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getCookie } from '../../Cookie/Cookies';
import "../AllCss/RecipeComments.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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


function RecipeComments() {
  const { recipeId } = useParams();
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null);
  const [comment, setComment] = useState([{
    user:"",comment:[],id:""
  }]);
  const [editComment, setEditComment] = useState("")


// const getRecipeById = async (recipeId) => {
//   try {
//     const token = getCookie('jwtoken');
//     if (token) {
//       const response = await fetch(`http://localhost:4500/recipeById/${recipeId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           "Cookie" : token,
//         },
//       });
//       const res = await response.json();
//       if (res.status === false || !res) {
//         let msg = res.message;
//         errorToast(`user not found ${msg}`);
//         return;
//       } else {
//         setRecipe(res.data);
//         return;
//       }
//     }
//   } catch (error) {
//     throw error
//   }
//   };
const getRecipeById = async (recipeId) => {
  try {
    const token = localStorage.getItem('token')

    if (token) {
      const response = await axios.get(`http://localhost:4500/recipeById/${recipeId}`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : "jwtoken=" +  token,
        },
      });
      const res = response.data;
      if (res.status === false || !res) {
        let msg = res.message;
        errorToast(`user not found ${msg}`);
        return;
      } else {
        setRecipe(res.data);
        return;
      }
    }
  } catch (error) {
    throw error
  }
};

  

//   const getComment = async(recipeId)=>{
//     try {
//       const token = getCookie('jwtoken');
//     if (token) {
        
//       const response = await fetch(`http://localhost:4500/getComment/${recipeId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           "Cookie" : token,
//         },
//       });
//       const res = await response.json();
      
//       if (res.status === false || !res) {
        
//         setComment([])
//         return;
//       } else {
         
//         if (res.data === undefined) {
//           setComment([]);
//           return;
//         } else {
          
//           const commentsWithUserName = res.data.map(comment => {
//             const userFullName = comment.userId ? comment.userId.Fullname : 'Unknown User';
//             return {
//               comment: comment.comment,
//               user: userFullName,
//               id: comment._id
//             };
//           });
//           setComment(commentsWithUserName);
          
//           return;
//         }
//       }
      
//     }
//   } catch (error) {
//       throw error
//   }
// }
  
const getComment = async(recipeId)=>{
  try {
    const token = localStorage.getItem('token')

    if (token) {
      const response = await axios.get(`http://localhost:4500/getComment/${recipeId}`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : "jwtoken=" + token,
        },
      });
      const res = response.data;
      if (res.status === false || !res) {
        setComment([])
        return;
      } else {
        if (res.data === undefined) {
          setComment([]);
          return;
        } else {
          const commentsWithUserName = res.data.map(comment => {
            const userFullName = comment.userId ? comment.userId.Fullname : 'Unknown User';
            return {
              comment: comment.comment,
              user: userFullName,
              id: comment._id
            };
          });
          setComment(commentsWithUserName);
          return;
        }
      }
    }
  } catch (error) {
      throw error
  }
}


  // const handleDelete = async(commentId,text)=>{
  //   try {
  //     const token = getCookie('jwtoken');
  //   console.log(token,"t")
  //   if(token){
  //     let decoded = jwt_decode(token)
  //     let userId = decoded.userId

  //     let response = await fetch(`http://localhost:4500/deletecomment/${userId}/${recipeId}/${commentId}`,{
  //       method:"DELETE",
  //       headers:{
  //         'Content-Type': 'application/json',
  //         "Cookie" : token,
  //       },
  //       body : JSON.stringify({text})
  //     })
  //     const res = await response.json();
  //     if(res.status === false || !res){
  //       let msg = res.message
  //       errorToast(`error${msg}`)
  //       return;
  //     }
  //     else {
  //       successToast('Comment deleted successfully');
  //       navigate('/ViewRecipe')
  //       return;
  //     }
  //   }
  // } catch (error) {
  //     throw error
  // }

  // }

  const handleDelete = async(commentId, text) => {
    try {
      const token = localStorage.getItem('token')

      if (token) {
        const decoded = jwt_decode(token);
        const userId = decoded.userId;
  
        const response = await axios.delete(`http://localhost:4500/deletecomment/${userId}/${recipeId}/${commentId}`, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : "jwtoken=" + token
          },
          data: {
            text
          }
        });
        const res = response.data;
        if (res.status === false || !res) {
          const msg = res.message;
          errorToast(`Error: ${msg}`);
          return;
        } else {
          successToast('Comment deleted successfully');
          navigate('/ViewRecipe');
          return;
        }
      }
    } catch (error) {
      throw error;
    }
  }
  



  useEffect(() => {
    getRecipeById(recipeId);
    getComment(recipeId)
  }, []);

  const handleCommentChange = (e) => {
    setEditComment(e.target.value);
  };

  // const handleCommentSubmit = async (e) => {
  //   try {
  //     e.preventDefault()
    
  //   const token = getCookie('jwtoken');
  //   if (token) {
  //       const decoded = jwt_decode(token);

  //     //get the user ID from the decoded JWT
  //     const userId = decoded.userId;
  //     const response = await fetch(`http://localhost:4500/comment/${userId}/${recipeId}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         "Cookie" : token,
  //       },
  //       body: JSON.stringify({
  //         recipeId,
  //         comment:editComment,
  //         userId
  //       }),
  //     });
  //     const res = await response.json();
  //     if (res.status === false || !res) {
  //       let msg = res.message;
  //       errorToast(`Error occured: ${msg}`);
  //       return;
  //     } else {
  //       setComment('');
  //       successToast('Comment added successfully');
  //       navigate('/ViewRecipe')
  //       return;
  //     }
  //   }
  // } catch (error) {
  //      throw error
  // }
  // };

  const handleCommentSubmit = async (e) => {
    try {
      e.preventDefault();
      
      const token = localStorage.getItem('token')

      if (token) {
        const decoded = jwt_decode(token);
  
        //get the user ID from the decoded JWT
        const userId = decoded.userId;
  
        const config = {
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : "jwtoken=" + token
          },
        };
  
        const data = {
          recipeId,
          comment: editComment,
          userId,
        };
  
        const response = await axios.post(
          `http://localhost:4500/comment/${userId}/${recipeId}`,
          data,
          config
        );
  
        const res = response.data;
        
        if (res.status === false || !res) {
          let msg = res.message;
          errorToast(`Error occurred: ${msg}`);
          return;
        } else {
          setComment('');
          successToast('Comment added successfully');
          navigate('/ViewRecipe');
          return;
        }
      }
    } catch (error) {
      throw error;
    }
  };
  




  return (
    <div className='RecipeComments'>
      <div className='RecipeDetails'>
        {recipe && (
          <form>
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
          </form>
        )}
      </div>
      <div className='Comments'>
        <h2>Comments for the recipe</h2>
      {comment.length===0 ? (
                
                <div className='input'>No comments yet</div>
                 ) : (
                  comment.map((comment) => (
                    <div key={comment.id}>
                       <div  >{comment.comment.map((text,index)=>(
                        <div key={index}>
                          <p className='input'>{comment.user}:{text}</p>
                          <button className='delete' onClick={()=>handleDelete(comment.id,comment.comment)}  type='button'>delete</button>
                          <br></br>
                          </div>
                       ))}
                         
                       </div>
                          </div>
                          ))
                            )}
                            </div>
                            <div className='addcomment'>
                             <form className='formc' onSubmit={handleCommentSubmit}>
                               <label htmlFor='comment'> Add a comment:</label>
                                 <textarea id='comment' name='comment' value={editComment} onChange={handleCommentChange}></textarea>
                                  <button type='submit'>Submit</button>
                                     </form>
                                  </div>
                                           </div>
                                         
  );
}


export default RecipeComments;