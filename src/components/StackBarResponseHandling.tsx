import { Snackbar, Alert } from "@mui/material";

const StackBarResponseHandling = ({snackBarStatus, setSnackBarStatus}) => {
    const handleCloseSnacBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setSnackBarStatus({open: false, message: "", severity: false});
    };

    return (
        <Snackbar open={snackBarStatus.open} autoHideDuration={4000} onClose={handleCloseSnacBar}>
            <Alert onClose={handleCloseSnacBar} severity={snackBarStatus.severity ? "success" : "error"} sx={{ width: '100%' }}>
                {snackBarStatus.message}
            </Alert>
        </Snackbar>
    );
}

export default StackBarResponseHandling;