// src/components/ActionPanel.tsx

import React from 'react';

interface ActionPanelProps {
    onEdit: () => void;
    onRent: () => void;
    onReturn: () => void;
    onDelete: () => void;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ onEdit, onRent, onReturn, onDelete}) => {
    return (
        <div className="action-panel">
            <button onClick={onEdit}>Edit</button>
            <button onClick={onRent}>Rent</button>
            <button onClick={onReturn}>Return</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default ActionPanel;
