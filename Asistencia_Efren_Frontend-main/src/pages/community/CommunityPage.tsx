import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid,Typography, TextField, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import SpeedDialFAQS from '../../components/FAQs/SpeedDialFAQS';
import { UserContext } from '../../context/UserContext/UserContext';
import UserCard from './components/UserCard';
import api from '../../context/UserContext/API';

interface UserData {
    id: number;
    username: string;
    fullname: string;
}

const Community = () => {
    const [data, setData] = useState<UserData[]>([]);
    const [filteredData, setFilteredData] = useState<UserData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const ContxValues = useContext(UserContext);
    const ID_USER = ContxValues?.user?.id;

    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await api.get(`/users/community/${ID_USER}`);
                setData(res.data);
                setFilteredData(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getUserData();
    }, [ID_USER]);

    useEffect(() => {
        if (!loading) {
            setFilteredData(
                data.filter((item) =>
                    item.fullname.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, data, loading]);

    const verPerfil = (id: number) => {
        navigate(`./user_profile/${id}`);
    };

    return (
        <>
            <Box marginTop={'90px'}>
                <Box
                    margin='10px auto'
                    padding={'10px'}
                    width={isSmallScreen ? '90%' : '1000px'}
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
                                width: isSmallScreen ? '100%' : '400px'
                            }
                        }}
                        fullWidth={isSmallScreen}
                    />
                </Box>
                <Box
                    margin='20px auto'
                    padding={'10px'}
                    width={isSmallScreen ? '90%' : '1000px'}
                    sx={{
                        maxHeight: isSmallScreen ? '600px' : '600px',
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
                    <Grid container spacing={3}>
                        {loading ? (
                            <Typography variant="h6" align="center">Cargando...</Typography>
                        ) : (
                            filteredData.map((user) => (
                                <UserCard
                                    key={user.id}
                                    id={user.id}
                                    fullname={user.fullname}
                                    username={user.username}
                                    verPerfil={verPerfil}
                                />
                            ))
                        )}
                    </Grid>
                </Box>
            </Box>
            <SpeedDialFAQS />
        </>
    );
};

export default Community;
