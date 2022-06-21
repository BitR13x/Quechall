import { Card, CardHeader, IconButton, Avatar, Typography, Box, Menu, MenuItem } from "@mui/material";
import { DeleteOutlined, ContentCopy } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";

const NotesCard = ({ note }) => {
    //? Menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    //? Delete
    const handleDelete = () => {
        axios.post("/delete/password" + note.id)
             .then(response => console.log(response))
    };
    const handleCopy = () => {
        
    };
    
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
                <Avatar sx={{ bgcolor: note.color }} alt="Alias">{note.title.substring(0,2)}</Avatar>
            }  
            action={
                <Box>
                    <Box>
                        <IconButton onClick={handleClick}>
                            <ContentCopy/>
                        </IconButton>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }}
                        >
                          <MenuItem onClick={handleCopy}>Copy password</MenuItem>
                          <MenuItem onClick={handleCopy}>Copy identifier</MenuItem>
                        </Menu>
                    </Box>

                    <IconButton onClick={handleDelete}>
                        <DeleteOutlined />
                    </IconButton>
                </Box>
            } />
        </Card>
    );
};


export default NotesCard;