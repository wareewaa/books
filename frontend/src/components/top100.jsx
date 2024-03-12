import {useEffect, useState} from 'react';
import axios from 'axios';

import Star from "./Star.jsx";
// import "./Top100.css";
// import "./styles/bookView.css";
import "./styles/Top100.css"

const Top100 = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch data from the API endpoint
        axios.get('http://127.0.0.1:8000/api/top100')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

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
        <div className="top100">
            <h1>Top 100 rated books</h1>

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
    );
};

export default Top100;