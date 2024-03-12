// Register.js
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import "./styles/registerform.css"
import SimpleModal from './SimpleModal'; // Import the modal component

const initialFormData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const Register = () => {
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control modal visibility
    const [passwordError, setPasswordError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setPasswordError("Passwords do not match.");
            setFormData({...formData, password: '', confirmPassword: ''});
            return;
        } else {
            setPasswordError('');
        }

        const {confirmPassword, ...postData} = formData;
        try {

            const response = await axios.post('http://localhost:8000/api/register/', postData);
            setShowSuccessModal(true);
            setFormData(initialFormData);
            // navigate('/login');
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div className="formContainerRegister">
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
                {passwordError && <div style={{color: 'red'}}>{passwordError}</div>}

                <button type="submit">Register</button>
            </form>
            <SimpleModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
                <h4>Registration Successful!</h4>
                <p>Welcome aboard! You can now login with your new account.</p>
                <button onClick={() => {
                    setShowSuccessModal(false);
                    navigate('/login');
                }}>Proceed to Login
                </button>
            </SimpleModal>
        </div>

    );
};

export default Register;