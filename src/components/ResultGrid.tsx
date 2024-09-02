import React, { useState } from 'react';

interface Book {
    ID: string;
    Title: string;
    Author: string;
    Genre: string;
    RentDate: string;
    RentedUntil: string;
    Renter?: { // Mark Renter as optional
        FirstName: string;
        Surname: string;
    };
}

interface ResultGridProps {
    books: Book[];
    onSelectBook: (bookId: string) => void;
}

const ResultGrid: React.FC<ResultGridProps> = ({ books, onSelectBook }) => {
    const [selectedBookId, setSelectedBookId] = useState<string>('');

    const handleSelect = (bookId: string) => {
        setSelectedBookId(bookId);
        onSelectBook(bookId);
    };

    return (
        <div className="result-grid">
            {books.length === 0 ? (
                <p>No books available.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Select</th>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Date Rented</th>
                        <th>Date Due</th>
                        <th>Renter Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((book, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedBookId === book.ID}
                                    onChange={() => handleSelect(book.ID)}
                                />
                            </td>
                            <td>{book.ID}</td>
                            <td>{book.Title}</td>
                            <td>{book.Author}</td>
                            <td>{book.Genre}</td>
                            <td>{book.RentDate}</td>
                            <td>{book.RentedUntil}</td>
                            <td>
                                {book.Renter
                                    ? `${book.Renter.FirstName} ${book.Renter.Surname}`
                                    : 'N/A'}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ResultGrid;
