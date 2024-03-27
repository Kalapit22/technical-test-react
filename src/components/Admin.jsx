import {TableCell,TableRow,Table,Input,Button,Box, TableHead, TableBody,Backdrop,CircularProgress} from '@mui/material';
import {Delete,Edit,Visibility} from '@mui/icons-material' ;
import { useUsers } from '../context/user.context.jsx';
import { Pagination } from './Pagination.jsx';
import {useState} from 'react';
import {ViewUser} from './ViewUser.jsx';
import { CreateUser } from './CreateUser.jsx';
import { UpdateUser } from './UpdateUser.jsx';
import { DeleteUser } from './DeleteUser.jsx';

export const Admin = () => {

    const {users,setCurrentUser} = useUsers();
    const [actualOperation,setActualOperation] = useState(null);
    const [isDialogOpen,setIsDialogOpen] = useState(false);
    const [filterId, setFilterId] = useState('');


    const titleTranslations = {
        'mr': 'Sr.',
        'mrs': 'Sra.',
        'ms': 'Srta.',
        'miss': 'Srta.'
      };
      

      
    const operations = {
        create:'create',
        view: 'view',
        edit: 'edit',
        delete:'delete'
    }


    const handleFilterChange = (e) => {
        setFilterId(e.target.value);
    };
    

    const handleClose = () => {
        setIsDialogOpen(false);
    };


    const handleViewUser = (userId) => {
        setActualOperation(operations.view);
        setCurrentUser(users.find(user => user.id === userId));
        setIsDialogOpen(true);
    }


    const handleCreateUser = () => {
        setActualOperation(operations.create)
        setIsDialogOpen(true);
    }


    const handleEditUser = (userId) => {
        setActualOperation(operations.edit)
        setCurrentUser(users.find(user => user.id === userId));
        setIsDialogOpen(true);
    }

    
    const handleDeleteUser = (userId) => {
        setActualOperation(operations.delete)
        setCurrentUser(users.find(user => user.id === userId));
        setIsDialogOpen(true);
    }




    return(

        <>
            {
                users.length === 0 && 
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            }


            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Input
                    type="text"
                    placeholder="Filter by ID"
                    value={filterId}
                    onChange={handleFilterChange}
                />
                <Button onClick={handleCreateUser}>Create</Button>
            </Box>



            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombres</TableCell>
                        <TableCell>Apellidos</TableCell>
                        <TableCell>Foto</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>

                            <TableBody>
                {users
                    .filter(user => filterId === '' || user.id.includes(filterId))
                    .map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell> {`${titleTranslations[user.title] || user.title} ${user.firstName} ${user.lastName}`}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell> <img src={user.picture} alt={user.firstName}/> </TableCell>
                            <TableCell>
                                <Visibility onClick={(e) => {handleViewUser(user.id)}} />
                                <Edit onClick={(e) => {handleEditUser(user.id)}} />
                                <Delete onClick={(e) => {handleDeleteUser(user.id)}}/>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>

            </Table>

            <Pagination />

            {actualOperation === operations.view && <ViewUser open={isDialogOpen}  handleClose={handleClose} />}
            {actualOperation === operations.create && <CreateUser open={isDialogOpen} handleClose={handleClose} />}
            {actualOperation === operations.edit && <UpdateUser open={isDialogOpen} handleClose={handleClose} />}
            {actualOperation === operations.delete && <DeleteUser open={isDialogOpen} handleClose={handleClose} />}
        </>
    )

}

