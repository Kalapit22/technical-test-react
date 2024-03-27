import {createContext,useEffect,useState,useContext} from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [users,setUsers] = useState([]);
    const [errors,setErrors] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [currentUser,setCurrentUser] = useState(null);
    const [reloadUsers,setReloadUsers] = useState(false);


    const  API_URI =  `https://dummyapi.io/data/v1/user?page=${currentPage}&limit=10`;
    const  APP_ID =  '6601eaa1d689f83e0c08d507';
    const totalPages = 10;

    useEffect(() => {

        const getUsers = async () => {
            try {
                const response = await fetch(API_URI,{
                    headers:{
                        'Content-Type':'application/json',
                        'app-id':APP_ID
                    }
                })

                if(!response.ok) {
                    setErrors(prevErrors => [...prevErrors,"An error has ocurred with the request trying to obtain users"]);
                    console.error('Occurio un error')
                    throw new Error(`An error with the request has ocurred`);
                    
                }

                const data = await response.json()
                setUsers(data.data);


            } catch(err){
                console.error(err)
            }
        }
            getUsers();

    },[currentPage,reloadUsers])


    const createUser = (newUser) => {
        setReloadUsers(prevState => !prevState);
    }

    const deleteUser = () => {
        setReloadUsers(prevState => !prevState);
    }

    const updateUser = () => {
        setReloadUsers(prevState => !prevState)
    }

  

    const value = {
        users,
        errors,
        setErrors,
        createUser,
        updateUser,
        deleteUser,
        setCurrentPage,
        currentUser,
        setCurrentUser,
        totalPages,
        API_URI,
        APP_ID
    }


    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}


export const useUsers = () => {
    const context =  useContext(UserContext)
    if(!context) {
        throw new Error(['useUsers must be used withian a UserProvider']);
    }
    return context;
}
