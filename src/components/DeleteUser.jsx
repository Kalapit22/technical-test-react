import { useUsers } from "../context/user.context";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
export const DeleteUser = ({open,handleClose}) => {

    const {deleteUser,currentUser,APP_ID} = useUsers();
    const API_URI = `https://dummyapi.io/data/v1/user/${currentUser.id}`;


    const handleDelete = async () => {
        try {
            const response = await fetch(API_URI, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'app-id': APP_ID,
                },
            });

            if (!response.ok) {
                setErrors(prevErrors => [...prevErrors, "An error has ocurred trying to delete the user"]);
                throw new Error("An error has ocurred trying to delete the user");
            }

            deleteUser();
            handleClose();
        } catch (error) {
            console.error("Error deleting user", error);
        }
    }



    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent>
                <p>¿Está seguro de que desea eliminar el registro con el ID: {currentUser.id}?</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );





}


