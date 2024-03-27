import { useUsers } from "../context/user.context";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from "@mui/material";

export const ViewUser = ({ open ,handleClose}) => {
  const { currentUser, APP_ID, setErrors, setCurrentUser } = useUsers();
  const API_URI = `https://dummyapi.io/data/v1/user/${currentUser.id}`;

  

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(API_URI, {
          headers: {
            "Content-Type": "application/json",
            "app-id": APP_ID,
          },
        });

        if (!response.ok) {
          setErrors((prevErrors) => [
            ...prevErrors,
            "An error has ocurred trying to obtain the user",
          ]);
          throw new Error("An error has ocurred trying to obtain the user");
        }

        const data = await response.json();
        setCurrentUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, [API_URI]);

return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ver usuario:</DialogTitle>
        <DialogContent>
            <p><strong>Nombre:</strong> {currentUser.firstName}</p>
            <p><strong>Apellido:</strong> {currentUser.lastName}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Teléfono:</strong> {currentUser.phone}</p>
            <p><strong>Fecha de nacimiento:</strong> {currentUser.dateOfBirth}</p>
            <p><strong>Género:</strong> {currentUser.gender}</p>
        </DialogContent>

        <DialogActions>
            <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
    </Dialog>
);
};
