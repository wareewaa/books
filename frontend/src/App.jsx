import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header.jsx';
import {Home, Top100, Profile} from './components/placeholders';
import BookView from "./components/bookView.jsx";
import Register from "./components/register.jsx";
import Login from "./components/login.jsx";
import {AuthProvider} from "./AuthContext";
import AuthorView from "./components/authorView.jsx";
import ProfileView from "./components/profileView.jsx";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Header/>
                    <main>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/top-100" element={<Top100/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/book/:bookId" element={<BookView/>}/>
                            <Route path="/author/:authorId" element={<AuthorView/>}/>
                            <Route path="/user/:userId" element={<ProfileView/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/login" element={<Login/>}/>
                            {/* Add more routes as needed */}
                        </Routes>
                    </main>
                </div>
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
