import { useEffect, useState } from 'react';
import { variables } from '../config/config';
import { Delete, Edit } from '@mui/icons-material'; // Fix: Import the missing icons
import { titleTranslations } from '../data/translations';
import { OpenViewDialog } from './OpenViewDialog';
import { DeleteDialog } from './DeleteDialog';
import { CreateUser } from './CreateUser';
import { UpdateDialog } from './UpdateDialog';
import { Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';


export const Form2 = () => {
    const { API_KEY, API_URL } = variables;

    const [users, setUsers] = useState<any[]>([]); // Fix: Define the type of the 'users' state variable

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [userDeleted, setUserDeleted] = useState(false);
    const [createUser, setCreateUser] = useState(false);
    const [onCreate, setOnCreate] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [userUpdated,setUserUpdated] = useState(false);


    const handleEditUser = (userId: string): void => {
        setSelectedUser(userId);
        setOpenUpdateDialog(true);
    };

    const handleUserUpdated = () => {
        setOpenUpdateDialog(false);
        setUserUpdated(true);
    };

    const handleViewUser = (userId: string): void => {
        setSelectedUser(userId);
        setOpenViewDialog(true);
    };

    const handleDeleteUser = (userId: string): void => {
        setSelectedUser(userId);
        setDeleteDialog(true);
    };

    const handleCreateUser = () => {
        setCreateUser(true);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const filteredUsers = users.filter((user: any) => {
        const fullName = `${titleTranslations[user.title as keyof typeof titleTranslations] || user.title} ${user.firstName} ${user.lastName}`;
        return fullName.toLowerCase().includes(searchValue.toLowerCase());
    });

    useEffect(() => {
        if (!deleteDialog && userDeleted) {
            setUsers(users.filter((user) => user.id !== selectedUser));
            setUserDeleted(false);
        }
    }, [deleteDialog, userDeleted, users, selectedUser, createUser]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetch(`${API_URL}?/limit=10`, {
                headers: {
                    'Content-Type': 'application/json',
                    'app-id': API_KEY,
                },
            });

            const data = await response.json();

            setUsers(data.data);
        };

        getUsers();
    }, [currentPage, onCreate, userDeleted,userUpdated]);

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col d-flex">
                        <label htmlFor="findUser">Buscar usuario por nombre o apellido</label>
                        <input type="text" name="findUser" id="findUser" className="form-control" value={searchValue} onChange={handleSearchChange} />
                    </div>
                    <div className="col">
                        <Button variant="contained" color="primary" onClick={handleCreateUser}>
                            Crear
                        </Button>
                    </div>
                </div>
            </div>

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
                    {filteredUsers.map((user: any) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{`${titleTranslations[user.title as keyof typeof titleTranslations] || user.title} ${user.firstName}`}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>
                                <div className="img-container w-100">
                                    <img className="img img-fluid mw-100 mh-100px" src={user.picture} alt={user.fistName} style={{ maxHeight: '200px' }}></img>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Delete onClick={() => handleDeleteUser(user.id)} />
                                <Edit onClick={() => handleEditUser(user.id)} />
                                <Button onClick={() => handleViewUser(user.id)}>View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="pagination d-flex justify-content-between">
                <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Anterior
                </Button>
                <Button onClick={() => handlePageChange(currentPage + 1)}>Siguiente</Button>

                <div className="">Total de usuarios: {users.length}</div>
            </div>

            

            {openViewDialog && <OpenViewDialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} selectedUserId={selectedUser} />}
            {deleteDialog && <DeleteDialog open={deleteDialog} close={() => setDeleteDialog(false)} selectedUserId={selectedUser} onUserDelete={() => setUserDeleted(true)} />}
            {createUser && <CreateUser open={createUser} onClose={() => setCreateUser(false)} onCreate={() => setOnCreate((prev) => !prev)} />}
            {openUpdateDialog && <UpdateDialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)} onUpdate={handleUserUpdated} selectedUserId={selectedUser} />}
        </div>
    );
};

