import React from 'react';
import { NavLink } from 'react-router-dom';

const Errorpage = () => {
    return (
        <>
            <div id="notfound">
                <div className="notfound container">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>We are sorry, page not found!</h2>
                    <p className="mb-2">
                        The page you are looking for might have been remooved
                        had its name changed or is temporarily unavailable.
                    </p>
                    <NavLink to="/"> Back to Homepage </NavLink>
                </div>
            </div>
        </>
    )
}

export default Errorpage;
