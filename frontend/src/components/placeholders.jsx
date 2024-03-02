import React, {useEffect, useState} from 'react';
import {useAuth} from "../AuthContext.jsx";
import axios from "axios";

const Home = () => {
    return <div>Home Page</div>;
};

const Top100s = () => {
    //     const [user, setUser] = useState(null);
    // useEffect(() => {
    //     // Fetch book data based on bookId from your API
    //     const fetchUser = async () => {
    //         const token = localStorage.getItem('token');
    //
    //         if (token) {
    //             try {
    //                 console.log("Token: " + token)
    //                 const response = await axios.get('http://127.0.0.1:8000/api/logged-user/', {
    //                     headers: {
    //                         'Authorization': `Token ${token}`,
    //                     },
    //
    //                 });
    //                 console.log("Eo1: " + response.data.username)
    //                 setUser(response.data)
    //                 console.log("essa " + user)
    //                 if (response.status !== 200) {
    //                     throw new Error(`Error`);
    //                 }
    //
    //                 const responseData = response.data;
    //                 console.log("Eo2 User ID:");
    //
    //                 return responseData;
    //             } catch (error) {
    //                 console.error("There was a problem with the Axios request:", error);
    //                 // Handle the error, perhaps setUserData(null) or show an error message
    //             }
    //         } else {
    //             console.log("No token found in local storage.");
    //             // Handle the case where there's no token, perhaps redirect to login
    //         }
    //
    //         // Fetch book reviews based on bookId from your API
    //
    //     }
    //     fetchUser();
    // }, []);
    //

    return (
        <div>
            <h1>Welcome to the Top 100 Page</h1>
            <p>This is the Top 100 page content.</p>
            <h1>Welcome to the Top 100 Page</h1>
            <h1>Welcome to the Top 100 Page</h1>
            <p>This is the Top 100 page content.</p>
            <h1>Welcome to the Top 100 Page</h1>      <h1>Welcome to the Top 100 Page</h1>
            <p>This is the Top 100 page content.</p>
            <h1>Welcome to the Top 100 Page</h1>      <h1>Welcome to the Top 100 Page</h1>
            <p>This is the Top 100 page content.</p>
            <h1>Welcome to the Top 100 Page</h1>      <h1>Welcome to the Top 100 Page</h1>
            <p>This is the Top 100 page content.</p>
            <h1>Welcome to the Top 100 Page</h1>
        </div>
    );
};

const Profile = () => {
    // const {isAuthenticated} = useAuth();
    // const [userData, setUserData] = useState(null);
    // const getUserData = async () => {
    //     const token = localStorage.getItem('token');
    //
    //     if (token) {
    //         try {
    //             const response = await axios.get('http://127.0.0.1:8000/api/logged-user/', {
    //                 headers: {
    //                     'Authorization': `Token ${token}`,
    //                 },
    //             });
    //             console.log("Eo1: " + response.data)
    //
    //             if (response.status !== 200) {
    //                 throw new Error(`Error`);
    //             }
    //
    //             const responseData = response.data;
    //             console.log("Eo2 User ID:", responseData);
    //
    //             return responseData;
    //         } catch (error) {
    //             console.error("There was a problem with the Axios request:", error);
    //             // Handle the error, perhaps setUserData(null) or show an error message
    //         }
    //     } else {
    //         console.log("No token found in local storage.");
    //         // Handle the case where there's no token, perhaps redirect to login
    //     }
    // };
    // getUserData()
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const data = await getUserData();
    //             setUserData(data);
    //         } catch (error) {
    //             // Handle the error, perhaps setUserData(null) or show an error message
    //         }
    //     };
    //
    //     fetchData();
    // }, []);
    return (
        <div>
            <h2>Profile</h2>
        </div>
    );
};

export {Home, Top100s, Profile};