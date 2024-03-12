import './styles/Star.css'

const Star = ({logged, rated, onMouseEnter, onMouseLeave, onClick}) => {
    const starStyle = rated ? "star rated" : "star";
    if (logged) {
        return (
        <span
            className={starStyle}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >★</span>
    );
    } else {
        return (
        <span
            className={starStyle}
        >★</span>
    );
    }


};


export default Star
