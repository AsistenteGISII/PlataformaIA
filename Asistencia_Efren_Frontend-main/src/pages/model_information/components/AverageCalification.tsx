import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Margin } from '@mui/icons-material';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#246724',
  },
  '& .MuiRating-iconHover': {
    color: '#246724',
  },
});

type CalificationProps = {
    grade: string
}

export default function AverageCalification({grade}:CalificationProps) {
  return (
    <Box>
        <StyledRating
          name="customized-color"
          defaultValue={parseFloat(grade)}
          precision={0.5}
          icon={<CircleIcon fontSize="inherit" />}
          emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}
          max={10}
          readOnly={true} />
    </Box>
  );
}