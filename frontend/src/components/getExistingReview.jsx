import axios from 'axios';

const getExistingReview = ({bookId}, setExistingReview) => {
    const token = localStorage.getItem('token');
    // console.log("testo: "+bookId)
    axios.get(`http://127.0.0.1:8000/api/getReviewId/${bookId}`, {
        headers: {
            'Authorization': `Token ${token}`,
        },
    })
    .then(response => {
        const review = response.data.review;
        console.log(`Review ID for Book ${bookId}: ${review.id}  ${review.rating}`);
        setExistingReview(review);
    })
    .catch(() => {
        console.log(`No existing review for Book ${bookId}`);
    });
};

export default getExistingReview;