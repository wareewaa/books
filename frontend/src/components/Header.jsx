import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';
import {useAuth} from "../AuthContext.jsx";
import useUserDataService from "./loggedUserDataService.jsx";
import SearchBar from "./searchBar/SearchBar.jsx";
import axios from "axios";
import {SearchResultsList} from "./searchBar/SearchResultsList.jsx";

const Header = () => {
    const {isAuthenticated, logout} = useAuth();
    const {user} = useUserDataService();
    const [results, setResults] = useState([]);

    return (
        <header className="header">
            <div className="logo">Your Logo</div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/top-100">Top 100</Link></li>
                    <div className="search-bar-container">
                        <SearchBar setResults={setResults}/>
                        {results && results.length > 0 && <SearchResultsList results={results}/>}
                    </div>
                    {isAuthenticated ? (
                        <>
                            {/* Use optional chaining to handle cases where user may be null or undefined */}
                            <li><Link to={user?.id ? `/user/${user.id}` : '/login'}>Profile</Link></li>
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
