import "./styles/Star.css"
const ReviewStar = ({rated}) => {
        const starStyle = "reviewStarStyle";
    return (
        <span
            className={starStyle}
        >★</span>
    );
};

export default ReviewStar