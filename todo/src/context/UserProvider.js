import React from 'react';
import { UserContext } from "./UserContext";
import { useState } from "react";
import axios from "axios";


const url = process.env.REACT_APP_API_URL || "http://localhost:3001";
//console.log("URL:", url);
//console.log("URL:", url);

export default function UserProvider({ children }) {
    const userFromSessionStorage = sessionStorage.getItem("user");
    const [user, setUser] = useState(userFromSessionStorage ? JSON.parse(userFromSessionStorage) : {email: "", password: ""});

    const signUp = async () => {
        const json = JSON.stringify(user);
        const headers = {headers: {"Content-Type": "application/json"}};

        try{
            await axios.post(url +"/user/register" , json, headers);
            setUser({email: "", password: ""});
        } catch (error) {
            throw error;
        }
    }
  
    const signIn = async () => {
        const json = JSON.stringify(user);
        const headers = {headers: {"Content-Type": "application/json"}};
        try{
             const response =  await axios.post(url + "/user/login" , json, headers);
             const { id, email, token } = response.data;
             const userData = { id, email, token };
             setUser(userData);
             sessionStorage.setItem('user', JSON.stringify(userData)); // Save in sessionStorage
         } catch(error) {
             setUser({ email: "", password: "" });
             throw error;
        }
    }


    return (
    <UserContext.Provider value={{user, setUser, signUp, signIn}}>
        {children}
    </UserContext.Provider>
  )
}
