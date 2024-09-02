// src/components/Sidebar.tsx

import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <aside className="app-sidebar">
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className={({isActive}) => (isActive ? 'active' : '')}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/search"
                            className={({isActive}) => (isActive ? 'active' : '')}
                        >
                            Search
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/book-management"
                            className={({isActive}) => (isActive ? 'active' : '')}
                        >
                            Manage books
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/data-management"
                            className={({isActive}) => (isActive ? 'active' : '')}
                        >
                            Data Management
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={({isActive}) => (isActive ? 'active' : '')}
                        >
                            About
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
