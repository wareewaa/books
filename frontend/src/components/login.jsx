// Login.jsx
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useAuth} from "../AuthContext.jsx";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();  // Use the useAuth hook to access login function

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/login/', formData);
            console.log(response);
                  login(response.data.token);
            console.log('Login successful', response.data.user);
            // Redirect to a different page after successful login (e.g., home page)

            navigate('/');
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
                Password:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </label>

            <button type="submit">Login</button>
        </form>
    );
};

export default Login;