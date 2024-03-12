import {useEffect, useState} from 'react';
import "./styles/admin_panel.css"
import axios from 'axios';


const BookForm = () => {
    const [genres, setGenres] = useState(null)
    const [authors, setAuthors] = useState(null)
    const [publishers, setPublishers] = useState(null)
    const [coverFormData, setCoverFormData] = useState({
        cover: '',
    })
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genres: [],
        summary: '',
        pages: '',
        published_date: '',
        publisher: '',
        rating: 0,
        cover: null
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [genresResponse, authorsResponse, publishersResponse] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/api/genres/'),
                    axios.get('http://127.0.0.1:8000/api/authors/'),
                    axios.get('http://127.0.0.1:8000/api/publisher/'),
                ]);

                setGenres(genresResponse.data);
                setAuthors(authorsResponse.data);
                setPublishers(publishersResponse.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        // console.log(genres[1])
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (coverFormData.cover) {
            console.log(coverFormData.cover)
        }

        console.log(formData)
        try {
            const token = localStorage.getItem('token');
            console.log(formData)
            const response = await axios.post('http://127.0.0.1:8000/api/books_add/', formData, {
                headers: {
                    'Authorization': `Token ${token}`, // Replace YOUR_TOKEN_HERE with your actual token
                },
            });
            console.log(response.data.id); // Handle the response as needed
            const coverResponse = await axios.put(`http://127.0.0.1:8000/api/books_add_cover/${response.data.id}/`, coverFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${token}`, // Replace YOUR_TOKEN_HERE with your actual token
                },
            });
            console.log(coverResponse)
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        console.log(formData)
    };

    const handleUpload = (e) => {
        const selectedPicture = e.target.files[0];
        setCoverFormData({
            cover: selectedPicture
        })
        // setPicture(selectedPicture);
    };

    const handleGenreChange = (e) => {
        const selectedGenres = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
        setFormData({
            ...formData,
            genres: selectedGenres,
        });
        console.log(formData)

    };


    return (
            <div >

                <form className="adminForm" onSubmit={handleSubmit}>
                    <h2>Add New Book</h2>
                    <label>Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange}/>
                    {/* Add fields for other book properties (genres, summary, pages, etc.) here */}
                    <label>Author</label>
                    <select
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select an author</option>
                        {authors &&(
                            authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        )))}
                    </select>

                    <label>Genres</label>
                    <select
                        name="genres"
                        multiple
                        value={formData.genres}
                        onChange={handleGenreChange}
                    >
                        {genres &&(
                            genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        )))}
                    </select>
                    <label>Summary</label>
                    <textarea
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                    />

                    <label>Pages</label>
                    <input
                        type="number"
                        name="pages"
                        value={formData.pages}
                        onChange={handleChange}
                    />


                    <label>Published Date</label>
                    <input
                        type="date"
                        name="published_date"
                        value={formData.published_date}
                        onChange={handleChange}
                    />

                    <label>Publisher</label>
                    <select
                        name="publisher"
                        value={formData.publisher}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select a publisher</option>
                        {publishers &&(
                            publishers.map((publisher) => (
                            <option key={publisher.id} value={publisher.id}>
                                {publisher.name}
                            </option>
                        )))}
                    </select>


                        <label>Upload cover:</label>
                        <input
                            type="file"
                            name="cover"
                            onChange={handleUpload}
                        />
                    <button type="submit">Add Book</button>
                </form>
            </div>
    );
};

export default BookForm;