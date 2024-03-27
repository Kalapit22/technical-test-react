import { Box, Button } from "@mui/material";
import { useUsers } from "../context/user.context";

export const Pagination = () => {
    const { setCurrentPage, currentPage, totalPages } = useUsers();

    return(
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button 
                onClick={() => setCurrentPage(prevCurrentPage => Math.max(prevCurrentPage - 1, 1))}
                disabled={currentPage === 1} 
            >
                Anterior
            </Button>
            <Button 
                onClick={() => setCurrentPage(prevCurrentPage => Math.min(prevCurrentPage + 1, totalPages))}
                disabled={currentPage === totalPages} 
            >
                Siguiente
            </Button>
        </Box>
    );
};
