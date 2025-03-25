import { Box, Grid, TextField, TablePagination, Typography } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { UserContext } from '../../../../context/UserContext/UserContext';
import FollowingCard from '../cards/followingCard';
import CircularProgress from '@mui/material/CircularProgress';
import api from '../../../../context/UserContext/API';
import Swal from 'sweetalert2';

interface UserData {
    id: number;
    username: string;
    fullname: string;
}

export const Following = () => {
    const [data, setData] = useState<UserData[]>([]);
    const [filteredData, setFilteredData] = useState<UserData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);

    const ContxValues = useContext(UserContext);
    const ID_USER = ContxValues?.user?.id;

    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await api.get(`/follow/${ID_USER}`)

                if (res.data === null || res.data.length === 0) {
                    setLoading(false);
                    setNoData(true);
                    setData([]);
                    return;
                }

                setData(res.data);
                setFilteredData(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        getUserData()
    }, []);

    useEffect(() => {
        if (!loading) {
            setFilteredData(data.filter((item: UserData) =>
                item.fullname.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        }
    }, [searchTerm, data, loading]);


    const updateUserList = (idToDelete: number) => {
        setFilteredData(filteredData.filter((user) => user.id !== idToDelete));
    };

    return (
        <Box sx={{ display: "flex", flexDirection: 'column', flexGrow: 1 }} maxWidth="740px" textAlign={"center"}>
            <Box display="flex" alignItems="center" p={2} bgcolor={'#05254A'} sx={{ borderRadius: { xs: '30px 30px 0 0', md: '0 30px 0 0' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Typography variant="h5" fontWeight="bold" color={'white'} >
                        Usuarios Seguidos
                    </Typography>
                </Box>
            </Box>
            <Box>
                <Box
                    margin='20px auto' padding={'10px'} textAlign={'left'}
                >
                    <TextField
                        label="Buscar por Nombre"
                        variant="outlined"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        InputProps={{
                            startAdornment: (
                                <SearchIcon />
                            ),
                            style: {
                                borderRadius: '15px',
                                width: '400px'
                            }
                        }}
                    />
                </Box>
                <Box
                    margin='20px auto'
                    padding={'10px'}
                    sx={{
                        maxHeight: '400px',
                        overflowY: 'scroll',
                        '&::-webkit-scrollbar': {
                            width: 0,
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0,0,0,.1)',
                            borderRadius: '10px',
                        },
                    }}
                >
                    {loading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : noData ? (
                        <Box
                            display="flex"
                            justifyContent="center"
                            color={'#05254A'}
                        >
                            <Typography>No se encontraron usarios seguidos</Typography>
                        </Box>
                    ) : (
                        <Grid container spacing={3}>
                            {loading ? (
                                <CircularProgress />
                            ) : (
                                filteredData.map((user) => (
                                    <FollowingCard
                                        key={user.id}
                                        id={user.id}
                                        fullname={user.fullname}
                                        username={user.username}
                                        updateUserList={updateUserList}
                                    />
                                ))
                            )}
                        </Grid>
                    )}
                </Box>
            </Box>
        </Box>

    );
}