// src/components/Rent.tsx

import React, { useState, useEffect } from 'react';
import './Rent.css';

interface RentProps {
    book: {
        ID: string;
        Title: string;
        RentDate: string;
        RentedUntil: string;
        Renter: {
            FirstName: string;
            Surname: string;
            Address: string;
            Age: number;
            Phone: string;
        };
    };
    onClose: (save: boolean, updatedBook?: any) => void; // Callback to handle save or cancel
}

const Rent: React.FC<RentProps> = ({ book, onClose }) => {
    const [rentDate, setRentDate] = useState<string>('');
    const [rentedUntil, setRentedUntil] = useState<string>('');
    const [days, setDays] = useState<number>(14); // Default to 14 days
    const [renter, setRenter] = useState(book.Renter);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
        setRentDate(today);
        calculateRentedUntil(today, days);
    }, []);

    const calculateRentedUntil = (startDate: string, days: number) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + days);
        setRentedUntil(date.toISOString().split('T')[0]);
    };

    const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDays = parseInt(e.target.value);
        setDays(newDays);
        if (rentDate) {
            calculateRentedUntil(rentDate, newDays);
        }
    };

    const validate = (): boolean => {
        let valid = true;
        const newErrors: { [key: string]: string } = {}; // Change 'let' to 'const'

        if (!rentDate) {
            newErrors['rentDate'] = 'Rent date is required';
            valid = false;
        }

        if (!rentedUntil) {
            newErrors['rentedUntil'] = 'Rent until date is required';
            valid = false;
        }

        if (!renter.FirstName.trim()) {
            newErrors['FirstName'] = 'First name is required';
            valid = false;
        }

        if (!renter.Surname.trim()) {
            newErrors['Surname'] = 'Surname is required';
            valid = false;
        }

        if (!renter.Address.trim()) {
            newErrors['Address'] = 'Address is required';
            valid = false;
        }

        if (!renter.Phone.trim()) {
            newErrors['Phone'] = 'Phone number is required';
            valid = false;
        } else if (!/^\d+$/.test(renter.Phone)) {
            newErrors['Phone'] = 'Phone number must be numeric';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSave = () => {
        if (validate()) {
            const updatedBook = {
                ...book,
                RentDate: rentDate,
                RentedUntil: rentedUntil,
                Renter: renter,
            };
            onClose(true, updatedBook); // Pass the updated book back to the parent component
        }
    };

    const handleCancel = () => {
        onClose(false); // Close the modal without saving
    };

    const handleInputChange = (
        field: keyof typeof renter,
        value: string
    ) => {
        setRenter({
            ...renter,
            [field]: value,
        });
    };

    return (
        <div className="rent-overlay">
            <div className="rent-modal">
                <h2>Rent {book.Title}</h2>
                <div className="form-group">
                    <label>Rent Date:</label>
                    <input
                        type="date"
                        value={rentDate}
                        onChange={(e) => {
                            setRentDate(e.target.value);
                            calculateRentedUntil(e.target.value, days);
                        }}
                    />
                    {errors['rentDate'] && <p className="error">{errors['rentDate']}</p>}
                </div>
                <div className="form-group">
                    <label>Rent for N days:</label>
                    <input
                        type="number"
                        min="1"
                        max="30"
                        value={days}
                        onChange={handleDaysChange}
                    />
                </div>
                <div className="form-group">
                    <label>Rented Until:</label>
                    <input type="date" value={rentedUntil} readOnly />
                    {errors['rentedUntil'] && (
                        <p className="error">{errors['rentedUntil']}</p>
                    )}
                </div>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={renter.FirstName}
                        placeholder="Enter first name"
                        maxLength={100}
                        onChange={(e) => handleInputChange('FirstName', e.target.value)}
                    />
                    {errors['FirstName'] && (
                        <p className="error">{errors['FirstName']}</p>
                    )}
                </div>
                <div className="form-group">
                    <label>Surname:</label>
                    <input
                        type="text"
                        value={renter.Surname}
                        placeholder="Enter surname"
                        maxLength={100}
                        onChange={(e) => handleInputChange('Surname', e.target.value)}
                    />
                    {errors['Surname'] && (
                        <p className="error">{errors['Surname']}</p>
                    )}
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        value={renter.Address}
                        placeholder="Enter address"
                        maxLength={100}
                        onChange={(e) => handleInputChange('Address', e.target.value)}
                    />
                    {errors['Address'] && (
                        <p className="error">{errors['Address']}</p>
                    )}
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input
                        type="text"
                        value={renter.Phone}
                        placeholder="Enter phone number"
                        maxLength={100}
                        onChange={(e) => handleInputChange('Phone', e.target.value)}
                    />
                    {errors['Phone'] && (
                        <p className="error">{errors['Phone']}</p>
                    )}
                </div>
                <div className="button-group">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Rent;
