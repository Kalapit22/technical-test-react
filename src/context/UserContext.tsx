import React, { createContext, useState, useEffect } from 'react';
import { variables } from '../config/config';

const {API_KEY,API_URL} = variables;


// Create a new context
export const UserContext = createContext<any>(null);

// Create a provider component
export const UserProvider: React.FC = ({ children:any }) => {
    const [users, setUsers] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetch(`${API_URL}/limit=10`, {
                headers: {
                    'Content-Type': 'application/json',
                    'app-id': API_KEY,
                },
            });

            const data = await response.json();

            setUsers(data.data);
        };

        getUsers();
    }, []);

    return (
        <UserContext.Provider
            value={{
                users,
                setUsers,
                showCreateModal,
                setShowCreateModal,
                showEditModal,
                setShowEditModal,
                currentPage,
                setCurrentPage,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};