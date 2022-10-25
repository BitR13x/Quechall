import DialogDelete from "../Dialogs/Delete";
import DialogPass from "../Dialogs/Pass";
import { Card, CardHeader, IconButton, Avatar, Typography, Box, Menu, MenuItem } from "@mui/material";
import { DeleteOutlined, ContentCopy } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { passwordsObj } from "../../types/global";

interface Props {
    password: passwordsObj,
    handleSavePass: any,
    handleDelete: any,
    GenerateRandomPass: any,
    decryptAES: (encrypted: string, masterpass: string) => string,
    masterpass: string,
    AvatarColor: string,
}

const PasswordCard = ({ password, handleSavePass, handleDelete, AvatarColor, GenerateRandomPass, masterpass }: Props) => {
    const [openDialogDel, setOpenDialogDel] = useState(false);
    const [openDialogPass, setOpenDialogPass] = useState(false);
    const [decodedContent, setDecodedContent] = useState("");

    //? Menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    const handleCopyIdentifier = () => {
        if (navigator.clipboard && password.name) navigator.clipboard.writeText(password.name);
    };
    const handleCopyPswd = () => {
        if (navigator.clipboard && decodedContent) navigator.clipboard.writeText(decodedContent);
    };

    const handleOpenDialogDel = () => setOpenDialogDel(true);
    const handleCloseDialogDel = () => setOpenDialogDel(false);

    const handleOpenDialogPass = () => setOpenDialogPass(true);
    const handleCloseDialogPass = () => setOpenDialogPass(false);

    return (
        <Card variant="elevation" sx={{ maxWidth: 600, width: "100%" }}>
            <CardHeader title={
                <Typography variant="h4">
                    <Link className="outside-link" to={"#"} onClick={handleOpenDialogPass}>{password.name}</Link>
                    <DialogPass
                        PasswdContent={password.content} identifierContent={password.name}
                        handleClose={handleCloseDialogPass} open={openDialogPass}
                        handleSavePass={handleSavePass} setOpenDialogPass={setOpenDialogPass}
                        GenerateRandomPass={GenerateRandomPass} uuid={password.id} setDecodedContent={setDecodedContent}
                        masterpass={masterpass}
                    />
                </Typography>
            }
                // subheader={
                // <Typography>
                //     {password.subheader}
                // </Typography>
                // } 
                avatar={
                    <Avatar variant="rounded" sx={{ bgcolor: AvatarColor }} alt="Alias">{password.name.substring(0, 2)}</Avatar>
                }
                action={
                    <Box>
                        <IconButton onClick={handleClickMenu}>
                            <ContentCopy />
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
                            handleDelete={() => { handleDelete(password.id, setOpenDialogDel) }} />

                    </Box>
                } />
        </Card>
    );
};


export default PasswordCard;