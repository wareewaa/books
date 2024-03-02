import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Top100 = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    axios.get('http://127.0.0.1:8000/api/top100')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Top 100 Books</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>{book.title} - Rating: {book.rating}</li>
        ))}
      </ul>
    </div>
  );
};

export default Top100;