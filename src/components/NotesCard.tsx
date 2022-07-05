import DialogDelete from "./DialogDelete";
import { Card, CardHeader, IconButton, Typography, Box } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const NotesCard = ({ note, handleDelete }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    
    return (
        <Card variant="elevation" sx={{maxWidth: 600, width: "100%"}}>
            <CardHeader title={
            <Typography variant="h4">
                <Link className="outside-link" to={"/create/notes"} 
                state={{ NoteTitle: note.title, markdownDef: note.content, uuid: note.id}}>{note.title}</Link>
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
                    handleDelete={() => {handleDelete(note.id, setOpenDialog)}} />
                </Box>
            } />
        </Card>
    );
};


export default NotesCard;