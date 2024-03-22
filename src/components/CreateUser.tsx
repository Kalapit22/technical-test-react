    import React, { useState,useEffect } from 'react';
    import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem } from '@mui/material';
    import { z } from 'zod';
    import { variables } from '../config/config';

    const schema = z.object({
        title: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        gender: z.string(),
        email: z.string().email(),
        phone: z.string().regex(/^\d+$/),
    });

    interface CreateUserProps {
        open: boolean;
        onClose: () => void;
        onCreate: () => void;
    }

    export const CreateUser = ({ open, onClose,onCreate }: CreateUserProps) => {
        const { API_KEY } = variables;
        const API_URI = "https://dummyapi.io/data/v1/user/create";

        const [formData, setFormData] = useState({
            title: '',
            firstName: '',
            lastName: '',
            picture: '',
            gender: '',
            email: '',
            phone: '',
        });

        useEffect(() => {
            const randomParam = Math.random();
            const pictureUrl = formData.gender === 'male' 
                ? `https://xsgames.co/randomusers/avatar.php?g=male&random=${randomParam}` 
                : `https://xsgames.co/randomusers/avatar.php?g=female&random=${randomParam}`;
        
            setFormData(prevData => ({
                ...prevData,
                picture: pictureUrl
            }));
        }, [formData.gender]);
        

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value;
        
            setFormData((prevData) => ({
                ...prevData,
                [e.target.name]: value,
            }));
        };

        const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
            setFormData((prevData) => ({
                ...prevData,
                [e.target.name as string]: e.target.value as string,
            }));
        };

        const handleSubmit = async () => {
            try {
                schema.parse(formData);
                console.log('Form submitted:', formData);

                const response = await fetch(`${API_URI}`, {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json',
                        'app-id': API_KEY,
                    },
                });

                const data = await response.json();

                if (response.status !== 200) {
                    throw new Error(data.message);
                }
                alert('User created successfully');
                onCreate();
                onClose();
            } catch (error) {
                console.error('Form validation error:', error);
            }
        };

        

        return (
            <>
            <Dialog open={open} onClose={onClose} style={{ margin: '20px' }}>
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
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
            </>
        );
    };