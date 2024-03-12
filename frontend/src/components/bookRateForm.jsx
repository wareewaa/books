import {useState} from 'react';
import axios from 'axios';
import Star from './Star'

const BookRateForm = ({bookId, existingReview, onSubmission}) => {
    const [rating, setRating] = useState(0); // State for star rating

    // console.log(existingReview.rating)
    // console.log(bookId)
    const initialFormData = existingReview
        ? {...existingReview, book: bookId}
        : {book: bookId, review_text: '', rating: 0};
    // console.log("testRate: " + initialFormData.rating)
    const [formData, setFormData] = useState(initialFormData);

    const [hoverRating, setHoverRating] = useState(0); // New state for hover effect

    const handleStarClick = (ratingValue) => {
        setFormData({...formData, rating: ratingValue});
        // Submit the form automatically upon clicking a star
        handleSubmit(ratingValue);
    };

    const handleMouseEnter = (ratingValue) => {
        setHoverRating(ratingValue);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };


    const handleSubmit = async (ratingValue) => {
        // Ensure we use the passed rating if provided, fallback to state

        const effectiveRating = ratingValue || rating;
        const formData = {
            book: bookId,
            rating: effectiveRating,
            review_text: initialFormData.review_text, // Submit without review text
        };

        try {
            const token = localStorage.getItem('token');
            if (existingReview) {
                // eslint-disable-next-line react/prop-types
                await axios.put(`http://127.0.0.1:8000/api/book-reviews/${existingReview.id}/`, formData, {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
            } else {
                await axios.post('http://127.0.0.1:8000/api/book-reviews/', formData, {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
            }

            // console.log("book: " + formData.book + " rating: " + formData.rating + " review: " + formData.review_text)
            // alert('Review submitted successfully!');
            // Reset rating after successful submission
            // setRating(0);
        } catch (error) {
            setFormData({...formData, rating: 0})
            // console.log(rating)
            // console.log(formData)
            console.error('Error submitting review:', error.response.data);
        }
        onSubmission();
    };

    // Function to render stars
    const renderStars = () => {
        if (localStorage.getItem('token')) {
            return [...Array(10)].map((star, index) => {
                return (
                    <Star
                        key={index}
                        logged={true}
                        rated={hoverRating > 0 ? index < hoverRating : index < formData.rating}
                        onMouseEnter={() => handleMouseEnter(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleStarClick(index + 1)}
                    />
                );
            });
        } else {
            return [...Array(10)].map((star, index) => {
                return (
                    <Star
                        key={index}
                        logged = {false}
                        rated={hoverRating > 0 ? index < hoverRating : index < formData.rating}
                        onMouseEnter={() => handleMouseEnter(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleStarClick(index + 1)}
                    />
                );
            });
        }

    };

    return (
        <form className="starsRating" onSubmit={(e) => e.preventDefault()}>
            <div className="rating">

                {renderStars()}
            </div>
            {/* Rest of your form elements */}
        </form>
    );
};
export default BookRateForm;