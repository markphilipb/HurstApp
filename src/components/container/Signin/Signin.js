import React from 'react';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import './SigninPage.css';
import { useAuth0 } from "@auth0/auth0-react";



function SigninPage(props) {
    
    const userSignin = useSelector(state=>state.userSignin);
    const { loading, userInfo, error} = userSignin;

    const { isAuthenticated } = useAuth0();
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();


    useEffect(() => {
        if(userInfo){
            props.history.push("/");
        }

        return () => {

        };
    }, [props.history, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch(signin(email, password)
        // loginWithRedirect();
    }


    return (
        
        <div className="signinForm">
             <div>{loading && <div>Loading...</div>}</div>
                        <div>{error && <div>{error}</div>}</div>
            <div className="wrapper fadeInDown">
                <div id="formContent">

                    <div className="fadeIn first">Sign In
                    </div>

                    <form onSubmit={submitHandler}>
                        {isAuthenticated ? 
                        <input onClick={() => logout({ returnTo: window.location.origin })} type="submit" className="fadeIn fourth" value="Log Out"></input>
                        :
                        <input onClick={() => loginWithRedirect()} type="submit" className="fadeIn fourth" value="Log In"></input>
                        }
                        </form>
                    
                </div>
            </div>
        </div>
    ) 

}

export default SigninPage;