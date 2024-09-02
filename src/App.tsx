// src/App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Search from './pages/Search';
import BookManagementPage from "./pages/BookManagementPage";
import DataManagementPage from "./pages/DataManagementPage";

const App: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const enterEditMode = () => setIsEditMode(true);
  const exitEditMode = () => setIsEditMode(false);

  return (
      <Router>
        <div className="app">
          <Header />
          <div className="content-area">
            {!isEditMode && <Sidebar />} {/* Conditionally render Sidebar */}
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<Search />} />
                <Route
                    path="/book-management"
                    element={<BookManagementPage onEnterEditMode={enterEditMode} onExitEditMode={exitEditMode} />}
                />
                <Route
                    path="/book-management/:bookId"
                    element={<BookManagementPage onEnterEditMode={enterEditMode} onExitEditMode={exitEditMode} />}
                />                <Route path="/data-management" element={<DataManagementPage />} />

                {/* Add more routes here as needed */}
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
  );
};

export default App;
