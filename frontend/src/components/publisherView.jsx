import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Star from "./Star.jsx";
import './styles/publisher.css'
const PublisherView = () => {
    const {publisherId} = useParams();
    const [publisher, setPublisher] = useState(null);
    // const [showFullBio, setShowFullBio] = useState(false);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch book data based on bookId from your API
        const fetchPublisher = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/publisher/${publisherId}`);
                setPublisher(response.data)
                console.log("Ryciuk Filip:    " + response.data)
                console.log("FILIP RYCIUK:    " + response.data.title)
            } catch (error) {
                console.error('Error fetching author:', error);
            }
        };

        // Fetch book reviews based on bookId from your API
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/publisher/${publisherId}/books`);
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchPublisher();
        fetchBooks();
    }, [publisherId]);


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
    if (!publisher) {
        return <div>Loading...</div>;
    }
    return (
        <div className="page">
            <div className="aboutPublisher">
                <div className="publisherContent">
                    <h2>{publisher.name}</h2>
                    <p>{publisher.description}</p>
                </div>
            </div>
            <div className="booksContainer">
                <h3>Published books:</h3>
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

export default PublisherView;