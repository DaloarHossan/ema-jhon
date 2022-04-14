import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../firebase.config';
import logo from '../../images/Logo.svg';
import './Header.css';

const Header = () => {
    const [user,setUser]=useState('')
    useEffect(()=>{
        const userstate=onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user)
            }
            else{
                setUser({})
            }
        })
        return userstate;
    },[])
    const handelsignOut=()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/shop">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {
                    user.email? <><button onClick={handelsignOut}>Sign out</button>
                    <small className='user'>{user.email}</small></>:
                    <Link to='/login'>Login</Link>
                }
                
            </div>
        </nav>
    );
};

export default Header;