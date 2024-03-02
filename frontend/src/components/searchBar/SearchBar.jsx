import {useState} from "react";
import {FaSearch} from "react-icons/fa";

import "./SearchBar.css";
import Header from "../Header.jsx";
import axios from "axios";

export const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("");

    const fetchData = async (value) => {
        try {
            const bookResponse = await axios.get(`http://127.0.0.1:8000/api/quick_search/book/?search=${value}`);
            const authorResponse = await axios.get(`http://127.0.0.1:8000/api/quick_search/author/?search=${value}`);
            console.log("search query:  " + value)

            const bookData = bookResponse.data;
            const authorData = authorResponse.data;

            const combinedResults = [...bookData, ...authorData];
            // console.log("bookdata: " + bookData[0])
            //           console.log("authorData: " + authorData)
            console.log("combinedResults: " + combinedResults[0])
            setResults(combinedResults);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon"/>
            <input
                className="SearchBarInput"
                placeholder="Type to search..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};
export default SearchBar;