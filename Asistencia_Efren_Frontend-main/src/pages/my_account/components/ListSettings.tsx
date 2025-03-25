import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DatasetIcon from '@mui/icons-material/Dataset';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

type ListSettingsProps = {
  changeParentOption: (option:string) => void;
}

export default function ListSettings({changeParentOption}:ListSettingsProps) {
  const [openPublicaciones, setopenPublicaciones] = React.useState(true);
  const [, setOptionSelected] = React.useState("Mi Perfil");

  const handleClicPublicaciones = () => {
    setopenPublicaciones(!openPublicaciones);
  };

  const handleClickOption = (option:string) => {
    setOptionSelected(option)
    changeParentOption(option)
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: '#D9D9D9', borderRadius:'20px 0 0 20px'}}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={() => handleClickOption("Mi Perfil")}>
        <ListItemIcon>
          <AccountBoxIcon sx={{color:"#05254A"}} />
        </ListItemIcon>
        <ListItemText primary="Mi Perfil" />
      </ListItemButton>
      <ListItemButton onClick={handleClicPublicaciones}>
        <ListItemIcon>
          <ArticleOutlinedIcon  sx={{color:"#05254A"}} />
        </ListItemIcon>
        <ListItemText primary="Mis Publicaciones" />
        {openPublicaciones ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openPublicaciones} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleClickOption("Modelos Publicados")}>
            <ListItemIcon>
              <PsychologyIcon  sx={{color:"#05254A"}}/>
            </ListItemIcon>
            <ListItemText primary="Modelos" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleClickOption("Datasets Publicados")}>
            <ListItemIcon>
              <DatasetIcon sx={{color:"#05254A"}} />
            </ListItemIcon>
            <ListItemText primary="Datasets" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}