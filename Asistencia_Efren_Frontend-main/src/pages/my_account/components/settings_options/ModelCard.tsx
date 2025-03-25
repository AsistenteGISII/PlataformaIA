import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

type NewCardProps = {
  modelName: string,
  autor: string,
  grade: number,
  precision: number
}

export const ModelCard = ({ modelName, autor, grade, precision }: NewCardProps) => {
  return (
    <Card sx={{ minWidth: "350px", height: "fit-content", margin: "20px", position: "relative" }}>
      <CardActionArea>
        <CardContent sx={{ minHeight: "100px", padding: "0px 10px" }}>
          <Typography gutterBottom variant="h5" component="div" marginBottom="10px">
            <b>{modelName}</b>
          </Typography>
          <Typography display="flex">
            <Typography maxWidth="65%" >
              <Typography variant="body2" color="text.secondary" marginBottom="5px">
                <b>Autor: </b>{autor}
              </Typography>
              <Typography variant="body2" color="text.secondary" marginBottom="5px">
                <b>Score: </b> {grade}/10
              </Typography>
              <Typography variant="body2" color="text.secondary" marginBottom="5px">
                <b>Accuracy: </b>{precision}
              </Typography>
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