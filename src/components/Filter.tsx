// src/components/Filter.tsx

import React, { useState } from 'react';

interface FilterProps {
    onFilterChange: (filter: string, value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [genre, setGenre] = useState<string>('');

    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
        setSearchQuery(''); // Reset search query on filter change
        setGenre(''); // Reset genre on filter change
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value;
        if (selectedFilter === 'title' || selectedFilter === 'id') {
            setSearchQuery(value);
        } else if (selectedFilter === 'genre') {
            setGenre(value);
        }
    };

    const handleSearch = () => {
        const value = selectedFilter === 'genre' ? genre : searchQuery;
        onFilterChange(selectedFilter, value);
    };

    return (
        <div className="filter">
            <div className="filter-top-section">
                <label>
                    <input
                        type="radio"
                        name="filter"
                        value="all"
                        checked={selectedFilter === 'all'}
                        onChange={() => handleFilterChange('all')}
                    />
                    All
                </label>
                <label>
                    <input
                        type="radio"
                        name="filter"
                        value="available"
                        checked={selectedFilter === 'available'}
                        onChange={() => handleFilterChange('available')}
                    />
                    Available
                </label>
                <label>
                    <input
                        type="radio"
                        name="filter"
                        value="rented"
                        checked={selectedFilter === 'rented'}
                        onChange={() => handleFilterChange('rented')}
                    />
                    Rented
                </label>
                <label>
                    <input
                        type="radio"
                        name="filter"
                        value="overdue"
                        checked={selectedFilter === 'overdue'}
                        onChange={() => handleFilterChange('overdue')}
                    />
                    Overdue
                </label>
            </div>

            <div className="filter-bottom-section">
                <label>
                    <input
                        type="radio"
                        name="filter"
                        value="title"
                        checked={selectedFilter === 'title'}
                        onChange={() => handleFilterChange('title')}
                    />
                    Title
                    <input
                        type="text"
                        value={selectedFilter === 'title' ? searchQuery : ''}
                        onChange={handleInputChange}
                        disabled={selectedFilter !== 'title'}
                    />
                </label>
                <label>
                    <input
                        type="radio"
                        name="filter"
                        value="id"
                        checked={selectedFilter === 'id'}
                        onChange={() => handleFilterChange('id')}
                    />
                    ID
                    <input
                        type="text"
                        value={selectedFilter === 'id' ? searchQuery : ''}
                        onChange={handleInputChange}
                        disabled={selectedFilter !== 'id'}
                    />
                </label>
                <label>
                    <input
                        type="radio"
                        name="filter"
                        value="genre"
                        checked={selectedFilter === 'genre'}
                        onChange={() => handleFilterChange('genre')}
                    />
                    Genre
                    <select
                        value={selectedFilter === 'genre' ? genre : ''}
                        onChange={handleInputChange}
                        disabled={selectedFilter !== 'genre'}
                    >
                        <option value="">Select Genre</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="History">History</option>
                        <option value="Poetry">Poetry</option>
                        <option value="Cooking">Cooking</option>
                    </select>
                </label>
            </div>
            <button className="search-button" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};

export default Filter;
