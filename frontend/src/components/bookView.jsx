import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import "./bookView.css";

const BookView = () => {
    const {bookId} = useParams();
    const [book, setBook] = useState(null);
    const [showFullSummary, setShowFullSummary] = useState(false);
    const [showFullBio, setShowFullBio] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Fetch book data based on bookId from your API
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/books/${bookId}/`);
                setBook(response.data)
                console.log("ESSUNIA:    " + response.data.cover)
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };

        // Fetch book reviews based on bookId from your API
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/books/${bookId}/reviews`);
                setReviews(response.data);
                console.log("YOOOOO:    " + response.data.review.rating)
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchBook();
        fetchReviews();
    }, [bookId]);

    const toggleSummary = () => {
        setShowFullSummary(!showFullSummary);
    };

    const renderSummary = () => {
        const SUMMARY_LIMIT = 350;
        const summaryText = showFullSummary ? book.summary : `${book.summary.substring(0, SUMMARY_LIMIT)}...`;

        // Replace newlines with <br> tags
        const summaryWithLineBreaks = summaryText.replace(/\n/g, '<br>');

        return (
            <div>
                <div dangerouslySetInnerHTML={{__html: summaryWithLineBreaks}}/>
                {book.summary.length > SUMMARY_LIMIT && (
                    <button onClick={toggleSummary} className="button">
                        {showFullSummary ? 'Show less' : 'Read more'}
                    </button>
                )}
            </div>
        );
    };

    const toggleBio = () => {
        setShowFullBio(!showFullBio);
    };

    const renderBio = () => {
        const BIO_LIMIT = 350;
        const bioText = showFullBio ? book.author.biography : `${book.author.biography.substring(0, BIO_LIMIT)}...`;

        // Replace newlines with <br> tags
        const bioWithLineBreaks = bioText.replace(/\n/g, '<br>');

        return (
            <div>
                <div dangerouslySetInnerHTML={{__html: bioWithLineBreaks}}/>
                {book.author.biography.length > BIO_LIMIT && (
                    <button onClick={toggleBio} className="button">
                        {showFullBio ? 'Show less' : 'Read more'}
                    </button>
                )}
            </div>
        );
    };


    if (!book) {
        return <div>Loading...</div>;
    }
    return (
        <div className="page">
            <div className="bookView">
                {/* Image Container */}
                <div className="coverContent">
                    <div className="cover">
                        {book.cover &&
                            <img src={book.cover} alt="Book Cover" className="cover-image"/>}
                    </div>
                    <div className="bookContent">
                        <h1>{book.title}</h1>
                        <p>{book.author.name}</p>
                        <br></br>
                        <p>Genres: {book.genres.join(', ')}</p>
                        <p>Published Date: {book.published_date}</p>
                        <p>Publisher: {book.publisher}</p>
                        <p>Price: {book.price}</p>
                        <p>Rating: {book.rating}</p>
                        <p>Pages: {book.pages}</p>
                    </div>
                </div>
                <div className="summaryContainer">
                    <p>{renderSummary()}</p>
                </div>
            </div>
            <div className="aboutAuthor">
                <div className="authorPic">
                    {book.author.picture && <img src={book.author.picture} alt="Author's picture"
                                             className="author-image"/>}
                </div>
                <div className="authorContent">
                    <h2>{book.author.name}</h2>
                    <p>{renderBio()}</p>
                </div>
            </div>
            <div className="reviewsContainer">
                <h3>Book Reviews</h3>
                {reviews.map((review) => (
                    <div key={review.id}>
                        <h4>{review.user.username}</h4>
                        {review.user.profile_picture && <img src={review.user.profile_picture} alt="User's picture"
                                             className="author-image"/>}
                        <p>{review.review_text}</p>
                        <p>{review.rating}/10</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookView;