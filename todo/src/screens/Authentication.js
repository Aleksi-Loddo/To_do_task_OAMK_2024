import { Link,useNavigate } from "react-router-dom";
import "./Authentication.css";
import React from "react";
import { useUser } from "../context/useUser";

export const AuthenticationMode = Object.freeze({
    Login: 'Login',
    Register: 'Register'
    });


export default function Authentication({AuthenticationMode}) {
    const { user, setUser, signUp, signIn } = useUser();
    const Navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("User data before submit:", user); // Debugging line
        try {
            if (AuthenticationMode === AuthenticationMode.Register) {
                await signUp(); // Pass user data
                Navigate("/signin");
            } else {
                await signIn(); // Pass user data
                Navigate("/");
            }
        }  catch (error) {
            const message = error.response && error.response.data ? error.response.data.error: error
            alert(message);
            }
        }
        return (
            <div>
                <h3>{AuthenticationMode === AuthenticationMode.Login ? "Sign in" : "Sign up"}</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input type="email"  name="email" value={user.email} onChange={event => setUser({...user,email: event.target.value})}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" value={user.password} onChange={event => setUser({...user,password: event.target.value})} />
                    </div>
                    <div>
                        <button>{AuthenticationMode === AuthenticationMode.Login ? "Login" : "Submit"}</button>
                    </div>
                    <div>
                        <Link to={AuthenticationMode === AuthenticationMode.Login ? '../signup' : '../signin'}> 
                        {AuthenticationMode === AuthenticationMode.Login ? "No account? Sign up" : "Already signed up? Sign in"}
                        </Link>
                    </div>
                    </form>
            </div>
        )
};