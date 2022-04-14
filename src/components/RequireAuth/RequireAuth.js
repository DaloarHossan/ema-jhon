import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.config';

const RequireAuth = ({children}) => {
	const user =auth.currentUser;
	const location =useLocation();
	if(!user){
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
	return children;
};

export default RequireAuth;