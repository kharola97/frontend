import { NavLink, useNavigate } from 'react-router-dom';
import recipe from "../../Images/recipe5.png";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../AllCss/Navbar.css"
import Cookies from 'js-cookie';

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

function Navbar(props) {
  
  const navigate = useNavigate()

  function handleLogout() {
    props.setLoggedIn(false);
    localStorage.removeItem('token');

    successToast("You have been logged Out ")
    navigate('/SignUp')
  }

  return (
    <div>
      <nav style={{backgroundColor:"rgb(157, 239, 239)"}} className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="#">
            <img style={{height:"60px"}} src={recipe} alt="logo"/>
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {props.loggedIn ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li  className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="MyRecipe">My-Recipes</NavLink>
                </li>
                  <li  className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                </li>
                <li  className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="ViewRecipe">View-Recipes</NavLink>
                </li>
                <li  className="nav-item">
                  <NavLink className="nav-link active" to="/Profile">Profile</NavLink>
                </li>
                <li  className="nav-item">
                  <NavLink className="nav-link active" to="/AddNewRecipe">Add a New recipe</NavLink>
                </li>
                <li  className="nav-item">
                  <NavLink className="nav-link active" onClick={handleLogout}>Logout</NavLink>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                
                <li  className="nav-item">
                  <NavLink className="nav-link active" to="/Login">Login</NavLink>
                </li>
                <li  className="nav-item">
                  <NavLink className="nav-link active" to="/AbouttUs">About us</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link active" to="/SignUp">Register</NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
