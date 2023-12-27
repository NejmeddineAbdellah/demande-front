import React from 'react';
import { Outlet, Navigate } from 'react-router';
import AuthService from "../../services/auth.service";

// Example function to check if the user is authenticated
const isAuthenticated = () => {
    const user = AuthService.getCurrentUser();
  return user.roles.includes("ROLE_USER")|| user.roles.includes("ROLE_ADMIN");
};

const UserRoute = () => {
  
   return isAuthenticated() ?  <Outlet/> :   <Navigate to="/NotFoundPage"  />;
   
}

export default UserRoute;