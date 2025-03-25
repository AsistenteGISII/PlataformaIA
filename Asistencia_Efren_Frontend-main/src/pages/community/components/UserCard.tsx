import React from 'react';
import { Grid, Card, CardContent, Box, Avatar, Typography, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface UserCardProps {
    id: number;
    fullname: string;
    username: string;
    verPerfil: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ id, fullname, username, verPerfil }) => {
    return (
        <Grid item xs={12} sm={6} md={6} key={id}>
            <Card>
                <CardContent>
                    <Box display="flex" alignItems="center">
                        <Avatar sx={{ bgcolor: 'gray', marginRight: 2 }}>
                            <AccountCircleIcon />
                        </Avatar>
                        <Box>
                            <Typography variant="h6">{fullname}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                @{username}
                            </Typography>
                        </Box>
                    </Box>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            marginTop: 2,
                            backgroundColor: "#05254A",
                            '&:hover': {
                                backgroundColor: "#034078",
                            }
                        }}
                        onClick={() => verPerfil(id)}
                    >
                        Ver Perfil
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default UserCard;
