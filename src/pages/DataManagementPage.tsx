// src/pages/DataManagementPage.tsx

import React, { useState }  from 'react';
import './DataManagementPage.css'; // Import the CSS file
import data from '../data/books.json'; // Import the JSON data file


const DataManagementPage: React.FC = () => {
    const [message, setMessage] = useState<string>(''); // State to manage the feedback message


    const handleDataLoad = () => {
        // Extract only the books data from the JSON
        const booksData = data.books;
        // Save the books data to localStorage
        localStorage.setItem('libraryData', JSON.stringify(booksData));
        console.log('Books data loaded into localStorage:', booksData);
        // Update the message state to notify the user
        setMessage('Books data loaded successfully.');
    };

    const handleDataClear = () => {
        // Placeholder for editing a book
        localStorage.removeItem('libraryData');
        console.log('Data cleared from localStorage');
        // Update the message state to notify the user
        setMessage('Books data cleared successfully.');
    };

    return (
        <div className="form-container">
            <h2>Data Management</h2>
            <p>You can load and clear preset data here.</p>
            <div className="button-group">
                <button onClick={handleDataLoad}>Load data</button>
            </div>
            <div className="button-group">
                <button onClick={handleDataClear}>Clear data</button>
            </div>
            {/* Feedback message label */}
            <div className="feedback-message">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default DataManagementPage;

