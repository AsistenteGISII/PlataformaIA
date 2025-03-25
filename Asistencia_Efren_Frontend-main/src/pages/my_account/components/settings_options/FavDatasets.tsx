import { Box, Typography } from "@mui/material";
import { FavDatasetCard } from "../cards/favDatasetCard";
import AverageCalification from "../../../model_information/components/AverageCalification";
import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { UserContext } from "../../../../context/UserContext/UserContext";
import api from "../../../../context/UserContext/API";

interface User {
    // Definir la estructura de cada objeto JSON en la lista
    fullname: string;
}

interface Dataset {
    dataset_name: string,
    autor: string,
    score: number,
    description: string,
    version: number
    user: User[];
}

export const FavDataset = () => {
    const [data, setdata] = useState<any>(null);
    const [noData, setNoData] = useState(false);

    const ContxValues = useContext(UserContext);
    const ID_USER = ContxValues?.user?.id;
    useEffect(() => {
        const getUserDatasets = async () => {
            try {
                const res = await api.get(`/favDataset/${ID_USER}`)
                if (res.data.user === null || res.data.user.length === 0) {
                    setNoData(true);
                    setdata([]);
                    return;
                }
                setNoData(false);
                setdata(res.data.user.favDatasets);
            } catch (error) {
                console.error(error);
            }
        }
        getUserDatasets()
    }, []);

    return (
        <Box sx={{ display: "flex", flexDirection: 'column', flexGrow: 1 }} maxWidth="740px" borderRadius={'0 30px 0 0'}>
            <Box display="flex" alignItems="center" p={2} bgcolor={'#05254A'} sx={{borderRadius:{xs:'30px 30px 0 0', md:'0 30px 0 0'}}}>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Typography variant="h5" fontWeight="bold" color={'white'} >
                        Datasets Favoritos
                    </Typography>
                </Box>
            </Box>
            {noData ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="50vh"
                    color={'#05254A'}
                >
                    <Typography>Este usuario no tiene datasets favoritos</Typography>
                </Box>
            ) : data ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    flexWrap="wrap"
                    textAlign="left"
                    margin="auto"
                    marginTop={'30px'}
                    sx={{
                        height: 'auto', // Altura automática para ajustarse al contenido
                        maxHeight: 510, // Altura máxima de la Box
                        overflowY: 'auto', // Añade scroll vertical si es necesario
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                    }}
                >
                    {data.map((item: Dataset, index: number) => (
                        <Box key={index} margin="auto" marginBottom="30px">
                            <FavDatasetCard
                                datasetName={item.dataset_name}
                                grade={item.score}
                                small_description={item.description}
                                autor={item.user[0].fullname} // Envía el nombre del autor como prop
                                version={item.version}
                            />
                        </Box>
                    ))}
                </Box>
            ) : (
                <CircularProgress />
            )}
        </Box>
    );
}