import {useState} from 'react';
import "./styles/admin_panel.css"
import axios from 'axios';


const AuthorForm = () => {
    const [isFormVisible, setFormVisibility] = useState(false);
    // const [picture, setPicture] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        biography: '',
        picture: null
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://127.0.0.1:8000/api/authors/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${token}`, // Replace YOUR_TOKEN_HERE with your actual token
                },
            });

            // console.log(response.data); // Handle the response as needed
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
        // setPicture(selectedPicture);
        setFormData({
            ...formData,
            picture: selectedPicture,
        });
    };

    const toggleFormVisibility = () => {
        setFormVisibility(!isFormVisible);
    };

    return (
                <div>
                    <form className="adminForm" onSubmit={handleSubmit}>
                        <h2>Add new Author</h2>
                        <label>Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}/>


                        <label>Biography</label>
                        <textarea
                            name="biography"
                            value={formData.biography}
                            onChange={handleChange}
                        />
                        <label>Picture</label>
                        <input
                            type="file"
                            name="picture"
                            onChange={handleUpload}
                        />
                        <button type="submit">Add Author</button>
                    </form>
                </div>

    );
};

export default AuthorForm;