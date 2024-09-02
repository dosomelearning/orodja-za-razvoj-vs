import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Filter from '../components/Filter';
import ResultGrid from '../components/ResultGrid';
import ActionPanel from '../components/ActionPanel';
import Rent from '../components/Rent'; // Import the Rent component
import ModalYesNo from '../components/ModalYesNo';
import './Search.css';

interface Book {
    ID: string;
    Title: string;
    Author: string;
    Genre: string;
    RentDate: string;
    RentedUntil: string;
    Renter: {
        FirstName: string;
        Surname: string;
        Address: string;
        Age: number;
        Phone: string;
    };
}

const Search: React.FC = () => {
    const [filterCriteria, setFilterCriteria] = useState<{ filter: string; value: string }>({
        filter: 'all',
        value: '',
    });
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [selectedBookId, setSelectedBookId] = useState<string>('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isReturnModalOpen, setIsReturnModalOpen] = useState<boolean>(false);
    const [isRentModalOpen, setIsRentModalOpen] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [statusMessageColor, setStatusMessageColor] = useState<string>('black'); // Default color

    const navigate = useNavigate(); // Initialize useNavigate


    useEffect(() => {
        // Load data from localStorage
        const storedBooks = JSON.parse(localStorage.getItem('libraryData') || '[]');
        setBooks(storedBooks);
    }, []);

    useEffect(() => {
        // Filter books based on the selected criteria
        let result = books;

        if (filterCriteria.filter === 'all') {
            result = books;
        } else if (filterCriteria.filter === 'rented') {
            result = books.filter(book => book.RentDate !== '');
        } else if (filterCriteria.filter === 'available') {
            result = books.filter(book => book.RentDate === '');
        } else if (filterCriteria.filter === 'overdue') {
            const today = new Date();
            result = books.filter(
                book => book.RentedUntil && new Date(book.RentedUntil) < today
            );
        } else if (filterCriteria.filter === 'title') {
            result = books.filter(book =>
                book.Title.toLowerCase().includes(filterCriteria.value.toLowerCase())
            );
        } else if (filterCriteria.filter === 'id') {
            result = books.filter(book =>
                book.ID.toLowerCase().includes(filterCriteria.value.toLowerCase())
            );
        } else if (filterCriteria.filter === 'genre') {
            result = books.filter(book => book.Genre === filterCriteria.value);
        }

        console.log('Filtered Books:', result); // Debugging log
        setFilteredBooks(result);
    }, [filterCriteria, books]);

    const handleFilterChange = (filter: string, value: string) => {
        setFilterCriteria({ filter, value });
    };

    const handleSelectBook = (bookId: string) => {
        setSelectedBookId(bookId);
    };

    const handleDelete = () => {
        if (selectedBookId) {
            setIsDeleteModalOpen(true); // Open the delete modal
        } else {
            setStatusMessage('Please select a book to delete.');
        }
    };

    const handleReturn = () => {
        if (selectedBookId) {
            setIsReturnModalOpen(true); // Open the return modal
        } else {
            setStatusMessage('Please select a book to return.');
        }
    };

    const handleRent = () => {
        const selectedBook = books.find(book => book.ID === selectedBookId);
        if (selectedBook) {
            if (selectedBook.RentDate) {
                setStatusMessage('You cannot rent an already rented book!!');
                setStatusMessageColor('red'); // Set error color
            } else {
                setIsRentModalOpen(true); // Open the rent modal
            }
        } else {
            setStatusMessage('Please select a book to rent.');
            setStatusMessageColor('black'); // Reset to default color
        }
    };

    const handleEdit = () => {
        if (selectedBookId) {
            //navigate(`/book-management/${selectedBookId}`);
            const editUrl = `/book-management/${selectedBookId}`;
            window.open(editUrl, '_blank'); // Open in a new tab

        } else {
            setStatusMessage('Please select a book to edit.');
            setStatusMessageColor('black'); // Reset to default color
        }
    };

    const handleDeleteModalClose = (answer: boolean) => {
        setIsDeleteModalOpen(false);
        if (answer) {
            const updatedBooks = books.filter(book => book.ID !== selectedBookId);
            setBooks(updatedBooks);
            localStorage.setItem('libraryData', JSON.stringify(updatedBooks));
            setStatusMessage('Book deleted successfully.');
            setStatusMessageColor('black'); // Reset to default color
        } else {
            setStatusMessage('Book deletion canceled.');
            setStatusMessageColor('black'); // Reset to default color
        }
    };

    const handleReturnModalClose = (answer: boolean) => {
        setIsReturnModalOpen(false);
        if (answer) {
            const updatedBooks = books.map(book => {
                if (book.ID === selectedBookId) {
                    return {
                        ...book,
                        RentDate: '',
                        RentedUntil: '',
                        Renter: {
                            FirstName: '',
                            Surname: '',
                            Address: '',
                            Age: 0,
                            Phone: ''
                        }
                    };
                }
                return book;
            });
            setBooks(updatedBooks);
            localStorage.setItem('libraryData', JSON.stringify(updatedBooks));
            setStatusMessage('Book returned successfully.');
            setStatusMessageColor('black'); // Reset to default color
        } else {
            setStatusMessage('Book return canceled.');
            setStatusMessageColor('black'); // Reset to default color
        }
    };

    const handleRentModalClose = (save: boolean, updatedBook?: Book) => {
        setIsRentModalOpen(false);
        if (save && updatedBook) {
            const updatedBooks = books.map(book =>
                book.ID === updatedBook.ID ? updatedBook : book
            );
            setBooks(updatedBooks);
            localStorage.setItem('libraryData', JSON.stringify(updatedBooks));
            setStatusMessage('Book rented successfully.');
            setStatusMessageColor('black'); // Reset to default color
        } else {
            setStatusMessage('Book rental canceled.');
            setStatusMessageColor('black'); // Reset to default color
        }
    };

    return (
        <div className="search-page">
            <div className="search-page-top">
                <div className="search-page-filter">
                    <Filter onFilterChange={handleFilterChange} />
                </div>
                <div className="search-page-actions">
                    <ActionPanel
                        onEdit={handleEdit}
                        onRent={handleRent}
                        onReturn={handleReturn}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
            <div className="search-page-status-bar">
                <p style={{ color: statusMessageColor }}>{statusMessage}</p>
            </div>
            <div className="search-page-results">
                <ResultGrid books={filteredBooks} onSelectBook={handleSelectBook} />
            </div>
            {isDeleteModalOpen && (
                <ModalYesNo
                    question="Are you sure you want to delete this book?"
                    onClose={handleDeleteModalClose}
                />
            )}
            {isReturnModalOpen && (
                <ModalYesNo
                    question="Are you sure you want to return this book? It will delete dates and renter's data associated with the book and make the book available for borrowing again."
                    onClose={handleReturnModalClose}
                />
            )}
            {isRentModalOpen && (
                <Rent
                    book={books.find(book => book.ID === selectedBookId)!}
                    onClose={handleRentModalClose}
                />
            )}
        </div>
    );
};

export default Search;
