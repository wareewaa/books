import {useState} from 'react';
import "./styles/admin_panel.css"
import axios from 'axios';


const PublisherForm = () => {
    const [isFormVisible, setFormVisibility] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description:'',
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://127.0.0.1:8000/api/publisher/', formData, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            console.log(response.data);
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

    return (


        <div >

            <form className="adminForm" onSubmit={handleSubmit}>
                <h2>Add new Publisher</h2>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}/>
                <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                <button type="submit">Add Publisher</button>
            </form>
        </div>

    );
};

export default PublisherForm;