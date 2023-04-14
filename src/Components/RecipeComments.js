import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getCookie } from '../Cookie/Cookies';
import "./RecipeComments.css"

function RecipeComments() {
  const { recipeId } = useParams();
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null);
  const [comment, setComment] = useState([{
    user:"",comment:"",id:""
  }]);
  const [editComment, setEditComment] = useState("")


const getRecipeById = async (recipeId) => {
    const token = getCookie('jwtoken');
    if (token) {
      const response = await fetch(`/recipeById/${recipeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          cookie: 'Token ' + token,
        },
      });
      const res = await response.json();
      if (res.status === false || !res) {
        let msg = res.message;
        alert(`user not found ${msg}`);
        return;
      } else {
        setRecipe(res.data);
        return;
      }
    }
  };

  const getComment = async(recipeId)=>{
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
      console.log(res,"checkname")
      if (res.status === false || !res) {
        
        setComment([])
        return;
      } else {
         
        if (res.data === undefined) {
          setComment([]);
          return;
        } else {
          const commentsWithUserName = res.data.comment.map(comment => {
           
            return {comment:comment,
                    user:res.user,
                    id:res.data._id };
          });
          setComment(commentsWithUserName);
          
          return;
        }
      }
    }
}
  

  const handleDelete = async(commentId,text)=>{
    const token = getCookie('jwtoken');
    if(token){
      let decoded = jwt_decode(token)
      let userId = decoded.userId

      let response = await fetch(`/deletecomment/${userId}/${recipeId}/${commentId}`,{
        method:"DELETE",
        headers:{
          'Content-Type': 'application/json',
          cookie: 'Token ' + token,
        },
        body : JSON.stringify({text})
      })
      const res = await response.json();
      if(res.status === false || !res){
        let msg = res.message
        alert(`error${msg}`)
        return;
      }
      else {
        alert('Comment deleted successfully');
        navigate('/ViewRecipe')
        return;
      }
    }

  }

  useEffect(() => {
    getRecipeById(recipeId);
    getComment(recipeId)
  }, []);

  const handleCommentChange = (event) => {
    setEditComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const token = getCookie('jwtoken');
    if (token) {
        const decoded = jwt_decode(token);

      //get the user ID from the decoded JWT
      const userId = decoded.userId;
      const response = await fetch(`/comment/${userId}/${recipeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          cookie: 'Token ' + token,
        },
        body: JSON.stringify({
          recipeId,
          comment:editComment,
          userId
        }),
      });
      const res = await response.json();
      if (res.status === false || !res) {
        let msg = res.message;
        alert(`Error: ${msg}`);
        return;
      } else {
        setComment('');
        alert('Comment added successfully');
        navigate('/ViewRecipe')
        return;
      }
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
                       <div className='input' >{comment.user}:{comment.comment}
                         <button className='delete' onClick={()=>handleDelete(comment.id,comment.comment)}  type='button'>delete</button>
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