import { useState, useEffect, useContext } from 'react';
import { Box, Avatar, Button, Typography, TextField, IconButton, Tooltip } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CircularProgress from '@mui/material/CircularProgress';
import { UserContext } from '../../../../context/UserContext/UserContext';
import { styles } from '../../helpers/TextFieldStyle';
import Swal from 'sweetalert2';
import { ChangePassword } from '../ChangePassword';
import { getuser, updateUser } from '../../helpers/users';
import { validateFormData } from '../../helpers/validations';

const MyData = () => {
    const ContextValues = useContext(UserContext);
    const ID_USER = ContextValues?.user?.id;
    const [editable, setEditable] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [data, setData] = useState<any>(null);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showChangePassword, setShowChangePassword] = useState<boolean>(false);

    useEffect(() => {
        if (ID_USER) {
            const getUserData = async () => {
                try {
                    const res = await getuser(ID_USER);
                    setName(res.fullname);
                    setUsername(res.username);
                    setEmail(res.email);
                    setPassword(res.password);
                    setData(res);
                    setUpdated(false);
                } catch (error) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un problema al cargar el usuario, por favor inicie sesión o inténtelo más tarde.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    return;
                }
            };
            getUserData();
        }
    }, [updated, ID_USER]);
    

    const handleSave = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (!name || !username || !email ) {
            Swal.fire({
                title: 'Error',
                text: 'Todos los campos deben estar llenos',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const { validUName, validEmail, validPassword } = validateFormData(name, email, password);

        if (!validEmail || !validPassword || !validUName) {
            Swal.fire({
                icon: 'error',
                title: 'Datos inválidos',
                text: 'Uno o varios datos ingresados son inválidos.',
            });
            return;
        }

        try {
            if (ID_USER) {
                const response = await updateUser(ID_USER, name, username, email, password);
                ContextValues.login(response.data.user, response.data.token);
                Swal.fire({
                    icon: 'success',
                    title: '¡Edición exitosa!',
                    text: 'La información se ha editado correctamente.',
                });
                setUpdated(true);
            } else {
                console.error('User ID is undefined');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
        setEditable(false);
        setShowChangePassword(false);
    };

    const handleCancel = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (data) {
            setName(data.fullname);
            setUsername(data.username);
            setEmail(data.email);
            setPassword(data.password);
        }
        setEditable(false);
        setShowChangePassword(false);
    };

    const handleShowChangePassword = () => {
        setShowChangePassword(true);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: 'column', flexGrow: 1 }} maxWidth="740px" textAlign={"center"} >
            {data ? (
                <>
                    <Box display="flex" alignItems="center" p={2} bgcolor={'#05254A'} borderRadius={'0 30px 0 0'} justifyContent={'space-between'}>
                        <Box display="flex">
                            <Avatar sx={{ width: 60, height: 60, marginRight: 2 }} />
                            <Box textAlign={'left'}>
                                <Typography variant="h6" fontSize={18} fontWeight="bold" color={'white'} mb={1}>
                                {data.fullname}
                                </Typography>
                                <Typography fontSize={14} color={'white'}>
                                {data.username}
                                </Typography>
                            </Box>
                        </Box>                        
                        <Tooltip title="Editar perfil">
                            <IconButton onClick={()=>{setEditable(true)}} sx={{ color: '#ffffff' }}>
                                <BorderColorIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box sx={{
                        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '20px'
                    }}>
                        <Box>
                            <Box marginBottom={'3vh'}>
                                <Typography>Nombre de Usuario</Typography>
                                <TextField sx={styles}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={!editable}
                                    size="small" />
                            </Box>
                            <Box marginBottom={'3vh'}>
                                <Typography>Nombre Completo</Typography>
                                <TextField sx={styles} size="small" value={name} onChange={(e) => setName(e.target.value)} disabled={!editable} />
                            </Box>
                        </Box>
                        <Box>
                            <Box marginBottom={'3vh'}>
                                <Typography>Correo electrónico</Typography>
                                <TextField sx={styles} size="small" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!editable} type="email" />
                            </Box>
                            <Box marginBottom={'3vh'}>
                                <Typography>Fecha de ingreso</Typography>
                                <TextField sx={styles} size="small"
                                    value={data.date_joined}
                                    disabled={true} />
                            </Box>
                        </Box>
                    </Box>
                    <Box p={2} sx={{ display: 'flex', justifyContent: 'flex-end', gap:1 }}>
                        <Button variant="contained" color="primary" disabled={!editable} onClick={handleShowChangePassword}>
                            Cambiar contraseña
                        </Button>
                        <Button variant="contained" color="success" disabled={!editable} onClick={handleSave}>
                            Guardar
                        </Button>
                        <Button variant="contained" color="error" disabled={!editable} onClick={handleCancel}>
                            Cancelar
                        </Button>
                    </Box>
                    {showChangePassword && (
                        <Box sx={{ mt: 4, mb: 4, }}>
                            <ChangePassword setVisible={setShowChangePassword} />
                        </Box>                        
                    )}
                </>
            ) : (
                <CircularProgress />
            )}
        </Box>
    );
}
export { MyData }