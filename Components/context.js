import React from "react";

//this context is for the authentication functions like sign in, sign up, sign out
export const AuthContext = React.createContext();

//this context stores the user token and provides access to it across different files
export const UserTokenContext = React.createContext();