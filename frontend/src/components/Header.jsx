import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';
import { useAuth } from "../AuthContext.jsx";
import useUserDataService from "./loggedUserDataService.jsx";

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const { user } = useUserDataService();
    console.log(user.id)
    return (
        <header className="header">
            <div className="logo">Your Logo</div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/top-100">Top 100</Link></li>
                    {isAuthenticated ? (
                        <>
                            {/* Use optional chaining to handle cases where user may be null or undefined */}
                            <li><Link to={user?.id ? `/user/${user.id}` : '/profile'}>Profile</Link></li>
                            <li>
                                <button type="button" onClick={logout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
