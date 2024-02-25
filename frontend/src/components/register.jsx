// Register.js
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '', // Added Confirm Password field
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if password and confirm password match
        if (formData.password !== formData.confirmPassword) {
            console.error("Password and Confirm Password do not match");
            return;
        }
        // Exclude "confirmPassword" field before sending the request
        const {confirmPassword, ...postData} = formData;
        try {

            const response = await axios.post('http://localhost:8000/api/register/', postData);
            console.log(formData);
            console.log(response);
            // Redirect to /login after successful registration
            navigate('/login'); // Use the navigate function instead of history.push
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Confirm Password:
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </label>

            <button type="submit">Register</button>
        </form>
    );
};

export default Register;