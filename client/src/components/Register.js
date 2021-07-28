
import React, {useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import register_image from "../images/logo.png";

const Register = () => {
    const history = useHistory();

    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    });

    let name, value;
    const handleInputs = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
    }


    const PostData = async (e) => {
        e.preventDefault();

        const { name, email, phone, work, password, cpassword } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });

        const data = await res.json();

        if(data.status === 422 || !data) {
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        } else {
            window.alert("Registration Successfull");
            console.log("Registration Successfull");

            history.push("/login");
        }
    }

    return (
        <section className="register">
            <div className="container mx-5 my-4 row">
                <div className="register-content col-md-6">
                    <h2 className="form-title">Register</h2>
                    <form  mathode="POST" className="register-form" id="register-form">

                        <div className="form-group">
                            <label htmlFor="name">
                                <i className="zmdi zmdi-account"></i>
                            </label>
                            <input type="text" name="name" id="name" autoComplete="off"
                                value={user.name}
                                onChange={handleInputs}
                                placeholder="Your Name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">
                                <i className="zmdi zmdi-email"></i>
                            </label>
                            <input type="email" name="email" id="email" autoComplete="off"
                                value={user.email}
                                onChange={handleInputs}
                                placeholder="Your Email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">
                                {/* <i className="zmdi zmdi-smartphone-iphone"></i> */}
                                <i className="zmdi zmdi-phone"></i>
                            </label>
                            <input type="text" name="phone" id="phone" autoComplete="off"
                                value={user.phone}
                                onChange={handleInputs}
                                placeholder="Your Phone"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="work">
                                <i className="zmdi zmdi-case"></i>
                            </label>
                            <input type="text" name="work" id="work" autoComplete="off"
                                value={user.work}
                                onChange={handleInputs}
                                placeholder="Your Profession"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                <i className="zmdi zmdi-lock"></i>
                            </label>
                            <input type="password" name="password" id="password" autoComplete="off"
                                value={user.password}
                                onChange={handleInputs}
                                placeholder="Your Password"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cpassword">
                                <i className="zmdi zmdi-lock"></i>
                            </label>
                            <input type="password" name="cpassword" id="cpassword" autoComplete="off"
                                value={user.cpassword}
                                onChange={handleInputs}
                                placeholder="Confirm Your Password"
                            />
                        </div>

                        <div className="form-group form-button">
                            <input type="submit" name="register" id="register" value="Register" onClick={PostData} />
                        </div>

                    </form>
                </div>

                <div className="register-image col-md-6">
                    <figure>
                        <img src={register_image} alt="registerImage" />
                    </figure>
                    <NavLink to="/login" className="register-image-link">I am already registered</NavLink>
                </div>
            </div>
        </section>
    )
}

export default Register;
