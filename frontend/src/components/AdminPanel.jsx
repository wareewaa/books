import React from 'react';
import {useAuth} from '../AuthContext';
import BookForm from './BookForm';
import AuthorForm from './AuthorForm';
import GenreForm from './GenreForm';
import PublisherForm from './PublisherForm';
import useUserDataService from "./loggedUserDataService.jsx";
import "./styles/admin_panel.css"

const AdminPanel = () => {
    const {user} = useAuth();
    const {loggedUser} = useUserDataService();
    console.log(user)

    if (!loggedUser) {
        return <div>loading...</div>;
    } else if (!loggedUser.is_moderator) {
        return <div>No permission...</div>;
    }
    return (
        <div className="adminPanel">
            <div className="navSection">

                <BookForm/>
                <AuthorForm/>
                <GenreForm/>
                <PublisherForm/>
            </div>
        </div>
    );
};

export default AdminPanel;