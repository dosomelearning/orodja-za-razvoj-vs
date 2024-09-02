import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookManagementPage.css';


interface BookManagementPageProps {
    onExitEditMode: () => void;
    onEnterEditMode: () => void;  // Add this prop to handle entering edit mode
}

const BookManagementPage: React.FC<BookManagementPageProps> = ({ onExitEditMode, onEnterEditMode }) => {
    const { bookId } = useParams<{ bookId: string }>(); // Get book ID from URL params
    const navigate = useNavigate(); // To redirect after save/cancel
    const [book, setBook] = useState({
        ID: '',
        Title: '',
        Author: '',
        Genre: '',
        PageNumbers: '',
        Available: false,
        RentDate: '',
        RentedUntil: '',
        ISBNCode: '',
        FrontPageImageFilename: '',
        Renter: {
            FirstName: '',
            Surname: '',
            Address: '',
            Age: 0,
            Phone: ''
        }
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [statusMessage, setStatusMessage] = useState<string>('');

    useEffect(() => {
        if (bookId) {
            // Call enterEditMode when the component mounts
            onEnterEditMode();
            // Editing an existing book
            const storedBooks = JSON.parse(localStorage.getItem('libraryData') || '[]');
            const bookToEdit = storedBooks.find((b: any) => b.ID === bookId);
            if (bookToEdit) {
                setBook(bookToEdit);
            } else {
                setStatusMessage('Book not found.');
            }
        } else {
            // Adding a new book
            console.log("No bookId parameter")
            const generatedId = Date.now().toString();
            setBook((prevBook) => ({ ...prevBook, ID: generatedId }));
        }
        return () => {
            onExitEditMode(); // Call this function when the component unmounts
        };
    }, [bookId, onEnterEditMode, onExitEditMode]);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setBook(prevBook => ({
            ...prevBook,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle file selection for the front page image
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 200 * 1024) { // 200kb limit
                alert('File size exceeds 200kb. Please select a smaller file.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setBook(prevBook => ({ ...prevBook, FrontPageImageFilename: reader.result as string }));
                    setStatusMessage('Image uploaded successfully!');
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = (): boolean => {
        let valid = true;
        const newErrors: { [key: string]: string } = {};

        if (!book.ID || book.ID === '0') {
            newErrors['ID'] = 'ID is required and cannot be zero';
            valid = false;
        }

        if (!book.Title.trim()) {
            newErrors['Title'] = 'Title is required';
            valid = false;
        }

        if (!book.Author.trim()) {
            newErrors['Author'] = 'Author is required';
            valid = false;
        }

        if (!book.Genre) {
            newErrors['Genre'] = 'Genre is required';
            valid = false;
        }

        if (!book.PageNumbers || parseInt(book.PageNumbers) <= 0) {
            newErrors['PageNumbers'] = 'Page Numbers must be greater than zero';
            valid = false;
        }

        if (!book.ISBNCode.trim()) {
            newErrors['ISBNCode'] = 'ISBN Code is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Handle form submission
    const handleSubmit = () => {
        if (validate()) {
            const storedBooks = JSON.parse(localStorage.getItem('libraryData') || '[]');
            let updatedBooks;

            if (bookId) {
                updatedBooks = storedBooks.map((b: any) => (b.ID === book.ID ? book : b));
            } else {
                updatedBooks = [...storedBooks, book];
            }

            localStorage.setItem('libraryData', JSON.stringify(updatedBooks));
            setStatusMessage('Book data saved successfully!');
//            if (bookId) navigate('/search'); // Redirect back to the search page when editing
            if (bookId) window.close() // close the tab
        } else {
            setStatusMessage('Please fix the errors before saving.');
        }
    };

    // Handle add another book action
    const handleAddAnother = () => {
        setBook({
            ID: Date.now().toString(),
            Title: '',
            Author: '',
            Genre: '',
            PageNumbers: '',
            Available: false,
            RentDate: '',
            RentedUntil: '',
            ISBNCode: '',
            FrontPageImageFilename: '',
            Renter: {
                FirstName: '',
                Surname: '',
                Address: '',
                Age: 0,
                Phone: ''
            }
        });
        setErrors({});
        setStatusMessage('Ready to add another book.');
    };

    // Handle cancel action
    const handleCancel = () => {
//        navigate('/search'); // Redirect back to the search page
        onExitEditMode(); // Call this when the user cancels editing
        if (bookId) window.close() // close the tab
        setStatusMessage('Action canceled.');
    };

    return (
        <div className="book-management-page">
            <div className="content-container">
                <div className="input-fields-panel">
                    <div className="form-group">
                        <label htmlFor="ID">ID:</label>
                        <input
                            type="text"
                            id="ID"
                            name="ID"
                            value={book.ID}
                            onChange={handleChange}
                            readOnly={!!bookId} // Read-only if editing
                            placeholder="Auto-generated ID"
                        />
                        {errors['ID'] && <p className="error">{errors['ID']}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="Title">Title:</label>
                        <input
                            type="text"
                            id="Title"
                            name="Title"
                            value={book.Title}
                            onChange={handleChange}
                            maxLength={100}
                            required
                            placeholder="Enter book title"
                        />
                        {errors['Title'] && <p className="error">{errors['Title']}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="Author">Author:</label>
                        <input
                            type="text"
                            id="Author"
                            name="Author"
                            value={book.Author}
                            onChange={handleChange}
                            maxLength={100}
                            required
                            placeholder="Enter author's name"
                        />
                        {errors['Author'] && <p className="error">{errors['Author']}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="Genre">Genre:</label>
                        <select
                            id="Genre"
                            name="Genre"
                            value={book.Genre}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Genre</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Software Engineering">Software Engineering</option>
                            <option value="History">History</option>
                            <option value="Poetry">Poetry</option>
                            <option value="Cooking">Cooking</option>
                        </select>
                        {errors['Genre'] && <p className="error">{errors['Genre']}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="PageNumbers">Page Numbers:</label>
                        <input
                            type="number"
                            id="PageNumbers"
                            name="PageNumbers"
                            value={book.PageNumbers}
                            onChange={handleChange}
                            min="1"
                            required
                            placeholder="Enter number of pages"
                        />
                        {errors['PageNumbers'] && <p className="error">{errors['PageNumbers']}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="Available">Can be taken home - rented:</label>
                        <input
                            type="checkbox"
                            id="Available"
                            name="Available"
                            checked={book.Available}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ISBNCode">ISBN Code:</label>
                        <input
                            type="text"
                            id="ISBNCode"
                            name="ISBNCode"
                            value={book.ISBNCode}
                            onChange={handleChange}
                            required
                            placeholder="Enter ISBN code"
                        />
                        {errors['ISBNCode'] && <p className="error">{errors['ISBNCode']}</p>}
                    </div>
                </div>
                <div className="image-panel">
                    {book.FrontPageImageFilename ? (
                        <img src={book.FrontPageImageFilename} alt="Book cover" />
                    ) : (
                        <p>No image uploaded</p>
                    )}
                    <input
                        type="file"
                        id="FrontPageImageFilenameUpload"
                        name="FrontPageImageFilenameUpload"
                        accept="image/*"
                        onChange={handleFileUpload}
                    />
                </div>
            </div>
            <div className="status-bar">
                <p>{statusMessage}</p>
            </div>
            <div className="button-panel">
                <button onClick={handleSubmit}>Save</button>
                {!bookId && <button onClick={handleAddAnother}>Add Another</button>}
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default BookManagementPage;
