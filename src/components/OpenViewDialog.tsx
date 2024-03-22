import { useEffect,useState} from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import {variables} from '../config/config';
interface OpenViewDialogProps {
    open: boolean;
    onClose: () => void;
    selectedUserId: string;
}








export const OpenViewDialog: React.FC<OpenViewDialogProps> = ({ open, onClose,selectedUserId }) => {

    const [selectedUserData,setSelectedUserData] = useState({});
    const {API_KEY} = variables;
    const API_URI = "https://dummyapi.io/data/v1/user/"


        useEffect(() => {

            const getUser = async (selectedUserId:string) => {
    
                try {
        
                    const response = await fetch(`${API_URI}${selectedUserId}`,{
                        headers:{
                            'Content-Type': 'application/json',
                            'app-id': API_KEY,
                        }
                    })
        
                    const data = await response.json()
                    setSelectedUserData(data)
               }
                catch(err) {
                    console.error(err)
                }
            }    

            getUser(selectedUserId);

        },[])
        
    
    
           
                
    


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>View User</DialogTitle>
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
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default OpenViewDialog;