import React, { useState } from 'react'
import "../AllCss/Recipe.css"
import {useNavigate} from 'react-router-dom'
import { getCookie } from '../../Cookie/Cookies';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isValidRating,isValidInput} from "../../Validations/Validations"
import API_URL from '../../Config/Api-Url';



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
function Recipe() {
    const navigate = useNavigate()
    const [isPublic, setIsPublic] = useState(true);
    const [recipe,setRecipe] = useState({
        dishname:"",description:"",ingredients:"",instructions:"",rating:"",cookingtime:""})

        
        const handleRadioChange = (e) => {
          setIsPublic(e.target.value === "public");
        };
      

    let name,value
    const handleInput = (e)=>{
        name = e.target.name
        value=e.target.value
        setRecipe({...recipe,[name]:value})
    }

    const postData = async  (e)=>{
          e.preventDefault()
          console.log(isPublic)
          const {dishname,description,ingredients,instructions,rating,cookingtime} = recipe

          if(!dishname || !isValidInput(dishname)){
            errorToast(`Please enter the dish name`)
            return;
          }
          if(!description || !isValidInput(description)){
            errorToast("Please add description of your dish")
            return;
          }
          if(!ingredients || !isValidInput(ingredients)){
            errorToast("Please add ingredients of your dish")
            return;
          }
          if(!instructions || !isValidInput(instructions)){
            errorToast("Please add instructions avout how to prepare your dish")
            return;
          }
          if(!rating || !isValidRating(rating.trim())){
            errorToast("Rating can only be between 1-5")
            return;
          }
          const token = getCookie('jwtoken');
          if(token){
          
              //decode the JWT
            const decoded = jwt_decode(token);

                //get the user ID from the decoded JWT
                  const userId = decoded.userId
               
          const response = await fetch(`https://myrecipe-ujbh.onrender.com/recipe/${userId}`, {
            method:"POSt",
            headers:{
                "Content-Type" : "application/json",

                'cookie': 'Token ' + token
            },
            body : JSON.stringify({dishname,description,ingredients,instructions,rating,cookingtime,isPublic})
          })
        

          const res = await response.json()
          console.log(res,"hello")
          if(res.status===false || !res){
            let msg = res.message
            errorToast(`submission failed beacsue ${msg}`)
            return;
          }
          else{
            successToast("Recipe has been added")
                   navigate("/")
          }
    }
  }
  return (
    <>
    <div className='Recipe-div'>
        <form method='POST' className='recipeform' id='recipeforn'>
        <h2 className='heading'>Add Some New Recipe</h2>
                    <div className='recipe-group'>
                      <label htmlFor='dishname'>
                        <i className='fas fa-pizza-slice'></i>
                      </label>
                      <input type='text' required name='dishname' id='dishname' placeholder='Dish-name' value={recipe.dishname} onChange={handleInput}/>
                    </div>
                    <div className='recipe-group'>
                      <label htmlFor='description'>
                        <i className='zmdi zmdi-cutlery material-icons-name'></i>
                      </label>
                      <textarea required name='description' id='description' placeholder='Enter description here' value={recipe.description} onChange={handleInput}
                       rows="5" cols="5"/> 
                     </div>
                    <div className='recipe-group'>
                      <label htmlFor='ingredients'>
                        <i className='zmdi zmdi-border-color material-icons-name'></i>
                      </label>
                      <textarea required name='ingredients' id='ingredients' placeholder='Enter ingredients here' value={recipe.ingredients} onChange={handleInput}
                       rows="5" cols="5"/> 
                    </div>
                    <div className='recipe-group'>
                      <label htmlFor='instructions'>
                        <i className='zmdi zmdi-format-align-justify material-icons-name'></i>
                      </label>
                      <textarea required name='instructions' id='instructions' placeholder='Enter instructions here' value={recipe.instructions} onChange={handleInput}
                       rows="5" cols="5"/> 
                              </div>
                    <div className='recipe-group'>
                      <label htmlFor='rating'>
                        <i className='zmdi zmdi-star material-icons-name'></i>
                      </label>
                      <input type='tel' required name='rating' id='rating' placeholder='Rating' value={recipe.rating} onChange={handleInput}/>
                    </div>
                    
                    <div className='recipe-group'>
                      <label htmlFor='cookingtime'>
                        <i className='zmdi zmdi-time-interval material-icons-name'></i>
                      </label>
                      <input type='tel' required name='cookingtime' id='cookingtime' placeholder='Cooking time in minutes' value={recipe.cookingtime} onChange={handleInput}/>
                    </div>
                   <div className='recipe-group'>
                   <div>
                    <label>Recipe privacy</label>
               <label> 
                <input type="radio" value="private" name="options" checked={!isPublic} onChange={handleRadioChange}/>Private</label>
               <label> 
                    <input type="radio" value="public" name='options' checked={isPublic} onChange={handleRadioChange}/>Public</label>
                </div>
                   </div>
                    <div className='recipe-button'>
                      <input type='submit' name='addrecipe' id='addrecipe' className='addrecipe' value="Submit" onClick={postData}/>
                    </div>
        </form>
    </div>
    </>
  )
}

export default Recipe 