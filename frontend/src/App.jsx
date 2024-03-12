
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header.jsx';
// import {Home, Profile} from './components/placeholders';
import BookView from "./components/bookView.jsx";
import Register from "./components/register.jsx";
import Login from "./components/login.jsx";
import {AuthProvider} from "./AuthContext";
import AuthorView from "./components/authorView.jsx";
import ProfileView from "./components/profileView.jsx";
import PublisherView from "./components/publisherView.jsx";
import Top100 from "./components/top100.jsx";
import BookSearch from "./components/bookSearch.jsx";
import BookReviewForm from "./components/bookReviewForm.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import Home from "./components/home"
const App = () => {
    return (
        <AuthProvider>
            <Router>
                    <main>
                <Header/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/top-100" element={<Top100/>}/>
                            {/*<Route path="/profile" element={<Profile/>}/>*/}
                            <Route path="/book/:bookId" element={<BookView/>}/>
                            <Route path="/author/:authorId" element={<AuthorView/>}/>
                            <Route path="/user/:userId" element={<ProfileView/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/advanced_search" element={<BookSearch/>}/>
                            <Route path="/publisher/:publisherId" element={<PublisherView/>}/>
                            <Route path="/book_review" element={<BookReviewForm/>}/>
                            <Route path="/admin_panel" element={<AdminPanel/>}/>
                            {/* Add more routes as needed */}
                        </Routes>
                    </main>
            </Router>
        </AuthProvider>
    );
};

export default App;


// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
//
// function App() {
//   const [count, setCount] = useState(0)
//
//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }
//
// export default App
