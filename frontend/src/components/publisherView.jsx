import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const PublisherView = () => {
    const {publisherId} = useParams();
    const [publisher, setPublisher] = useState(null);
    // const [showFullBio, setShowFullBio] = useState(false);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch book data based on bookId from your API
        const fetchAuthor = async () => {
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

        fetchAuthor();
        fetchBooks();
    }, [publisherId]);

    // const toggleBio = () => {
    //     setShowFullBio(!showFullBio);
    // };
    //
    // const renderBio = () => {
    //     const BIO_LIMIT = 350;
    //     const bioText = showFullBio ? author.biography : `${author.biography.substring(0, BIO_LIMIT)}...`;
    //
    //     // Replace newlines with <br> tags
    //     const bioWithLineBreaks = bioText.replace(/\n/g, '<br>');
    //
    //     return (
    //         <div>
    //             <div dangerouslySetInnerHTML={{__html: bioWithLineBreaks}}/>
    //             {author.biography.length > BIO_LIMIT && (
    //                 <button onClick={toggleBio} className="button">
    //                     {showFullBio ? 'Show less' : 'Read more'}
    //                 </button>
    //             )}
    //         </div>
    //     );
    // };


    if (!publisher) {
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
            <div className="aboutPublisher">
                {/*<div className="publisherPic">*/}
                {/*    {publisher.picture && <img src={publisher.picture} alt="Author's picture"*/}
                {/*                            className="author-image"/>}*/}
                {/*</div>*/}
                <div className="publisherContent">
                    <h2>{publisher.name}</h2>
                    {/*<p>{renderBio()}</p>*/}
                </div>
            </div>
            <div className="booksContainer">
                <h3>Books</h3>
                {books.map((book) => (
                    <div key={book.id}>
                        <div className="coverContent">
                            <div className="cover">
                                {book.cover &&
                                    <img src={book.cover} alt="Book Cover" className="cover-image"/>}
                            </div>
                            <div className="bookContent">
                                <h1><a href={`/book/${book.id}`}>{book.title}</a></h1>
                                <h2><a href={`/author/${book.author.id}`}>{book.author.name}</a></h2>
                                <br></br>
                                <p>Genres: {book.genres.join(', ')}</p>
                                <p>Published Date: {book.published_date}</p>
                                <p>Price: {book.price}</p>
                                <p>Rating: {book.rating}</p>
                                <p>Pages: {book.pages}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PublisherView;