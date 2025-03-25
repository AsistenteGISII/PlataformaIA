import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { TrendingNewCard } from './TrendingNewCard';
import { Box, Typography } from '@mui/material';

export default function TrendingNewsView() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center">
                <TrendingNewCard
                    autor='Fabricio Alvarado Alvarado'
                    newName='El Tecnologico de Costa Rica ignova en el sector de la IA'
                    description='La idea general sería que en este apartado vaya una breve descripción respecto a la Noticia: una introducción a por qué se creó, los algoritmos utilizados, y demás. Información útil para el usuario, de manera que se empape de la idea general del modelo. Por ejemplo: Esto modelo se creo para satisfacer la necesidad de controlar el ingreso a una empresa por medio de reconocimiento facial, por lo que los trabajadores ya no debian de firmar o usar ninguna tarjeta para registrar la entrada.'
                    tags={['Facial recognition']} />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
                <MobileStepper
                    variant="dots"
                    steps={3}
                    position="static"
                    activeStep={activeStep}
                    sx={{ maxWidth: "60%", flexGrow: 1 }}
                    nextButton={<Button size="small" onClick={handleNext} disabled={activeStep === 2}>
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>}
                    backButton={<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>}
                />
            </Box>
        </>
    );
}