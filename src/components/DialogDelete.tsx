import { Dialog, DialogTitle, DialogContent, 
    DialogContentText, DialogActions, Button } from "@mui/material";
import React from "react";

const DialogDelete = ({ open, handleClose, handleDelete }) => {
    return (
        <Dialog onClose={handleClose} open={open} fullWidth>
            <div style={{ backgroundColor: "#131515"}}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        If you delete this you can't get it back.
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}

export default DialogDelete;