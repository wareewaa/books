import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserDataService = () => {
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/logged-user/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        if (response.status !== 200) {
          throw new Error(`Error`);
        }

        const responseData = response.data;
        setUser(responseData);
        return responseData;
      } catch (error) {
        console.error("There was a problem with the Axios request:", error);
        throw error; // Rethrow the error for the caller to handle
      }
    } else {
      console.log("No token found in local storage.");
      // Handle the case where there's no token, perhaps redirect to login
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserData();
      } catch (error) {
        // Handle the error, perhaps setUserData(null) or show an error message
      }
    };

    fetchData();
  }, []); // Run once on mount

  return { user, getUserData };
};

export default useUserDataService;