import DialogDelete from "./DialogDelete";
import DialogPass from "./DialogPass";
import { Card, CardHeader, IconButton, Avatar, Typography, Box, Menu, MenuItem } from "@mui/material";
import { DeleteOutlined, ContentCopy } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const PasswordCard = ({ password, handleSavePass, handleDelete, AvatarColor, GenerateRandomPass }) => {
    const [openDialogDel, setOpenDialogDel] = useState(false);
    const [openDialogPass, setOpenDialogPass] = useState(false);
    //? Menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);
    
    const handleCopyIdentifier = () => {
        if (navigator.clipboard && password.identifier) navigator.clipboard.writeText(password.identifier);
    };
    const handleCopyPswd = () => {
        if (navigator.clipboard && password.pswd) navigator.clipboard.writeText(password.pswd);
    };

    const handleOpenDialogDel = () => setOpenDialogDel(true);
    const handleCloseDialogDel = () => setOpenDialogDel(false);

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
                    handleSavePass={handleSavePass} setOpenDialogPass={setOpenDialogPass}
                    GenerateRandomPass={GenerateRandomPass}
                />
            </Typography>
            } 
            subheader={
            <Typography>
                {password.subheader}
            </Typography>
            } 
            avatar={
                <Avatar variant="rounded" sx={{ bgcolor: AvatarColor }} alt="Alias">{password.title.substring(0,2)}</Avatar>
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
                    <DialogDelete open={openDialogDel} 
                    text="this"
                    handleClose={handleCloseDialogDel} 
                    handleDelete={() => {handleDelete(password.id, setOpenDialogDel)}} />
                    
                </Box>
            } />
        </Card>
    );
};


export default PasswordCard;