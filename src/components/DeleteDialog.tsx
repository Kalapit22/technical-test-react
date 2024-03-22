import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { variables } from '../config/config';

// Definición de los tipos de propiedades para el componente DeleteDialog
type DeleteDialogProps = {
    open: boolean; // Indica si el diálogo está abierto o cerrado
    close: () => void; // Función para cerrar el diálogo
    selectedUserId: string; // ID del usuario seleccionado para eliminar
    onUserDelete: any; // Función para manejar la eliminación del usuario
};

// Componente funcional DeleteDialog
export const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, close, selectedUserId, onUserDelete }) => {

    const { API_KEY } = variables; // Obtiene la API_KEY de la configuración
    const API_URI = "https://dummyapi.io/data/v1/user/"; // URL base de la API

    // Función para manejar la confirmación de eliminación del usuario
    const handleConfirm = async () => {

        try {
            // Realiza una solicitud DELETE a la API para eliminar el usuario seleccionado
            const response = await fetch(`${API_URI}${selectedUserId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'app-id': API_KEY,
                }
            });

            const data = await response.json();

            // Si la respuesta no es exitosa, lanza un error con el mensaje de la API
            if (response.status !== 200) {
                throw new Error(data.message)
            }

            // Muestra una alerta con el ID del usuario eliminado exitosamente
            alert(`El usuario se eliminó exitosamente con el ID: ${selectedUserId}`);
            onUserDelete(); // Llama a la función onUserDelete para actualizar la lista de usuarios
            close(); // Cierra el diálogo
        } catch (err) {
            console.error(err)
        }

        close(); // Cierra el diálogo
    };

    // Renderiza el componente del diálogo
    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent>
                <p>¿Está seguro de que desea eliminar el registro con el ID: {selectedUserId}?</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={close} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;