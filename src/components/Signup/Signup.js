import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import auth from "../../firebase.config";

const Signup = () => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [Confirmpassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });
  const [user,setUser]=useState('')
  const provider = new GoogleAuthProvider(auth)
  const navigate =useNavigate()
  const [error, setError] = useState("");
  if(user){
    navigate('/')
  }
  
  const handelEmail = (e) => {
    const emailInput = e.target.value;
    
      setEmail({ value:emailInput, error: "" });
    
  };

  const handelPass = (e) => {
    const passInput = e.target.value;
    if (passInput.length < 8) {
      setPassword({ value: "", error: "Password must be 8 Character" });
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(passInput)) {
      setPassword({
        value: "",
        error:
          "Password must be at least one number and one uppercase and one lowercase",
      });
    } else {
      setPassword({ value: passInput, error: "" });
    }
  };

  const handelConfirm = (e) => {
    const confirmPassInput = e.target.value;
    if (confirmPassInput === password.value) {
      setConfirmPassword({ value: confirmPassInput, error: "" });
    } else {
      setConfirmPassword({ value: "", error: "Password didn't match" });
    }
  };

  const createUser = (e) => {
    console.log(email, password);
	e.preventDefault()
	
    if (email.value && password.value === Confirmpassword.value) {
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((result) => {
          const user = result.user;
		  navigate('/')
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handelGoogle=()=>{
	signInWithPopup(auth,provider)
	.then(res=>{
		const user=res.user;
		setUser(user)
		navigate('/')
	})
	.catch(error=>{
		
	})
}

  return (
    <div className="login-container">
      <div className="login">
        <h1 className="login-title">Sign Up</h1>
        <form onSubmit={createUser} action="">
          <div>
            <label htmlFor="">Email</label>
            <input onBlur={handelEmail} type="email" required />
			{
				email.error && <p>{email.error}</p>
			}
			
            <label htmlFor="">Password</label>
            <input onBlur={handelPass} type="password" required />
			{
				password.error && <p>{password.error}</p>
			}
            <label htmlFor="">ConfirmPassword</label>
            <input onBlur={handelConfirm} type="password" required/>
			{
				Confirmpassword.error && <p>{Confirmpassword.error}</p>
			}
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p>
          Already have an account?
          <Link className="link" to="/login">
            Login
          </Link>
        </p>
        <p className="or">or</p>
        <button onClick={handelGoogle}   className="google">Continue with Google</button>
      </div>
    </div>
  );
};

export default Signup;
