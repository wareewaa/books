import "./SearchResultsList.css";
import {SearchResult} from "./SearchResult";

export const SearchResultsList = ({results}) => {
    if (results.length === 0) {
        return <div className="no-results">No results found.</div>;
    }
    return (
        <div className="results-list">
            {results.map((result, id) => {
                return <SearchResult result={result} key={id}/>;
            })}
        </div>
    );
};
