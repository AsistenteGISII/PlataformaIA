import { Box, Avatar, Typography, Tabs, Tab, Divider, useMediaQuery, useTheme} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Models from './components/modelsList';
import Dataset from './components/datasetsLits';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import api from '../../context/UserContext/API';

interface TabPanelProps {
    children: React.ReactNode;
    value: number;
    index: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
    return (
        <div hidden={value !== index}>
            {value === index && (
                <Box sx={{ p: 2 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function UserProfile() {
    const { id } = useParams();
    const safeId = id ?? 'defaultId';
    const [tabIndex, setTabIndex] = useState(0);
    const [data, setdata] = useState<any>(null);
    const [statistics, setstatistics] = useState<any>(null);
    const components = [
        <Models idUser={safeId} />,
        <Dataset idUser={safeId} />,
    ];
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await api.get(`/users/${id}`)
                setdata(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        getUserData()
    }, []);

    useEffect(() => {
        const getUsersstatistics = async () => {
            try {
                const res = await api.get(`/users/count/${safeId}`)
                setstatistics(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        getUsersstatistics()
    }, [data]);

    const handleTabChange = (_event: any, newValue: React.SetStateAction<number>) => {
        setTabIndex(newValue);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                flexDirection: { xs: 'column', sm: 'row' },
                marginTop: '64px',
            }}
        >
            <Box
                sx={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'start',
                    marginTop: '20px',
                    p: 2
                }}
            >
                {data && statistics ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: isSmallScreen ? '100%' : '40vh',
                            height:  isSmallScreen ? '100%' : '70vh',
                            alignItems: 'center',
                            justifyContent: 'start',
                            borderRadius: '30px',
                            border: '1px solid #ccc',
                            boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.1)',
                        }}>
                        <Avatar sx={{ width: 100, height: 100, mb: 1, mt: isSmallScreen ? 3 : 6 , bgcolor: '#05254A' }}>
                            <AccountCircleIcon sx={{ fontSize: 80, color: 'white' }} />
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                            {data.fullname}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {data.username}
                        </Typography>
                        <Box sx={{
                            textAlign: 'left',
                            width: '30vh',
                            marginTop: '15px'
                        }}>                            
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginTop: '10px'
                                }}
                            >
                                <CalendarMonthIcon sx={{ marginRight: '5px', color: theme.palette.text.secondary }} />
                                <Typography variant="body2" sx={{ lineHeight: '1.5', verticalAlign: 'middle', marginTop: '2px' }} color="textSecondary">
                                    Se unió el {data.date_joined}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginTop: '20px'
                                }}
                            >
                                <PsychologyOutlinedIcon sx={{ marginRight: '5px', color: theme.palette.text.secondary }} />
                                <Typography variant="body2" sx={{ lineHeight: '1.5', verticalAlign: 'middle' }} color="textSecondary">
                                    Modelos publicados {statistics.models}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginTop: '12px'
                                }}
                            >
                                <TableChartOutlinedIcon sx={{ marginRight: '5px', color: theme.palette.text.secondary }} />
                                <Typography variant="body2" sx={{ lineHeight: '1.5', verticalAlign: 'middle' }} color="textSecondary">
                                    Sets de datos publicados {statistics.datasets}
                                </Typography>
                            </Box>
                            
                        </Box>
                    </Box>
                ) : (
                    <CircularProgress />
                )}
            </Box>

            <Box
                sx={{
                    flex: '2',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                    overflowY: { xs: 'visible', sm: 'visible' },
                }}
            >
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab label="Modelos" />
                    <Tab label="Set de Datos" />
                </Tabs>
                <Divider />

                {components.map((component, index) => (
                    <TabPanel key={index} value={tabIndex} index={index}>
                        {component}
                    </TabPanel>
                ))}
            </Box>
        </Box>
    );
}