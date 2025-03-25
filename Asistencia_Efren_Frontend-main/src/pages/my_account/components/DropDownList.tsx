import React from 'react';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DatasetIcon from '@mui/icons-material/Dataset';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import MenuIcon from '@mui/icons-material/Menu';
// import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
// import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';


type ListSettingsProps = {
  changeParentOption: (option:string) => void;
}

export default function DropDownList({changeParentOption}:ListSettingsProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openPublicaciones, setOpenPublicaciones] = useState(false);
    // const [openModels, setOpenModels] = useState(false);
    // const [openDatasets, setOpenDatasets] = useState(false);
    const [, setOptionSelected] = useState("My data");
  
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleClickOption = (option: string) => {
      setOptionSelected(option);
      changeParentOption(option);
      handleClose();
    };
  
    const handleClicPublicaciones = () => {
      setOpenPublicaciones(!openPublicaciones);
    };
  
    /* const handleClickModels = () => {
      setOpenModels(!openModels);
    };
  
    const handleClickDatasets = () => {
      setOpenDatasets(!openDatasets);
    }; */

    return (
      <>
        <div onClick={handleClick}>
          <MenuIcon sx={{color:"white"}} />
        </div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleClickOption("My data")}>
            <ListItemIcon>
              <AccountBoxIcon sx={{color:"#05254A"}} />
            </ListItemIcon>
            <ListItemText primary="Mi Perfil" />
          </MenuItem>
          <MenuItem onClick={handleClicPublicaciones}>
            <ListItemIcon>
              <ArticleOutlinedIcon  sx={{color:"#05254A"}} />
            </ListItemIcon>
            <ListItemText primary="Mis Publicaciones" />
            {openPublicaciones ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>
  
          {openPublicaciones && (
            <>
              <MenuItem sx={{ pl: 4 }} onClick={() => handleClickOption("Modelos Publicados")}>
                <ListItemIcon>
                  <PsychologyIcon  sx={{color:"#05254A"}}/>
                </ListItemIcon>
                <ListItemText primary="Modelos" />
              </MenuItem>
              <MenuItem sx={{ pl: 4 }} onClick={() => handleClickOption("Datasets Publicados")}>
                <ListItemIcon>
                  <DatasetIcon sx={{color:"#05254A"}} />
                </ListItemIcon>
                <ListItemText primary="Datasets" />
              </MenuItem>
              {/* <MenuItem sx={{ pl: 4 }} onClick={() => handleClickOption("News")}>
                <ListItemIcon>
                  <NewspaperOutlinedIcon sx={{color:"#05254A"}} />
                </ListItemIcon>
                <ListItemText primary="Noticias " />
              </MenuItem> */}
            </>
          )}
        </Menu>
    </>
  );
}

// Código anterior

/* return (
  <div>
  <div onClick={handleClick}>
    <MenuIcon sx={{color:"white"}} />
  </div>
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
  >
    <MenuItem onClick={() => handleClickOption("My data")}>
      <ListItemIcon>
        <AccountBoxIcon sx={{color:"#05254A"}} />
      </ListItemIcon>
      <ListItemText primary="My data" />
    </MenuItem>

    <MenuItem onClick={handleClicPublicaciones}>
      <ListItemIcon>
        <ArticleOutlinedIcon  sx={{color:"#05254A"}} />
      </ListItemIcon>
      <ListItemText primary="Mis Publicaciones" />
      {openPublicaciones ? <ExpandLess /> : <ExpandMore />}
    </MenuItem>

    {openPublicaciones && (
      <>
        <MenuItem sx={{ pl: 4 }} onClick={() => handleClickOption("Modelos Publicados")}>
          <ListItemIcon>
            <PsychologyIcon  sx={{color:"#05254A"}}/>
          </ListItemIcon>
          <ListItemText primary="Modelos" />
        </MenuItem>
        <MenuItem sx={{ pl: 4 }} onClick={() => handleClickOption("Datasets Publicados")}>
          <ListItemIcon>
            <DatasetIcon sx={{color:"#05254A"}} />
          </ListItemIcon>
          <ListItemText primary="Datasets" />
        </MenuItem>
        <MenuItem sx={{ pl: 4 }} onClick={() => handleClickOption("News")}>
          <ListItemIcon>
            <NewspaperOutlinedIcon sx={{color:"#05254A"}} />
          </ListItemIcon>
          <ListItemText primary="Noticias " />
        </MenuItem>
      </>
    )}

    <MenuItem onClick={handleClickModels}>
      <ListItemIcon>
        <PsychologyIcon  sx={{color:"#05254A"}} />
      </ListItemIcon>
      <ListItemText primary="Models" />
      {openModels ? <ExpandLess /> : <ExpandMore />}
    </MenuItem>

    {openModels && (
      <>
        <MenuItem sx={{ pl: 4 }} onClick={() => handleClickOption("Modelos favoritos")}>
          <ListItemIcon>
            <FavoriteBorderOutlinedIcon sx={{color:"#05254A"}} />
          </ListItemIcon>
          <ListItemText primary="Modelos favoritos" />
        </MenuItem>
      </>
    )}

    <MenuItem onClick={handleClickDatasets}>
      <ListItemIcon>
        <DatasetIcon sx={{color:"#05254A"}} />
      </ListItemIcon>
      <ListItemText primary="Datasets" />
      {openDatasets ? <ExpandLess /> : <ExpandMore />}
    </MenuItem>
    
    {openDatasets && (
      <>
        <MenuItem sx={{ pl: 4 }} onClick={() => handleClickOption("Datasets favoritos")}>
          <ListItemIcon>
            <FavoriteBorderOutlinedIcon sx={{color:"#05254A"}}/>
          </ListItemIcon>
          <ListItemText primary="Datasets favoritos" />
        </MenuItem>
      </>
    )}

    <MenuItem onClick={() => handleClickOption("Seguidos")}>
      <ListItemIcon>
        <GroupOutlinedIcon sx={{color:"#05254A"}} />
      </ListItemIcon>
      <ListItemText primary="Seguidos" />
    </MenuItem>
  </Menu>
</div>
); */