import React from 'react';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { getCookie } from '../Cookie/Cookies';


function AddComment({ recipeId, onAddComment }) {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const comment = {
      text: commentText,
      recipeId: recipeId,
    };
    const token = getCookie('jwtoken');
        if(token){
    
        //decode the JWT
         const decoded = jwt_decode(token);

        //get the user ID from the decoded JWT
        const userId = decoded.userId
    const response = await fetch(`/comments/${userId}/${recipeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "cookie" : "Token" + token
      },
      body: JSON.stringify(comment),
    });
    const newComment = await response.json();
    onAddComment(newComment); // pass the newly added comment back to the parent component to update the comments list
    setCommentText(''); // reset the comment text area
  };
  }
  return (
    <div>
      <h2>Add Comment</h2>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Enter your comment"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddComment;
