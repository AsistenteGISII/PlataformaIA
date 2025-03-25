import { Paper, Typography, Grid, Container, useTheme, useMediaQuery } from '@mui/material';
import { UserDiagram } from '../../statisticalDiagrams/usersDiagram';
import { ModelsDiagram } from '../../statisticalDiagrams/modelsDiagram';
import { DatasetsDiagram } from '../../statisticalDiagrams/datasetsDiagram';
import { NewsDiagram } from '../../statisticalDiagrams/newsDiagrams';
import { TopTenModels } from '../../statisticalDiagrams/topTenModels';

export default function Reports() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container disableGutters sx={{ marginTop: isSmallScreen ? '35px' : '70px' , padding: '40px' }} maxWidth='xl'>
            <Typography variant="h3" gutterBottom textAlign={'center'}>
                Reportes Estadísticos
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sm={6}>
                    <Paper className="section" sx={{padding:'2vh', 
                    marginBottom: isSmallScreen ? '2vh' : '5vh' }}>
                        <UserDiagram />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} sm={6}>
                    <Paper className="section" sx={{padding:'2vh'}}>
                        <TopTenModels/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} xl={4} >
                    <Paper className="section" sx={{padding:'2vh'}}>
                        <ModelsDiagram />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} xl={4} >
                    <Paper className="section" sx={{padding:'2vh'}}>
                        <DatasetsDiagram />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12} xl={4} >
                    <Paper className="section" sx={{padding:'2vh'}}>
                        <NewsDiagram />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

