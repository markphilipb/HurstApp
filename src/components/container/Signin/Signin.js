import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import './SigninPage.css';
import { Link } from 'react-router-dom';
import { signin } from '../../../actions/userActions';


function SigninPage(props) {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state=>state.userSignin);
    const { loading, userInfo, error} = userSignin;
    const dispatch = useDispatch();


    useEffect(() => {
        if(userInfo){
            props.history.push("/");
        }

        return () => {

        };
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
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
                        <input type="text" id="email" className="fadeIn second" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}></input>
                        <input type="text" id="password" className="fadeIn second" name="email" placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
                        <input type="submit" className="fadeIn fourth" value="Log In"></input>
                    </form>

                    <div id="formFooter">
                        <a className="underlineHover" href="#">Forgot Password?</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SigninPage;