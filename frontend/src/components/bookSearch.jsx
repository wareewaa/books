import {useState, useEffect} from 'react';
import axios from 'axios';
import './bookSearch.css';

const BookSearch = () => {
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

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
        fetchBooks();
    }, [selectedGenres, sortBy, searchQuery]); // Re-fetch on filter or sort changes

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
  };
    return (
        <div>
            <div>
                <label>Filter by Genre:</label>
                {genres.map(genre => (
                    <div key={genre.id} className="genre-checkbox">
                        <input
                            type="checkbox"
                            id={`genre-${genre.id}`}
                            value={genre.id}
                            // checked={selectedGenres.includes(genre.id)}
                            onChange={handleGenreChange}
                            // checked
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
                    <option value="&sort=-published_date">Published Date (Desc)</option>
                    <option value="&sort=published_date">Published Date (Asc)</option>
                </select>
            </div>
            <div>
                <label>Search by Text:</label>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Enter search text"
                />
                <button onClick={handleSearchButtonClick}>Search</button>
            </div>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} - Rating: {book.rating} - Published: {book.published_date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookSearch;