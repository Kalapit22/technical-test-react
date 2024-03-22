import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import {variables} from '../config/config';


type DeleteDialogProps = {
    open: boolean;
    close: () => void;
    selectedUserId: string;
    onUserDelete:any;
};

export const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, close, selectedUserId,onUserDelete }) => {

        const {API_KEY} = variables;
        const API_URI = "https://dummyapi.io/data/v1/user/";


    const handleConfirm = async () => {

        try {
             
            const response = await fetch(`${API_URI}${selectedUserId}`,{
                method:'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    'app-id': API_KEY,
                }
            });

            const data = await response.json();
            
            if(response.status !== 200) {
                throw new Error(data.message)
            }            

            alert(`El usuario se elimino exitosamente con el ID: ${selectedUserId}`)
            onUserDelete();
            close();
        } catch(err) {
            console.error(err)
        }
        
        close();
    };





    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent>
                <p>Esta seguro que quiere borrar el registro con el ID: {selectedUserId}?</p>
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