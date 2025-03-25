import { Box, Typography } from "@mui/material";
import { NewsCard } from "../cards/newsCard";
import AverageCalification from "../../../model_information/components/AverageCalification";
import React, { useState, useEffect, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import SpeedDialFAQS from "../../../../components/FAQs/SpeedDialFAQS";
import { UserContext } from "../../../../context/UserContext/UserContext";
import api from "../../../../context/UserContext/API";

interface Model {
    news_name: string;
    publish_date: string;
    score: number;
    cont_views: number;
    small_description: number;
    status: string;
}

export const News = () => {
    const [data, setdata] = useState<Model[]>([]);
    const [noData, setNoData] = useState(false);

    const ContxValues = useContext(UserContext);
    const ID_USER = ContxValues?.user?.id;

    useEffect(() => {
        const getUserModels = async () => {
            try {
                const res = await api.get(`/relationshipNew/${ID_USER}`)
                if (res.data.user === null || res.data.user.length === 0) {
                    setNoData(true);
                    setdata([]);
                    return;
                }

                setNoData(false);
                setdata(res.data.user.news);
            } catch (error) {
                console.error(error);
            }
        }
        getUserModels()
    }, []);

    return (
        <Box sx={{ display: "flex", flexDirection: 'column', flexGrow: 1 }} maxWidth="740px">
            <Box display="flex" alignItems="center" p={2} bgcolor={'#05254A'} sx={{ borderRadius: { xs: '30px 30px 0 0', md: '0 30px 0 0' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Typography variant="h5" fontWeight="bold" color={'white'} >
                        Noticias 
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
                    <Typography>Este usuario no ha publicado noticias</Typography>
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
                        <Box key={index} margin={"auto"} marginBottom={'30px'}>
                            <NewsCard
                                news_name={item.news_name}
                                publish_date={item.publish_date}
                                score={item.score}
                                cont_views={item.cont_views}
                                small_description={item.small_description}
                                status= {item.status}
                            />
                        </Box>

                    ))}
                </Box>
            ) : (
                <CircularProgress/>
            )}
        </Box>
    );
}