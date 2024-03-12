import {Link} from "react-router-dom";
import "./SearchResult.css";

export const SearchResult = ({result}) => {
    const isBook = result.hasOwnProperty("title"); // Check if it's a book

    const getId = () => {
        console.log(result)
        // Determine the ID based on the result type
        return result.id;

    };

    const getLink = () => {
        // Generate the appropriate link based on the result type
        return isBook ? `/book/${getId()}` : `/author/${getId()}`;
    };

    return (
        <Link to={getLink()} className="search-result">
              {result.cover && isBook && (
                <img src={result.cover} alt={`${result.name} cover`} className="result-thumbnail" />
            )}
            {result.picture && !isBook && (
                <img src={result.picture} alt={`${result.name} picture`} className="result-thumbnail" />
            )}
            <span className="result-content">{result.name || result.title}</span>
            <span className="result-label">{isBook ? "Book" : "Author"}</span>

        </Link>
    );
};


// import "./SearchResult.css";
//
// export const SearchResult = ({ result }) => {
//   return (
//     <div
//       className="search-result"
//       onClick={(e) => alert(`You selected ${result}!`)}
//     >
//       {result }
//     </div>
//   );
// };
