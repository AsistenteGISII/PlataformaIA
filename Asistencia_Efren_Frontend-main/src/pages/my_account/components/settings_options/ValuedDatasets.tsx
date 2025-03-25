import { Box, Typography } from "@mui/material";
import { DatasetCard } from "../cards/datasetCard";
import React, { useState, useEffect, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { UserContext } from "../../../../context/UserContext/UserContext";
import api from "../../../../context/UserContext/API";
import { getMyDatasets } from "../../helpers/datasets";

interface Dataset {
    id: number,
    dataset_name: string,
    description: string,
    score: string,
    status: string,
    privated:boolean,
}

export const ValuedDatasets = () => {
    const [data, setdata] = useState<any>(null);
    const [noData, setNoData] = useState(false);
    const ContxValues = useContext(UserContext);
    const ID_USER = ContxValues?.user?.id;
    useEffect(() => {
        const getUserDatasets = async () => {
            try {
                if(!ID_USER)
                    return;
                const res = await getMyDatasets(ID_USER);
                const datasets = res.data.user.datasets;
                if (!datasets || datasets.length === 0) {
                    setNoData(true);
                    setdata([]);
                    return;
                }
                setNoData(false);
                setdata(datasets);
            } catch (error) {
                console.error(error);
            }
        }
        getUserDatasets()
    }, []);

    return(
        <Box sx={{ display: "flex", flexDirection: 'column', flexGrow: 1 }} maxWidth="740px">
            <Box display="flex" alignItems="center" p={2} bgcolor={'#05254A'} sx={{borderRadius:{xs:'30px 30px 0 0', md:'0 30px 0 0'}}}>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Typography variant="h5" fontWeight="bold" color={'white'} >
                        Datasets 
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
                    <Typography>Este usuario no ha publicado datasets</Typography>
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
                    overflowX: 'hidden', 
                    '&::-webkit-scrollbar': {
                        width: '5px', 
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f1f1f1', 
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888', 
                        borderRadius: '4px',
                        transition: 'width 0.2s ease', 
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#bbb', 
                        width: '14px', 
                    }
                }}
                >
                {data.map((item: Dataset, index : number) => (
                    <Box key={index} margin={"auto"} marginBottom={'30px'}>
                        <DatasetCard
                            id={item.id}
                            description={item.description}
                            dataset_name={item.dataset_name}
                            score={item.score}
                            status= {item.status}
                            privated= {item.privated}
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