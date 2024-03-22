import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField} from '@mui/material';
import { MenuItem } from '@mui/material';
import { variables } from '../config/config';

interface UpdateDialogProps {
    open: boolean; // Indica si el diálogo está abierto o cerrado
    onClose: () => void; // Función para cerrar el diálogo
    selectedUserId: string; // ID del usuario seleccionado
    onUpdate: () => void; // Función para actualizar la lista de usuarios en el componente padre
}

export const UpdateDialog: React.FC<UpdateDialogProps> = ({ open, onClose, selectedUserId, onUpdate }) => {
    const [userData, setUserData] = useState<any>({}); // Estado para almacenar los datos del usuario
    const { API_KEY } = variables; // Clave de la API
    const API_URI = `https://dummyapi.io/data/v1/user/${selectedUserId}`; // URL de la API para obtener los datos del usuario

    useEffect(() => {
        if (!selectedUserId) return; // Si no hay un ID de usuario seleccionado, no hacer nada

        const fetchUserData = async () => {
            try {
                const response = await fetch(API_URI, {
                    headers: {
                        'Content-Type': 'application/json',
                        'app-id': API_KEY,
                    },
                });
                const data = await response.json();
                setUserData(data); // Actualizar los datos del usuario en el estado
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };

        fetchUserData(); // Obtener los datos del usuario al cargar el componente o al cambiar el ID de usuario seleccionado
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
            onUpdate(); // Actualizar la lista de usuarios en el componente padre
            onClose(); // Cerrar el diálogo
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
