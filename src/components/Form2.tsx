import { useEffect, useState } from "react";
import { variables } from "../config/config";
import { Delete, Edit } from "@mui/icons-material";
import { titleTranslations } from "../data/translations";
import { UserDialog } from "./UserDialog";
export const Form2 = () => {
  const { API_KEY, API_URL, APP_ID } = variables;

  const [user, setUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // Estado para rastrear el usuario seleccionado para editar

  // Dentro de tu componente Form2

  // ... (El resto de tu componente)

  const handleOpenCreateDialog = () => {
    setShowCreateModal(true);
    setShowEditModal(false);
  };

  const handleOpenEditDialog = (user) => {
    setSelectedUser(user); // `setSelectedUser` es un nuevo estado que necesitarías para rastrear el usuario seleccionado para editar
    setShowEditModal(true);
  };



  

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`${API_URL}/limit=10`, {
        headers: {
          "Content-Type": "application/json",
          "app-id": API_KEY,
        },
      });

      const data = await response.json();

      setUsers(data.data);
    };

    getUsers();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateUser = (e: React.MouseEvent) => {};

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filteredUsers = user.filter((user: any) => {
    const fullName = `${
      titleTranslations[user.title as keyof typeof titleTranslations] ||
      user.title
    } ${user.firstName} ${user.lastName}`;
    return fullName.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col d-flex">
            <label htmlFor="findUser">Buscar usuario</label>
            <input
              type="text"
              name="findUser"
              id="findUser"
              className="form-control"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col">
            <button className="btn btn-primary" onClick={handleCreateUser}>
              Crear
            </button>
          </div>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Foto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="">
          {filteredUsers.map((user: any) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{`${
                titleTranslations[
                  user.title as keyof typeof titleTranslations
                ] || user.title
              } ${user.firstName}`}</td>
              <td>{user.lastName}</td>
              <td>
                <div className="img-container w-100">
                  <img
                    className="img img-fluid mw-100 mh-100px"
                    src={user.picture}
                    alt={user.fistName}
                    style={{ maxHeight: "200px" }}
                  ></img>
                </div>
              </td>
              <td>
                <Delete />
                <Edit />
              </td>
            </tr>
          ))}
        </tbody>

        <UserDialog
          open={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSave={handleSaveUser}
        />
        <UserDialog
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveUser}
          user={selectedUser} // Pasar el usuario seleccionado al diálogo
        />
        
        

        {/* // Pagination */}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Siguiente
          </button>
        </div>
      </table>
    </>
  );
};
