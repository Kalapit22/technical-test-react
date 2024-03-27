import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField} from '@mui/material';
import { MenuItem } from '@mui/material';
import { useUsers } from '../context/user.context';


export const UpdateUser  = ({ open ,handleClose}) => {
 
    const {currentUser,setCurrentUser,APP_ID,updateUser,setErrors} = useUsers();
    const API_URI = `https://dummyapi.io/data/v1/user/${currentUser.id}`; 

  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser(prevState => ({...prevState,[name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(API_URI, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'app-id': APP_ID,
                },
                body: JSON.stringify(currentUser),
            });

            if (!response.ok) {
                setErrors(prevErrors => [...prevErrors, "An error has ocurred trying to update the user"]);
                throw new Error("An error has ocurred trying to update the user");
            }

            setCurrentUser(currentUser);
            updateUser(currentUser);
            handleClose();
        } catch (error) {
            console.error("Error updating user", error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                {Object.entries(currentUser).map(([key, value]) => {
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
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save Changes</Button>
            </DialogActions>
        </Dialog>
    );
};
