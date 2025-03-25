import React, { useContext } from 'react';
import { Grid, Card, CardContent, Box, Avatar, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import api from '../../../../context/UserContext/API';
import { UserContext } from '../../../../context/UserContext/UserContext';

interface FollowingCard {
    id: number;
    fullname: string;
    username: string;
    updateUserList: (id: number) => void;
}

const FollowingCard: React.FC<FollowingCard> = ({ id, fullname, username, updateUserList }) => {
    const ContxValues = useContext(UserContext);
    const ID_USER = ContxValues?.user?.id;
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    function verPerfil(id: any) {
        navigate(`../community/user_profile/${id}`);
    }

    const deleteUser = (idUser: number) => {
        Swal.fire({
            title: '¿Estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#05254A',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/follow/${ID_USER}/${idUser}`)
                    .then(response => {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha elimiando este usuario',
                            'success'
                        );
                        updateUserList(idUser)
                    })
                    .catch(error => {
                        Swal.fire(
                            'Error!',
                            'Hubo un problema al intentar eliminar este usaurio.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <Grid
            item
            xs={12}
            sm={12}
            md={12}
            key={id}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isSmallScreen ? 'center' : 'auto',
                justifyContent: 'center',
            }}
        >
            <Card sx={{ width: isSmallScreen ? '90%' : '100%' }}>
                <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <Avatar sx={{ bgcolor: 'gray', marginRight: 2 }}>
                                <AccountCircleIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="h6">{fullname}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {username}
                                </Typography>
                            </Box>
                        </Box>

                        {!isSmallScreen ? (
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Button
                                    variant="outlined"
                                    sx={{
                                        color: "#05254A",
                                        borderColor: '#05254A',
                                        marginRight: 1,
                                        display: isSmallScreen ? 'none' : 'block',
                                        '&:hover': {
                                            backgroundColor: "#034078",
                                            borderColor: '#034078',
                                            color: 'white'
                                        }
                                    }}
                                    onClick={() => verPerfil(id)}
                                >
                                    <VisibilityIcon sx={{ verticalAlign: 'middle', marginRight: '0.5vh' }} /> Ver Perfil
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        color: '#D52E10',
                                        backgroundColor: 'transparent',
                                        borderColor: '#D52E10',
                                        display: isSmallScreen ? 'none' : 'block',
                                        '&:hover': {
                                            backgroundColor: "#B71C1C",
                                            borderColor: '#B71C1C',
                                            color: 'white'
                                        }
                                    }}
                                    onClick={() => deleteUser(id)}
                                >
                                    <DeleteIcon sx={{ verticalAlign: 'middle', mr: '0.5vh' }} /> Eliminar
                                </Button>
                            </Box>
                        ) : (
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Button
                                    variant="outlined"
                                    sx={{
                                        color: "#05254A",
                                        borderColor: '#05254A',
                                        marginRight: 2,
                                        '&:hover': {
                                            backgroundColor: "#034078",
                                            borderColor: '#034078',
                                            color: 'white'
                                        }
                                    }}
                                    onClick={() => verPerfil(id)}
                                >
                                    <VisibilityIcon />
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        color: '#D52E10',
                                        backgroundColor: 'transparent',
                                        borderColor: '#D52E10',
                                        '&:hover': {
                                            backgroundColor: "#B71C1C",
                                            borderColor: '#B71C1C',
                                            color: 'white'
                                        }
                                    }}
                                    onClick={() => deleteUser(id)}
                                >
                                    <DeleteIcon />
                                </Button>
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );

};

export default FollowingCard;
