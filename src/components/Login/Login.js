import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.config";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location=useLocation()
  const from =location.state?.from?.pathname || "/"
  const [user,setUser]=useState('')
  const userr =auth.currentUser;
  const provider = new GoogleAuthProvider(auth);


  const handelEmail = (e) => {
    const emailInput = e.target.value;

    setEmail(emailInput);
  };

  const handelPass = (e) => {
    const passInput = e.target.value;
    setPassword(passInput);
  };


  const loginUser = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        navigate(from, { replace: true });
       ;
      })
      .catch((error) => {
        console.log(error);
      });
	
  };
  const handelGoogle=()=>{
	  signInWithPopup(auth,provider)
	  .then(res=>{
		  const user=res.user;
		  setUser(user)
		  navigate(from, { replace: true });
	  })
	  .catch(error=>{
		  
	  })
  }

  return (
    <div className="login-container">
      <div className="login">
        <h1 className="login-title">Login</h1>
        <form onSubmit={loginUser} action="">
          <div>
            <label htmlFor="">Email</label>
            <input onBlur={handelEmail} type="email" />
            <label htmlFor="">Password</label>
            <input onBlur={handelPass} type="password" />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p>
          New to Ema jhon?
          <Link className="link" to="/signup">
            Create New Account
          </Link>
        </p>
        <p className="or">or</p>
        <button onClick={handelGoogle} className="google">Countinue with Google</button>
      </div>
    </div>
  );
};

export default Login;
