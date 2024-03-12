import React, {useState} from 'react';
import axios from 'axios';
import './styles/reviewForm.css'

const BookReviewForm = ({bookId, existingReview, onSubmission, onSubmissionSetEdit}) => {
    const initialFormData = existingReview
        ? {...existingReview, book: bookId}
        : {book: bookId, review_text: '', rating: 0};
    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://127.0.0.1:8000/api/book-reviews/${existingReview.id}/`, formData, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            console.log('Book review created:');
            console.log(response.data);
            setFormData({...formData, review_text: ''})
        } catch (error) {
            console.error('Error creating book review:', error);
        }
        onSubmissionSetEdit();
        onSubmission();
    };

    return (
        <form onSubmit={handleSubmit}>
                <textarea
                    className="reviewForm"
                    name="review_text"
                    value={formData.review_text}
                    onChange={handleInputChange}
                    placeholder="Write a review"
                />
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default BookReviewForm;
