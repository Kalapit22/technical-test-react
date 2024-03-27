import {z} from 'zod';
import {useState} from 'react';
import {Dialog,DialogTitle,DialogContent,TextField,Select,MenuItem,DialogActions,Button} from '@mui/material';
import { useUsers } from '../context/user.context';

export const CreateUser = ({open,handleClose}) => {

    const userSchema = {
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        picture: '',
        gender: '',
    }


    const [formData,setFormData] = useState(userSchema);

    const schema = z.object({
        title: z.string(),
        firstName: z.string().min(6),
        lastName: z.string().min(6),
        email: z.string().email(),
        picture: z.string().url(),
        gender: z.enum,
    })


    const {createUser,APP_ID,setErrors} = useUsers();
    const API_URI = 'https://dummyapi.io/data/v1/user/create';

    const handleChange = (event) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

    const handleSelectChange = (event) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }
    

    const handleSubmit = async () => {

        try {
            const response = await fetch(API_URI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'app-id': APP_ID,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                setErrors(prevErrors => [...prevErrors, "An error has ocurred trying to create the user"]);
                throw new Error("An error has ocurred trying to create the user");
            }

            createUser();
            handleClose();
        } catch (error) {
            console.error("Error creating user", error);
        }
    }

    return(
        <>
        <Dialog open={open} onClose={handleClose} style={{ margin: '20px' }}>
            <DialogTitle>Create User</DialogTitle>
            <DialogContent style={{ padding: '20px' }}>
                <Select
                    label="Title"
                    name="title"
                    variant='outlined'
                    value={formData.title}
                    onChange={handleSelectChange}
                    fullWidth
                    style={{ marginBottom: '10px' }}
                >
                    <MenuItem value="mr">mr</MenuItem>
                    <MenuItem value="ms">ms</MenuItem>
                    <MenuItem value="mrs">mrs</MenuItem>
                    <MenuItem value="miss">miss</MenuItem>
                </Select>
                <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                    style={{ marginBottom: '10px' }}
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                    style={{ marginBottom: '10px' }}
                />

                <Select
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleSelectChange}
                    fullWidth
                    style={{ marginBottom: '10px' }}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </Select>
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    style={{ marginBottom: '10px' }}
                />

                <TextField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    style={{ marginBottom: '10px' }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    </>   );
}