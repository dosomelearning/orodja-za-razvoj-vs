// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Get the root element from the DOM
const container = document.getElementById('root');

// Create a root.
const root = ReactDOM.createRoot(container!); // The `!` tells TypeScript that container is non-null.

// Initial render
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
