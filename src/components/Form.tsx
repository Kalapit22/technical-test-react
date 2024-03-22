import React, { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';


interface User {
    id: number;
    name: string;
    email: string;
}

const Form: React.FC = () => {
    const [userId, setUserId] = useState<number>(0);
    const [users, setUsers] = useState<User[]>([]);

    const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(Number(event.target.value));
    };

    const handleCreateUser = () => {
        // Implement your logic to create a new user here
    };

    const handleDeleteUser = (id: number) => {
        // Implement your logic to delete a user here
    };

    const handleEditUser = (id: number) => {
        // Implement your logic to edit a user here
    };

    const handleViewUser = (id: number) => {
        // Implement your logic to view a user in detail here
    };

    return (
        <div>
            <TextField
                label="User ID"
                value={userId}
                onChange={handleUserIdChange}
            />
            <Button variant="contained" color="primary" onClick={handleCreateUser}>
                Create
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteUser(user.id)}>
                                        <Delete />
                                    </IconButton>
                                    <IconButton onClick={() => handleEditUser(user.id)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleViewUser(user.id)}>
                                        <Visibility />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Form;