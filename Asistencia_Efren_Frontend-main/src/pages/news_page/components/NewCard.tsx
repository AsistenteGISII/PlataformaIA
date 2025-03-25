import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { chooseImage } from '../helpers/chooseImage';

type NewCardProps = {
  newName: string,
  autor: string,
  date: string,
  grade: string,
  tags: Array<string>
}


export const NewCard = ({ newName, autor, date, grade, tags }: NewCardProps) => {
  return (
    <Card sx={{ minWidth: "350px", height: "fit-content", margin: "20px", position: "relative" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="110px"
          image={chooseImage(tags)}
          alt="artificial intelligence image"
        />
        <CardContent sx={{ minHeight: "100px", padding: "0px 10px" }}>
          <Typography gutterBottom variant="h5" component="div" marginBottom="10px">
            <b>{newName}</b>
          </Typography>
          <Typography display="flex">
            <Typography maxWidth="65%" >
              <Typography variant="body2" color="text.secondary" marginBottom="5px">
                <b>Autor: </b>{autor}
              </Typography>
              <Typography variant="body2" color="text.secondary" marginBottom="5px">
                <b>Published: </b>{date}
              </Typography>
              <Typography variant="body2" color="text.secondary" marginBottom="5px">
                <b>Score: </b> {grade}/10
              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary" position="absolute" right="0" maxWidth="40%" marginRight="10px">
              <b>Categories: </b>{tags.map((x) => {
                return (
                  <Typography variant="body2" color="text.secondary">
                    {x}
                  </Typography>
                );
              }
              )
              }
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" sx={{ margin: "5px" }}>
          Learn more
        </Button>
      </CardActions>
    </Card>
  );
}