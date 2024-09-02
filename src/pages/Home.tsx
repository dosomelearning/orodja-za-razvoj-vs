// src/pages/Home.tsx

import React from 'react';
import {BrowserRouter as Router, Link, NavLink, Route} from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
            <h2>Home Page</h2>
            <p>Welcome to the library app!</p>
            <nav>
            <p>You can load and clear demo data by choosing{' '}
                <NavLink
                    to="/data-management"
                    className={({isActive}) => (isActive ? 'active' : '')}
                >
                     Data Management
                </NavLink>
                {' '}- this will not prevent you from adding
                or removing all data from the app.</p>
            </nav>

            <p>All data loaded or added is stored in your LocalStorage section of your web browser. It will automatically get reset after you close the browser.</p>
        </div>
    );
};

export default Home;
