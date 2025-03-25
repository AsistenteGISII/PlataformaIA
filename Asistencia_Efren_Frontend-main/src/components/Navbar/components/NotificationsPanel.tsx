import React, { useState, useEffect, useContext } from 'react';
import { Badge, IconButton, Menu, Tabs, Tab, Typography, Divider, List, Card, CardContent, CardActions, Box, MenuItem, Switch, FormControlLabel } from '@mui/material';
import { Notifications, Delete } from '@mui/icons-material';
import DatasetIcon from '@mui/icons-material/Dataset';
import PsychologyIcon from '@mui/icons-material/Psychology';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ForumIcon from '@mui/icons-material/Forum';
import PeopleIcon from '@mui/icons-material/People';
import BugReportIcon from '@mui/icons-material/BugReport';
import { getNotificationsByUser, getAllNotifications, deleteNotification, clearNotifications, clearAllNotifications } from '../api/notifications';
import io from 'socket.io-client';
import { UserContext } from '../../../context/UserContext/UserContext';

type NotificationCategory = 'MODEL' | 'DATASET' | 'NEW' | 'TICKET';

type Notification = {
  message: string;
  id: number;
  date: string;
  time: string;
  category: NotificationCategory;
  id_user: number;
  to_admin: boolean;
};

type Notifications = {
  MODEL: Notification[];
  DATASET: Notification[];  
  NEW: Notification[];
  TICKET: Notification[];
};

