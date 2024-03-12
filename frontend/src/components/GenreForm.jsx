import {useState} from 'react';
import "./styles/admin_panel.css"
import axios from 'axios';


const GenreForm = () => {
    const [isFormVisible, setFormVisibility] = useState(false);
    const [formData, setFormData] = useState({
        name: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://127.0.0.1:8000/api/genres/', formData, {
                headers: {
                    'Authorization': `Token ${token}`, // Replace YOUR_TOKEN_HERE with your actual token
                },
            });

            console.log(response.data); // Handle the response as needed
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
    const toggleFormVisibility = () => {
        setFormVisibility(!isFormVisible);
    };
    return (
                <div>
                    <form className="adminForm" onSubmit={handleSubmit}>
                        <h2>Add new Genre</h2>
                        <label>Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}/>

                        <button type="submit">Add Genre</button>
                    </form>
                </div>
    );
};

export default GenreForm;