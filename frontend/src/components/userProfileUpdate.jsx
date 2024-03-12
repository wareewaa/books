import { useState } from 'react';
import axios from 'axios';
import './styles/profileForm.css'
function UserProfileUpdate() {
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if(bio){
        formData.append('bio', bio);
        }

        if (profilePicture) {
            console.log(profilePicture)
            formData.append('profile_picture', profilePicture);
        }
        try {
            const token = localStorage.getItem('token');
            console.log(formData.profile_picture)
            const response = await axios.put('http://127.0.0.1:8000/api/user/update/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${token}`, // Replace YOUR_TOKEN_HERE with your actual token
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
        window.location.reload()
    };

    return (
        <form  onSubmit={handleSubmit}>
                <textarea
                    className="profileForm"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Write a little bit about you"
                />

            <label>
                Profile Picture:
                <input
                    type="file"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                />
            </label>

            <button type="submit">Update Profile</button>
        </form>
    );
}

export default UserProfileUpdate;
