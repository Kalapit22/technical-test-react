import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField} from '@mui/material';
import { MenuItem } from '@mui/material';
import { variables } from '../config/config';

interface UpdateDialogProps {
    open: boolean;
    onClose: () => void;
    selectedUserId: string;
    onUpdate: () => void; 
}

export const UpdateDialog: React.FC<UpdateDialogProps> = ({ open, onClose, selectedUserId, onUpdate }) => {
    const [userData, setUserData] = useState<any>({});
    const { API_KEY } = variables;
    const API_URI = `https://dummyapi.io/data/v1/user/${selectedUserId}`;

    useEffect(() => {
        if (!selectedUserId) return;

        const fetchUserData = async () => {
            try {
                const response = await fetch(API_URI, {
                    headers: {
                        'Content-Type': 'application/json',
                        'app-id': API_KEY,
                    },
                });
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };

        fetchUserData();
    }, [selectedUserId, open]); 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(API_URI, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'app-id': API_KEY,
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) throw new Error('Failed to update user');
            alert('User updated successfully');
            onUpdate(); // Refresca la lista de usuarios en el componente padre
            onClose();
        } catch (error) {
            console.error("Error updating user", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                {Object.entries(userData).map(([key, value]) => {
                    if (key === 'gender') {
                        return (
                            <TextField
                                key={key}
                                margin="dense"
                                label={key}
                                select
                                fullWidth
                                variant="outlined"
                                name={key}
                                value={value || ''}
                                onChange={handleChange}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </TextField>
                        );
                    } else if (key === 'title') {
                        return (
                            <TextField
                                key={key}
                                margin="dense"
                                label={key}
                                select
                                fullWidth
                                variant="outlined"
                                name={key}
                                value={value || ''}
                                onChange={handleChange}
                            >
                                <MenuItem value="mr">Mr</MenuItem>
                                <MenuItem value="mrs">Mrs</MenuItem>
                                <MenuItem value="ms">Ms</MenuItem>
                                <MenuItem value="miss">Miss</MenuItem>
                            </TextField>
                        );
                    } else {
                        return (
                            <TextField
                                key={key}
                                margin="dense"
                                label={key}
                                type="text"
                                fullWidth
                                variant="outlined"
                                name={key}
                                value={value || ''}
                                onChange={handleChange}
                            />
                        );
                    }
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save Changes</Button>
            </DialogActions>
        </Dialog>
    );
};
