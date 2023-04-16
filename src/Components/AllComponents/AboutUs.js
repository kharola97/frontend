import React from 'react'
import backgroundImage from "../../Images/ella-olsson-oPBjWBCcAEo-unsplash.jpg"
import "../AllCss/AboutUs.css"

function AboutUs() {
  return (
    <div
      className="about-us"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh'
      }}
    >
      <div className="overlay"></div>
      <div className="content">
        <h2>About Us</h2>
        <p>
          Welcome to recipes.com, where we strive to provide user to create a n account 
          and share their favourite recipes for our users. Our goal is to let people sahre the recipes of food
          that they love making and help others to prepae it too.
        </p>
        <p>
          We understand that people are looking for easy to make recipes  and that's why we've made it our
          mission to provide the recipes for our
          users. and also edit the recipes after they have updated it
        </p>
        <p>
          At recipes.com, we offer the ability to make an account
          and share their recipes and also view the recipes submitted by other users . 
          Our team is dedicated to constantly improving and adding
          new features to enhance the user experience.
        </p>
        
        <p>
          Thank you for choosing recipes.com as your go-to resource for
          different recipes. We hope that our platform will help you
          to look for different recipes and help people make good food.
        </p>
        <p>Please feel free to reach out to us with any questions or feedback. We're always here to help! makerecipe@sharingrecipe.com</p>
      </div>
    </div>
  );
}


export default AboutUs