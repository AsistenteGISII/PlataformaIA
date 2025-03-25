import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#00A1EB',
  },
  '& .MuiRating-iconHover': {
    color: '#0079EB',
  },
});

export default function CalificationSelector() {
  const [calification, setCalification] = React.useState(0.0);
  
  const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: number | null) => {
    if (newValue !== null){
      setCalification(newValue);
    }
  };

  return (
    <Box>
      <StyledRating
          name="customized-color"
          precision={0.5}
          icon={<CircleIcon fontSize="inherit" />}
          emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}
          max = {10}
          onChange = {handleChange}
      />
      <Typography>
          {calification}
      </Typography>
    </Box>
  );
}