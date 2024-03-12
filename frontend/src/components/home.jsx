import React, {useEffect, useState} from 'react';
import {useAuth} from "../AuthContext.jsx";
import axios from "axios";
import AuthorView from "./authorView.jsx";
import {Link} from "react-router-dom";
import "./styles/home.css"

const Home = () => {
    const {isAuthenticated} = useAuth();
    return (
        <div>
            <div className="home">
                <h1>Welcome to BookClub</h1>
                <p>You can begin to browse books right away, either by using search bar or Browse page above</p>
                {isAuthenticated ? (
                    <>
                        <p>You are logged in.</p>

                    </>
                ) : (
                    <>
                        <a><Link to="/register">Feel free to join us for better experience.</Link></a>
                        <br></br>
                        <a><Link to="/login">If you already have an account sign in.</Link></a>
                    </>
                )}
            </div>
            {/*<div className="highestRatedBook">*/}
            {/*    <p>yo</p>*/}
            {/*</div>*/}
        </div>
    );
};

export default Home;