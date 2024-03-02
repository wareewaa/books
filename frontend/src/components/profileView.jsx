import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const ProfileView = () => {
    const {userId} = useParams();
    const [user, setUser] = useState(null);
    const [showFullBio, setShowFullBio] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Fetch book data based on bookId from your API
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}`);
                setUser(response.data)
                console.log("Ryciuk Filip:    " + response.data)
                console.log("FILIP RYCIUK:    " + response.data.title)
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        // Fetch book reviews based on bookId from your API
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}/reviews`);
                setReviews(response.data);
                console.log(reviews)
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
        const bioText = showFullBio ? user.bio : `${user.bio.substring(0, BIO_LIMIT)}...`;

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


    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div className="page">
            {/*<div className="bookView">*/}
            {/*    /!* Image Container *!/*/}
            {/*    <div className="coverContent">*/}
            {/*        <div className="cover">*/}
            {/*            {book.cover &&*/}
            {/*                <img src={book.cover} alt="Book Cover" className="cover-image"/>}*/}
            {/*        </div>*/}
            {/*        <div className="bookContent">*/}
            {/*            <h1>{book.title}</h1>*/}
            {/*            <p>{book.author.name}</p>*/}
            {/*            <br></br>*/}
            {/*            <p>Genres: {book.genres.join(', ')}</p>*/}
            {/*            <p>Published Date: {book.published_date}</p>*/}
            {/*            <p>Publisher: {book.publisher}</p>*/}
            {/*            <p>Price: {book.price}</p>*/}
            {/*            <p>Rating: {book.rating}</p>*/}
            {/*            <p>Pages: {book.pages}</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="summaryContainer">*/}
            {/*        <p>{renderSummary()}</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="profile">
                <div className="profilePic">
                    {user.profile_picture && <img src={user.profile_picture} alt="Profile picture"
                                            className="profile-picture"/>}
                </div>
                <div className="userContent">
                    <h2>{user.username}</h2>
                    <p>{renderBio()}</p>
                </div>
            </div>
            <div className="reviewsContainer">
                <h3>Book Reviews</h3>
                {reviews.map((review) => (
                    <div key={review.id}>
                        <h4><a href={`/book/${review.book.id}`}>{review.book.title}</a></h4>
                        {/*{review.book.cover && <img src={review.book.cover} alt="Book cover"*/}
                        {/*                     className="book-cover"/>}*/}
                        <p>{review.review_text}</p>
                        <p>{review.rating}/10</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileView;