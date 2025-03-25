import { Box, Typography } from "@mui/material";
import { ModelCard } from "../cards/modelCard";
import { useState, useEffect, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { UserContext } from "../../../../context/UserContext/UserContext";
import { getMyModels } from "../../helpers/models";

interface Model {
    id: number;
    model_name: string;
    accuracy: number;
    score: number;
    small_description: string;
    status: string;
    privated: boolean;
}

export const ValuedModels = () => {
    const [data, setdata] = useState<any>(null);
    const [noData, setNoData] = useState(false);

    const ContxValues = useContext(UserContext);
    const ID_USER = ContxValues?.user?.id;
    
    useEffect(() => {
        const getUserModels = async () => {
            try {
                if (!ID_USER) return;
                const res = await getMyModels(Number(ID_USER));
                const models = res.data.user.models;
                if (!models || models.length === 0) {
                    setNoData(true);
                    setdata([]);
                    return;
                }
                setNoData(false);
                setdata(models);
            } catch (error) {
                console.error(error);
            }
        };
        getUserModels();
    }, [ID_USER]);

    return (
        <Box sx={{ display: "flex", flexDirection: 'column', flexGrow: 1 }} maxWidth="740px" borderRadius={'0 30px 0 0'}>
            <Box display="flex" alignItems="center" p={2} bgcolor={'#05254A'} sx={{ borderRadius: { xs: '30px 30px 0 0', md: '0 30px 0 0' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Typography variant="h5" fontWeight="bold" color={'white'}>
                        Modelos
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
                    <Typography>Este usuario no ha publicado modelos</Typography>
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
                    {data.map((item: Model, index: number) => (
                        <Box key={index} margin={"auto"} marginBottom={'30px'}>
                            <ModelCard
                                id={item.id}
                                modelName={item.model_name}
                                score={item.score}
                                precision={item.accuracy}
                                small_description={item.small_description}
                                status={item.status}
                                privated={item.privated}
                            />
                        </Box>
                    ))}
                </Box>
            ) : (
                <CircularProgress />
            )}
        </Box>
    );
};
