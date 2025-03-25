import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PanelDiscussion } from './PanelDiscussion';
import { PanelCode } from './PanelCode';
import { PanelInformation } from './PanelInformation';
import { CommentProps } from '../types/CommentProps';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

type ContentNavigationPromp = {
  linkCode: string, 
  linkPaper: string,
  comments: Array<CommentProps>, 
  largeDescription: string,
  precision: string,
  datasets: Array<string>,
  tags: Array<string>
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

export default function FloatingActionButtonZoom({linkCode, linkPaper, comments, largeDescription, precision, datasets, tags}:ContentNavigationPromp) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        width: "70%",
        position: 'relative',
        minHeight: 200,
        margin: "auto"
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Model Card" {...a11yProps(0)} />
          <Tab label="Code" {...a11yProps(1)} />
          <Tab label="Discussion" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

        <TabPanel value={value} index={0} dir={theme.direction}>
          <PanelInformation largeDescription={largeDescription} precision={precision} datasets={datasets} tags={tags} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <PanelCode 
            linkCode= {linkCode}
            linkPaper= {linkPaper}
          />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <PanelDiscussion  comments = {comments} />
        </TabPanel>
      
    </Box>
  );
}