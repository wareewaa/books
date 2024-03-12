import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import "./styles/profile.css"
import UserProfileUpdate from "./userProfileUpdate.jsx";
import useUserDataService from "./loggedUserDataService.jsx";
import ReviewStar from "./ReviewStar.jsx";

const ProfileView = () => {
    const {userId} = useParams();
    const [user, setUser] = useState(null);
    const [showFullBio, setShowFullBio] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [editMode, setEditMode] = useState(false);  // New state to track edit mode
    const {loggedUser} = useUserDataService();
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}/reviews`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchUser();
        fetchReviews();
    }, [userId]);

    const toggleBio = () => {
        setShowFullBio(!showFullBio);
    };

    const renderBio = () => {
        const BIO_LIMIT = 350;
        const bioText = showFullBio || user.bio.length <= BIO_LIMIT ? user.bio : `${user.bio.substring(0, BIO_LIMIT)}...`;
        // Replace newlines with <br> tags
        const bioWithLineBreaks = bioText.replace(/\n/g, '<br>');
        return (
            <div>
                <div dangerouslySetInnerHTML={{__html: bioWithLineBreaks}}/>
                {user.bio.length > BIO_LIMIT && (
                    <button onClick={toggleBio} className="button">
                        {showFullBio ? 'Show less' : 'Read more'}
                    </button>
                )}
            </div>
        );
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


    const handleEditClick = () => {
        if (isEditing) {
            setIsEditing(false)
        } else {
            setIsEditing(true);
        }
    };

    const renderStarsReview = (review) => {
        return (
            <div className="stars-review-container">
                <ReviewStar rated={true}/>
                <span className="rating">{review.rating}/10 </span>
            </div>
        );
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page">
            <div className="profile">
                <div className="profileData">
                    <div className="profilePicture">
                        {user.profile_picture && (
                            <img src={user.profile_picture} alt="Profile picture"
                                 className="profile-picture"/>
                        )}
                    </div>
                    <div className="profileContent">
                        <h2>{user.username}</h2>
                        <p>{renderBio()}</p>
                    </div>
                </div>

                {loggedUser && loggedUser.id === user.id && (
                    <div className="profileActions">
                        {/*<button className="deleteButton"*/}
                        {/*        onClick={() => handleDeleteClick(review.id)}>Delete*/}
                        {/*</button>*/}
                        <button className="editButton" onClick={handleEditClick}>Edit</button>
                    </div>
                )}

            </div>
            <div>
                {isEditing && (
                    <div>
                        <UserProfileUpdate/>
                    </div>
                )}
            </div>
            <div className="profileReviewsContainer">
                <h3>Book Reviews</h3>
                {reviews
                    .filter((review) => review.review_text.trim() !== '')
                    .map((review) => (
                        <div className="profileSingleReview" key={review.id}>
                            <div className="reviewData">
                                <div className="userPicture">
                                    {review.book.cover &&
                                        <img src={review.book.cover} alt="Book's cover"
                                             className="book-cover"/>}
                                </div>
                                <div className="reviewContent">
                                    <h4 className="singleReviewRating">{renderStarsReview(review)}</h4>
                                    <h4><a href={`/book/${review.book.id}`}>{review.book.title}</a></h4>
                                    <p><a href={`/author/${review.book.author.id}`}>{review.book.author.name}</a></p>
                                    <p className="singleReviewText">{review.review_text}</p>
                                </div>
                            </div>
                            <div className="reviewActions">
                                {loggedUser && (loggedUser.is_moderator || loggedUser.id === user.id)  && (
                                    <button className="deleteButton"
                                            onClick={() => handleDeleteClick(review.id)}>Delete</button>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ProfileView;