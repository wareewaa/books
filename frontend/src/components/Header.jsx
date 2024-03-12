import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/Header.css';
import '../index.css'
import {useAuth} from "../AuthContext.jsx";
import useUserDataService from "./loggedUserDataService.jsx";
import SearchBar from "./searchBar/SearchBar.jsx";
import axios from "axios";
import {SearchResultsList} from "./searchBar/SearchResultsList.jsx";

const Header = () => {
    const {isAuthenticated, logout} = useAuth();
    const {loggedUser} = useUserDataService();
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const searchContainerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        // getUserData()
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header>
            <div className="leftLinks">
                <a><Link to="/">Home</Link></a>
                <a><Link to="/top-100">Top 100</Link></a>
                <a><Link to="/advanced_search">Browse</Link></a>
            </div>

            <div className="search-bar-container" ref={searchContainerRef}>
                <SearchBar setResults={setResults} setShowResults={setShowResults}/>
                {showResults && results && <SearchResultsList results={results}/>}
            </div>

            <div className="rightLinks">
                {isAuthenticated ? (
                    <>
                        {loggedUser && loggedUser.is_moderator ? (
                            <>
                                <a><Link to="/admin_panel">Admin Panel</Link></a>
                            </>
                        ) : (
                            <>

                            </>
                        )}
                        <a className="logout"><Link to="/" onClick={logout}> Logout </Link></a>
                        <a><Link to={loggedUser?.id ? `/user/${loggedUser.id}` : '/login'}>Profile</Link></a>
                    </>
                ) : (
                    <>
                        <a><Link to="/register">Register</Link></a>
                        <a><Link to="/login">Login</Link></a>
                    </>
                )}
            </div>
        </header>
    )
        ;
};

export default Header;
