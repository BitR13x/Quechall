import { Card, CardHeader, IconButton, Avatar, Typography } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";

const NotesCard = ({ note }) => {
    const colorName = ["aqua", "blue", "green", "lime", "maroon", "navy", "olive",
    "purple", "red", "silver", "teal", "white", "yellow"]
    let colorRandom = colorName[Math.floor(Math.random()*colorName.length)];
    
    const handleDelete = () => {
        axios.post("/delete/password" + note.id)
             .then(response => console.log(response))
    }
    return (
        <Card variant="elevation" sx={{width: 600}}>
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
            avatar={
                <Avatar sx={{ bgcolor: colorRandom }} alt="Alias">{note.title.substring(0,2)}</Avatar>
            }  
            action={
                <IconButton onClick={handleDelete}>
                    <DeleteOutlined />
                </IconButton>
            } />
        </Card>
    );
};


export default NotesCard;