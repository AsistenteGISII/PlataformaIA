import { Box, Typography } from "@mui/material";
import { FavModelCard } from "../cards/favModelCard";
import AverageCalification from "../../../model_information/components/AverageCalification";
import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { UserContext } from "../../../../context/UserContext/UserContext";
import api from "../../../../context/UserContext/API";

interface User {
    fullname: string;
}

interface Model {
    model_name: string,
    autor: string,
    accuracy: number,
    score: number,
    small_description: string,
    version: number
    user: User[];
}

export const FavModels = () => {
    const [data, setdata] = useState<any>(null);
    const [noData, setNoData] = useState(false);

    const ContxValues = useContext(UserContext);
    const ID_USER = ContxValues?.user?.id;
    useEffect(() => {
        const getUserModels = async () => {
            try {
                const res = await api.get(`/favModel/${ID_USER}`)
                if (res.data.user === null || res.data.user.length === 0) {
                    setNoData(true);
                    setdata([]);
                    return;
                }
                setNoData(false);
                setdata(res.data.user.favModel);
            } catch (error) {
                console.error(error);
            }
        }
        getUserModels()
    }, []);

    return (
        <Box sx={{ display: "flex", flexDirection: 'column', flexGrow: 1 }} maxWidth="740px" borderRadius={'0 30px 0 0'}>
            <Box display="flex" alignItems="center" p={2} bgcolor={'#05254A'} sx={{borderRadius:{xs:'30px 30px 0 0', md:'0 30px 0 0'}}}>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Typography variant="h5" fontWeight="bold" color={'white'} >
                        Modelos Favoritos
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
                    <Typography>Este usuario no tiene modelos favoritos</Typography>
                </Box>
            ) : data ?(
                <Box
                    display="flex"
                    justifyContent="center"
                    flexWrap="wrap"
                    textAlign="left"
                    margin="auto"
                    marginTop={'30px'}
                    sx={{
                        height: 'auto', 
                        maxHeight: 510, 
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                    }}
                >
                    {data.map((item: Model, index: number) => (
                        <Box key={index} margin="auto" marginBottom="30px">
                            <FavModelCard
                                modelName={item.model_name}
                                grade={item.score}
                                precision={item.accuracy}
                                small_description={item.small_description}
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