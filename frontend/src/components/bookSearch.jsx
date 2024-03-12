import {useState, useEffect} from 'react';
import axios from 'axios';
import "./styles/searchform.css"
import Star from "./Star.jsx";

const BookSearch = () => {
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [afterSearch, setAfterSearch] = useState(false)
    useEffect(() => {
        // Fetch genres
        axios.get('http://127.0.0.1:8000/api/genres')
            .then(response => {
                setGenres(response.data);
            })
            .catch(error => {
                console.error('Error fetching genres:', error);
            });

        // Fetch books with initial filters
        // fetchBooks();
    }, []); // Re-fetch on filter or sort changes
// [selectedGenres, sortBy, searchQuery]
    const fetchBooks = () => {
        const genreParams = selectedGenres.map(genreId => `genres=${genreId}`).join('&');
        const searchParam = searchQuery ? `search=${searchQuery}` : '';
        const apiUrl = `http://127.0.0.1:8000/api/books/?${genreParams}${sortBy}&${searchParam}`;
        console.log("Test2: " + apiUrl)
        axios.get(apiUrl)
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    };

    const handleGenreChange = (event) => {
        const selectedGenreId = event.target.value;
        const updatedGenres = selectedGenres.includes(selectedGenreId)
            ? selectedGenres.filter(id => id !== selectedGenreId)
            : [...selectedGenres, selectedGenreId];
        console.log("test: " + updatedGenres)
        setSelectedGenres(updatedGenres);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const handleSearchButtonClick = () => {
        fetchBooks();
        setAfterSearch(true)
    };

    const renderStars = (book) => {
        return (
            <div className="stars-container">
                {/*{[...Array(10)].map((star, index) => (*/}


                {/*))}*/}
                <Star rated={true}/>
               <span className="rating">{book.rating}/10 </span>
                <span className="rating-amount">({book.rating_amount})</span>
            </div>
        );
    };

    return (
        <div className="page">
            <div className="formContainerSearch">

                <label>Filter by Genre:</label>
                <div className="genres-wrapper">
                    {genres.map(genre => (
                        <div key={genre.id} className="genre-checkbox">

                            <input
                                type="checkbox"
                                id={`genre-${genre.id}`}
                                value={genre.id}
                                onChange={handleGenreChange}
                            />
                            <label htmlFor={`genre-${genre.id}`}>{genre.name}</label>
                        </div>
                    ))}
                </div>

                <div>
                    <label>Sort By:</label>
                    <select onChange={handleSortChange} value={sortBy}>
                        <option value="">Default (by ID)</option>
                        <option value="&sort=-rating">Rating (Desc)</option>
                        <option value="&sort=rating">Rating (Asc)</option>
                        <option value="&sort=-rating_amount">Number of ratings (Desc)</option>
                        <option value="&sort=rating_amount">Number of ratings(Asc)</option>
                        <option value="&sort=-published_date">Published Date (Desc)</option>
                        <option value="&sort=published_date">Published Date (Asc)</option>
                    </select>
                </div>
                <div>
                    <label>Search by Title or Author:</label>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Enter search text"
                    />
                    <button onClick={handleSearchButtonClick}>Search</button>
                </div>
            </div>
            <div className="booksContainer">
                <h3>Results:</h3>
                {afterSearch && books.length === 0 && (
                    <div className="no-results">No results found.</div>
                )}
                {books.map((book) => (
                    <div className="singleBookView" key={book.id}>
                        <div className="singleCoverContent">
                            <div className="singleCover">
                                {book.cover &&
                                    <img src={book.cover} alt="Book Cover" className="singleCover-image"/>}
                            </div>
                            <div className="bookContent">
                                {/*<p>{existingReview.id}</p>*/}
                                <div className="rating">{renderStars(book)}</div>
                                <h1><a href={`/book/${book.id}`}>{book.title}</a></h1>
                                <p><a href={`/author/${book.author.id}`}>{book.author.name}</a></p>
                                <br></br>

                                <p>Published Date: {book.published_date}</p>
                                <p>Publisher: <a href={`/publisher/${book.publisher.id}`}>{book.publisher.name}</a></p>

                                <p>Pages: {book.pages}</p>
                                <p>Genres: {book.genres.join(', ')}</p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookSearch;