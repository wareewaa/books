import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import "./styles/bookView.css";
import BookReviewForm from "./bookReviewForm.jsx";
import BookRateForm from "./bookRateForm.jsx";
import Star from "./Star.jsx";
import ReviewStar from "./ReviewStar.jsx";
import useUserDataService from "./loggedUserDataService.jsx";


const BookView = () => {
        const {bookId} = useParams();
        const [book, setBook] = useState(null);
        const [showFullSummary, setShowFullSummary] = useState(false);
        const [showFullBio, setShowFullBio] = useState(false);
        const [reviews, setReviews] = useState([]);
        const [existingReview, setExistingReview] = useState(null)
        const {loggedUser} = useUserDataService();
        const [isEditing, setIsEditing] = useState(false);


        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/books/${bookId}/`);
                setBook(response.data)
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/books/${bookId}/reviews`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        const fetchExistingReview = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://127.0.0.1:8000/api/getReviewId/${bookId}`, {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                setExistingReview(response.data);

            } catch (error) {
                console.error('Error fetching review:', error);
            }
        }
        const fetchData = async () => {
            try {
                await fetchExistingReview();
                await fetchBook();
                await fetchReviews();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        useEffect(() => {
            fetchData();
        }, [bookId]);

        const toggleSummary = () => {
            setShowFullSummary(!showFullSummary);
        };

        const renderSummary = () => {
            const SUMMARY_LIMIT = 350;
            const summaryText = showFullSummary || book.summary.length <= SUMMARY_LIMIT ? book.summary : `${book.summary.substring(0, SUMMARY_LIMIT)}...`;
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
            const bioText = showFullBio || book.author.biography.length <= BIO_LIMIT ? book.author.biography : `${book.author.biography.substring(0, BIO_LIMIT)}...`;

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

        const handleEditClick = () => {
            if (isEditing) {
                setIsEditing(false)
            } else {
                setIsEditing(true);
            }
        };

        const handleDeleteClick = async (reviewId) => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.delete(`http://127.0.0.1:8000/api/book-reviews/${reviewId}/`, {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                if (response.status === 204) {

                    console.log('Review deleted successfully!');
                } else {
                    console.error('Failed to delete review:', response.data.detail);
                }
            } catch (error) {
                console.error('Error deleting review:', error.message);
            }
            window.location.reload()
        };

        const handleReviewsChange = () => {
            fetchData();
        }

        const handleNothing = () => {
            console.log("nothing")
        }

        const renderStars = (book) => {
            return (
                <div className="stars-container">
                    <Star rated={true} logged={true}/>
                    <span className="rating">{book.rating}/10 </span>
                    <span className="rating-amount">({book.rating_amount})</span>
                </div>
            );
        };
        const renderStarsReview = (review) => {
            return (
                <div className="stars-review-container">
                    <ReviewStar rated={true}/>
                    <span className="rating">{review.rating}/10 </span>
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
                            <div className="rating">{renderStars(book)}</div>
                            <h1>{book.title}</h1>
                            <p><a href={`/author/${book.author.id}`}>{book.author.name}</a></p>
                            <br></br>
                            <p>Published Date: {book.published_date}</p>
                            <p>Publisher: <a href={`/publisher/${book.publisher.id}`}>{book.publisher.name}</a></p>
                            <p>Pages: {book.pages}</p>
                            <p>Genres: {book.genres.join(', ')}</p>
                        </div>
                    </div>
                    {/*onReviewSubmission={handleReviewsChange*/}
                    <BookRateForm bookId={book.id} existingReview={existingReview} onSubmission={handleReviewsChange}/>
                    <div className="summaryContainer">
                        <p>Summary:</p>
                        <p>{renderSummary()}</p>
                    </div>
                </div>
                <div className="aboutAuthor">
                    <div className="authorPic">
                        {book.author.picture && <img src={book.author.picture} alt="Author's picture"
                                                     className="author-image"/>}
                    </div>
                    <div className="authorContent">
                        <h2><a href={`/author/${book.author.id}`}>{book.author.name}</a></h2>
                        <p>{renderBio()}</p>
                    </div>
                </div>
                <div className="reviews">
                    <div className="loggedUserReview">
                        <h3>Your review</h3>
                        {reviews.map((review) => {
                            if (existingReview && review.id === existingReview.id && existingReview.review_text !== '') {
                                return (
                                    <div className="singleReview" key={review.id}>
                                        <div className="reviewData">
                                            <div className="userPicture">
                                                {review.user.profile_picture && (
                                                    <img src={review.user.profile_picture} alt="User's picture"
                                                         className="author-image"/>
                                                )}
                                            </div>
                                            <div className="reviewContent">

                                                <h4 className="singleReviewRating">{renderStarsReview(review)}</h4>
                                                <h4><a href={`/user/${review.user.id}`}>{review.user.username}</a></h4>
                                                <p className="singleReviewText">{review.review_text}</p>
                                            </div>
                                        </div>
                                        <div className="reviewActions">
                                            <button className="editButton" onClick={handleEditClick}>Edit</button>
                                            <button className="deleteButton"
                                                    onClick={() => handleDeleteClick(review.id)}>Delete
                                            </button>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                        {loggedUser
                            ?
                            <div>
                                {existingReview
                                    ?
                                    <div>
                                        {existingReview.review_text === ''
                                            ?
                                            <BookReviewForm bookId={book.id} existingReview={existingReview}
                                                            onSubmission={handleReviewsChange} onSubmissionSetEdit={handleNothing}/>
                                            :
                                            <></>
                                            // onReviewSubmission={handleReviewsChange()}
                                        }
                                    </div>
                                    :
                                    <div className="rateBookInfo">
                                        <h3>Rate this book to be able to review it</h3>
                                    </div>
                                }
                            </div>
                            :
                            <div className="rateBookInfo">
                                <p>You need to be logged in to post reviews</p>
                            </div>
                        }
                        {isEditing && (
                            <BookReviewForm bookId={book.id} existingReview={existingReview}
                                            onSubmission={handleReviewsChange} onSubmissionSetEdit={handleEditClick}/>
                            // onReviewSubmission={handleReviewsChange()}
                        )}
                    </div>
                    <div className="reviewsContainer">
                        <h3>Book Reviews</h3>
                        {reviews
                            .filter((review) => review.review_text.trim() !== '')
                            .map((review) => (
                                <div className="singleReview" key={review.id}>
                                    <div className="reviewData">
                                        <div className="userPicture">
                                            {review.user.profile_picture &&
                                                <img src={review.user.profile_picture} alt="User's picture"
                                                     className="author-image"/>}
                                        </div>
                                        <div className="reviewContent">
                                            <h4 className="singleReviewRating">{renderStarsReview(review)}</h4>
                                            <h4><a href={`/user/${review.user.id}`}>{review.user.username}</a></h4>
                                            <p className="singleReviewText">{review.review_text}</p>
                                        </div>
                                    </div>
                                    <div className="reviewActions">
                                        {loggedUser &&loggedUser.is_moderator && (
                                            <button className="deleteButton"
                                                    onClick={() => handleDeleteClick(review.id)}>Delete</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        );
    }
;

export default BookView;