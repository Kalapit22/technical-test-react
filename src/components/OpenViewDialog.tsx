import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { variables } from '../config/config';

interface OpenViewDialogProps {
    open: boolean; // Indica si el diálogo está abierto o cerrado
    onClose: () => void; // Función para cerrar el diálogo
    selectedUserId: string; // ID del usuario seleccionado
}

export const OpenViewDialog: React.FC<OpenViewDialogProps> = ({ open, onClose, selectedUserId }) => {

    const [selectedUserData, setSelectedUserData] = useState({}); // Estado para almacenar los datos del usuario seleccionado
    const { API_KEY } = variables;
    const API_URI = "https://dummyapi.io/data/v1/user/";

    useEffect(() => {
        // Función asincrónica para obtener los datos del usuario
        const getUser = async (selectedUserId: string) => {

            try {
                // Realizar la solicitud a la API para obtener los datos del usuario
                const response = await fetch(`${API_URI}${selectedUserId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'app-id': API_KEY,
                    }
                });

                const data = await response.json(); // Convertir la respuesta en formato JSON
                setSelectedUserData(data); // Actualizar el estado con los datos del usuario
            }
            catch (err) {
                console.error(err);
            }
        }

        getUser(selectedUserId); // Llamar a la función para obtener los datos del usuario al cargar el componente

    }, []);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Ver Usuario</DialogTitle>
            <DialogContent>
                {selectedUserData && (
                    <div style={{ margin: '1rem', padding: '1rem' }}>
                        {Object.entries(selectedUserData).map(([key, value]) => (
                            <div key={key} className="d-flex" style={{ marginBottom: '0.5rem' }}>
                                <label style={{ fontWeight: 'bold' }}>{key}:</label>
                                <input type="text" value={value} disabled style={{ marginLeft: '0.5rem' }} />
                            </div>
                        ))}
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default OpenViewDialog;
