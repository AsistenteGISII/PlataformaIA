import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { chooseImage } from '../helpers/chooseImage';
import { useNavigate } from 'react-router-dom';

type TrendingNewCardProps = {
  newName: string,
  autor: string,
  description: string,
  tags: Array<string>
}


export const TrendingNewCard = ({ newName, autor, description, tags }: TrendingNewCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/model123');
  }

  return (
    <Card sx={{ maxWidth: '60%', minHeight: 250 }} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          image={chooseImage(tags)}
          alt="artificial intelligense"
        />
        <CardContent sx={{ padding: "10px 10px", textAlign: "center" }}>
          <Typography gutterBottom variant="h5" component="div" marginBottom="10px">
            <b>{newName}</b>
          </Typography>
          <Typography variant="body2" color="text.secondary" margin="5px 90px">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary" margin="15px">
            <b>{autor}</b>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}