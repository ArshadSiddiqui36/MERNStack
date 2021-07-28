
import React, {useState, useContext} from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import login_image from "../images/logo.png";

import { UserContext } from '../App';

const Login = () => {
    // eslint-disable-next-line
    const { state, dispatch } = useContext(UserContext);

    const history = useHistory();

    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = res.json();

        if(res.status === 400 || !data) {
            window.alert("Invalid Credentials");
        } else {
            dispatch({type:"USER", payload: true});
            window.alert("Login Successfull");
            history.push('/');
        }

    }

    return (
        <section className="login">
            <div className="container mx-5 my-4 row">
                <div className="login-content col-md-6">
                    <h2 className="form-title">Login</h2>
                    <form method="POST" className="login-form" id="login-form">

                        <div className="form-group">
                            <label htmlFor="email">
                                <i className="zmdi zmdi-email"></i>
                            </label>
                            <input type="text" name="email" id="email" autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your Email" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                <i className="zmdi zmdi-lock"></i>
                            </label>
                            <input type="password" name="password" id="password" autoComplete="off" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Your Password" />
                        </div>

                        <div className="form-group form-button">
                            <input type="submit" name="login" id="login" value="Login" 
                                onClick={loginUser}
                            />
                        </div>

                    </form>
                </div>

                <div className="login-image col-md-6">
                    <figure>
                        <img src={login_image} alt="loginImage" />
                    </figure>
                    <NavLink to="/register" className="login-image-link">Create an Account</NavLink>
                </div>
            </div>
        </section>
    )
}

export default Login
