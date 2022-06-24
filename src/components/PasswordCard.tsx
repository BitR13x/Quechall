import DialogDelete from "./DialogDelete";
import DialogPass from "./DialogPass";
import { Card, CardHeader, IconButton, Avatar, Typography, Box, Menu, MenuItem } from "@mui/material";
import { DeleteOutlined, ContentCopy } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";

const PasswordCard = ({ password }) => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openDialogPass, setOpenDialogPass] = React.useState(false);
    //? Menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);
    
    const handleCopyIdentifier = () => {
        if (navigator.clipboard && password.identifier) navigator.clipboard.writeText(password.identifier);
    };
    const handleCopyPswd = () => {
        if (navigator.clipboard && password.pswd) navigator.clipboard.writeText(password.pswd);
    };

    const handleDelete = () => {
        axios.post("/delete/password/" + password.id)
             .then(response => console.log(response))
    };

    const handleOpenDialogDel = () => setOpenDialog(true);
    const handleCloseDialogDel = () => setOpenDialog(false);

    const handleOpenDialogPass = () => setOpenDialogPass(true);
    const handleCloseDialogPass = () => setOpenDialogPass(false);
    
    return (
        <Card variant="elevation" sx={{ maxWidth: 600, width: "100%" }}>
            <CardHeader title={
            <Typography variant="h4">
                <Link className="outside-link" to={"#"} onClick={handleOpenDialogPass}>{password.title}</Link>
                <DialogPass 
                    PasswdContent={password.pswd} identifierContent={password.identifier} 
                    handleClose={handleCloseDialogPass} open={openDialogPass}  
                />
            </Typography>
            } 
            subheader={
            <Typography>
                {password.subheader}
            </Typography>
            } 
            avatar={
                <Avatar variant="rounded" sx={{ bgcolor: password.color }} alt="Alias">{password.title.substring(0,2)}</Avatar>
            }  
            action={
                <Box>
                    <IconButton onClick={handleClickMenu}>
                        <ContentCopy/>
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleCloseMenu}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={handleCopyPswd}>Copy password</MenuItem>
                      <MenuItem onClick={handleCopyIdentifier}>Copy identifier</MenuItem>
                    </Menu>

                    <IconButton onClick={handleOpenDialogDel}>
                        <DeleteOutlined />
                    </IconButton>
                    <DialogDelete open={openDialog} 
                    handleClose={handleCloseDialogDel} 
                    handleDelete={handleDelete} />
                    
                </Box>
            } />
        </Card>
    );
};


export default PasswordCard;