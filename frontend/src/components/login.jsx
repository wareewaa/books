// Login.jsx
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useAuth} from "../AuthContext.jsx";
import "./styles/registerform.css"

const initialFormData = {
    username: '',
    password: '',
};

const Login = () => {
    const navigate = useNavigate();
    const {login} = useAuth();  // Use the useAuth hook to access login function
    const [passwordError, setPasswordError] = useState('');
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
            login(response.data.token);
            navigate('/');
            // window.location.reload()

        } catch (error) {
            setFormData(initialFormData);
            setPasswordError("Invalid credentials")
            console.error(error);
        }
    };

    return (
        <form className="formContainerRegister" onSubmit={handleSubmit}>
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
            {passwordError && <div style={{color: 'red'}}>{passwordError}</div>}

            <button type="submit">Login</button>
        </form>
    );
};

export default Login;