export const NotificationsPanel = () => {
  const ContxValues = useContext(UserContext);
  const USER_ROLE = ContxValues?.user.user_role;
  const USER_ID = ContxValues?.user.id;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tabValue, setTabValue] = useState<NotificationCategory>('MODEL');
  const [isAdminFilter, setIsAdminFilter] = useState(false); // Estado para el filtro de admin
  const [contNotificationsUser, setContNotificationsUser] = useState<number>(0);
  const [contNotificationsAdmin, setContNotificationsAdmin] = useState<number>(0);

  const [notifications, setNotifications] = useState<Notifications>({
    MODEL: [],
    DATASET: [],    
    NEW: [],
    TICKET: []
  });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userNotifications = await getNotificationsByUser(USER_ID);
        const notificationsByCategory: Notifications = {
          MODEL: [],
          DATASET: [],          
          NEW: [],
          TICKET: [],
        };
        if (USER_ROLE == 'ADMIN') {
          const allNotifications = await getAllNotifications();
          setContNotificationsAdmin(allNotifications.filter((not: Notification) => not.to_admin == true).length)
          if (isAdminFilter) {
            allNotifications.forEach((notification: Notification) => {
              if (notification.to_admin) {
                switch (notification.category) {
                  case 'MODEL':
                    notificationsByCategory.MODEL.push(notification);
                    break;
                  case 'DATASET':
                    notificationsByCategory.DATASET.push(notification);
                    break;                  
                  case 'NEW':
                    notificationsByCategory.NEW.push(notification);
                    break;
                  case 'TICKET':
                    notificationsByCategory.TICKET.push(notification);
                    break;
                  default:
                    break;
                }
              }
            });

          } else {
            userNotifications.forEach((notification: Notification) => {
              if (!notification.to_admin) {
                switch (notification.category) {
                  case 'MODEL':
                    notificationsByCategory.MODEL.push(notification);
                    break;
                  case 'DATASET':
                    notificationsByCategory.DATASET.push(notification);
                    break;
                  case 'NEW':
                    notificationsByCategory.NEW.push(notification);
                    break;
                  case 'TICKET':
                    notificationsByCategory.TICKET.push(notification);
                    break;
                  default:
                    break;
                }
              }
            });
            setContNotificationsUser(userNotifications.filter((not: Notification) => not.to_admin == false).length);
          }
          setNotifications(notificationsByCategory);

        } else {
          userNotifications.forEach((notification: Notification) => {
            if (!notification.to_admin && notification.id_user == USER_ID) {
              switch (notification.category) {
                case 'MODEL':
                  notificationsByCategory.MODEL.push(notification);
                  break;
                case 'DATASET':
                  notificationsByCategory.DATASET.push(notification);
                  break;
                case 'NEW':
                  notificationsByCategory.NEW.push(notification);
                  break;
                case 'TICKET':
                  notificationsByCategory.TICKET.push(notification);
                  break;
                default:
                  break;
              }
            }
            setContNotificationsUser(userNotifications.filter((not: Notification) => not.to_admin == false).length);
          });
          setNotifications(notificationsByCategory);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    // Conectar a Socket.IO
    const socket = io('http://localhost:3000');

    // Escuchar eventos de notificación
    socket.on('notification', (notification: Notification) => {
      if (notification.id_user == USER_ID) {
        setNotifications((prevNotifications) => {
          const updatedNotifications = { ...prevNotifications };

          // Asegúrate de que la categoría existe y es un arreglo
          if (!Array.isArray(updatedNotifications[notification.category])) {
            updatedNotifications[notification.category] = [];
          }

          // Agregar la notificación a la categoría correspondiente
          updatedNotifications[notification.category] = [
            notification,
            ...updatedNotifications[notification.category]
          ];
          return updatedNotifications;
        });
      }

      if (notification.to_admin) {
        setContNotificationsAdmin(prevCount => prevCount + 1);
      } else if (!notification.to_admin && notification.id_user == USER_ID) {
        setContNotificationsUser(prevCount => prevCount + 1);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [USER_ID, USER_ROLE, isAdminFilter]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: NotificationCategory) => {
    setTabValue(newValue);
  };

  const handleDeleteNotification = async (category: NotificationCategory, id: number) => {
    try {
      await deleteNotification(id);
      setNotifications((prevNotifications) => ({
        ...prevNotifications,
        [category]: prevNotifications[category].filter(notification => notification.id !== id),
      }));
      if (category === 'TICKET' && isAdminFilter) {
        // setContNotificationsAdminT(prevCount => prevCount - 1);
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const returnNameNotification = () => {
    switch (tabValue) {
      case 'DATASET':
        return 'Set de datos';
      case 'MODEL':
        return 'Modelos';
      case 'NEW':
        return 'Noticias';
      case 'TICKET':
        return 'Reportes';
      default:
        return '';
    }
  }

  const handleClearCategory = async (category: NotificationCategory) => {
    try {
      if (USER_ROLE == 'ADMIN' && isAdminFilter) {
        await clearAllNotifications()
        setNotifications((prevNotifications) => ({
          ...prevNotifications,
          [category]: [],
        }));

        switch (category) {
          case 'MODEL':
            // setContNotificationsAdminM(0);
            break;
          case 'DATASET':
            // setContNotificationsAdminD(0);
            break;
          case 'NEW':
            // setContNotificationsAdminN(0);
            break;
          case 'TICKET':
            // setContNotificationsAdminT(0);
            break;
        }
      } else {
        await clearNotifications(USER_ID);
        setNotifications((prevNotifications) => ({
          ...prevNotifications,
          [category]: [],
        }));
        if (category) {
          setContNotificationsUser(0);
        }
      }

    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  const renderNotifications = (category: NotificationCategory) => (
    <List dense>
      {notifications[category].map((notification) => (
        <Card key={notification.id} variant="outlined" sx={{ margin: 1 }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="body2">{notification.message}</Typography>
              <Typography variant="caption" color="textSecondary">{notification.date} {notification.time}</Typography>
            </Box>
            <CardActions>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteNotification(category, notification.id)}>
                <Delete fontSize="small" />
              </IconButton>
            </CardActions>
          </CardContent>
        </Card>
      ))}
      {notifications[category].length > 0 && isAdminFilter == false && (
        <MenuItem onClick={() => handleClearCategory(category)}>
          <Typography color="error">Eliminar todas</Typography>
        </MenuItem>
      )}
    </List>
  );

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={
          USER_ROLE == 'ADMIN' ? (contNotificationsUser + contNotificationsAdmin) : contNotificationsUser
        } color="error">
          <Notifications />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
        PaperProps={{
          style: {
            maxHeight: 500,
            width: '60ch',
          },
        }}
      >
        <Box sx={{ maxHeight: 500, overflowY: 'auto', padding: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Notificaciones de {returnNameNotification().toLocaleLowerCase()}</Typography>
            {USER_ROLE === 'ADMIN' && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isAdminFilter}
                      onChange={() => setIsAdminFilter((prev) => !prev)}
                      color="primary"
                    />
                  }
                  label="Admin"
                />
                <Box
                  sx={{
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 1,
                  }}
                >
                  {contNotificationsAdmin}
                </Box>
              </Box>
            )}
          </Box>
          <Divider />
          {isAdminFilter ? (
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              TabIndicatorProps={{ style: { backgroundColor: '#1976d2' } }}
              sx={{
                '& .MuiTab-root': {
                  minWidth: 50,
                  padding: '10px 14px',
                }
              }}
            >
              <Tab icon={<DatasetIcon />} label={`${notifications.DATASET.length}`} value="DATASET" />
              <Tab icon={<PsychologyIcon />} label={`${notifications.MODEL.length}`} value="MODEL" />
              <Tab icon={<NewspaperIcon />} label={`${notifications.NEW.length}`} value="NEW" />
              <Tab icon={<BugReportIcon />} label={`${notifications.TICKET.length}`} value="TICKET" />
            </Tabs>
          ) : (
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              TabIndicatorProps={{ style: { backgroundColor: '#1976d2' } }}
              sx={{
                '& .MuiTab-root': {
                  minWidth: 50,
                  padding: '10px 14px',
                }
              }}
            >
              <Tab icon={<PsychologyIcon />} label={`${notifications.MODEL.length}`} value="MODEL" />
              <Tab icon={<DatasetIcon />} label={`${notifications.DATASET.length}`} value="DATASET" />              
              <Tab icon={<NewspaperIcon />} label={`${notifications.NEW.length}`} value="NEW" />
              <Tab icon={<BugReportIcon />} label={`${notifications.TICKET.length}`} value="TICKET" />
            </Tabs>
          )}
          <Divider />
          {renderNotifications(tabValue)}
        </Box>
      </Menu>
    </>
  );
};
