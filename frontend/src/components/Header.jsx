import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ isAuthenticated }) => {
    return (
        <header className="header">
            <div className="logo">Your Logo</div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/top-100">Top 100</Link></li>
                    {/* Conditional rendering for authentication */}
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/logout">Logout</Link></li>
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
Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
export default Header;