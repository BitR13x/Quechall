import DialogDelete from "./DialogDelete";
import { Card, CardHeader, IconButton, Typography, Box } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";

const NotesCard = ({ note }) => {
    const [openDialog, setOpenDialog] = React.useState(false);
    //? Menu

    const handleDelete = () => {
        axios.post("/delete/notes/" + note.id)
             .then(response => console.log(response))
    };

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    
    return (
        <Card variant="elevation" sx={{maxWidth: 600, width: "100%"}}>
            <CardHeader title={
            <Typography variant="h4">
                <Link className="outside-link" to={note.link}>{note.title}</Link>
            </Typography>
            } 
            subheader={
            <Typography>
                {note.subheader}
            </Typography>
            }
            action={
                <Box>
                    <IconButton onClick={handleOpenDialog}>
                        <DeleteOutlined />
                    </IconButton>
                    <DialogDelete open={openDialog}
                    text="this"
                    handleClose={handleCloseDialog} 
                    handleDelete={handleDelete} />
                </Box>
            } />
        </Card>
    );
};


export default NotesCard;