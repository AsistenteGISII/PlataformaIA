import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SpeedDialFAQS from "../../components/FAQs/SpeedDialFAQS";

const TermsAndConditions: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#0c5b7e", width: "100%", py: 6, mt: 12 }}>
        <Typography variant="h4" sx={{ color: "white", textAlign: "center" }}>
          Políticas de Privacidad y Términos de Uso
        </Typography>
      </Box>
      <Container sx={{ mt: 4 }}>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ textAlign: "justify" }}>
            Mediante esta declaración de privacidad y términos de uso, el Tecnológico de Costa Rica (en adelante, el TEC) describe las condiciones regulatorias del sitio web institucional con el nombre de dominio tec.ac.cr, excluyendo del alcance de esta política a todos aquellos subdominios bajo la administración de instancias dentro de la institución. El TEC se reserva el derecho de modificar en cualquier momento y sin previo aviso estas políticas.
          </Typography>
        </Box>
      </Container>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ mt: 2 }}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            sx={{
              backgroundColor: expanded === "panel1" ? "#f5f5f5" : "#fff",
              borderLeft: expanded === "panel1" ? `4px solid #002855` : 'none',
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>1. Términos de uso y políticas de privacidad</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ textAlign: "justify" }}>
                1.1 Los datos recopilados de los usuarios anónimos de este sitio son utilizados para mejorar la experiencia de navegación. El TEC no suministra ni comercializa ninguna información de los usuarios a terceros.
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "justify", mt: 2 }}>
                1.2 Los datos de contacto recopilados en formularios son exclusivos para informar sobre los programas académicos ofertados por el TEC, y en los cuales el usuario haya demostrado tener interés.
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "justify", mt: 2 }}>
                1.3 Todo el contenido ofrecido en este sitio es principalmente informativo y no establece ninguna relación legal ni oficial entre la institución y otras personas o entidades. La información en este sitio puede cambiar de acuerdo a las necesidades de cada instancia.
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "justify", mt: 2 }}>
                1.4 El TEC se reserva el derecho de modificar en cualquier momento y sin previo aviso estas políticas.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            sx={{
              backgroundColor: expanded === "panel2" ? "#f5f5f5" : "#fff",
              borderLeft: expanded === "panel2" ? `4px solid #002855` : 'none',
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>2. Responsabilidades de los usuarios del portal</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ textAlign: "justify" }}>
                2.1 Las responsabilidades de los usuarios autenticados son: Este sitio crea y mantiene información con atributos de exactitud, claridad, consistencia, correctitud y actualidad. Los usuarios autenticados deberán capacitarse en cómo gestionar contenido en el sitio web. Cumplir con todas las políticas establecidas en el modelo de gobernanza web y las establecidas por la institución. Utilizar la cuenta de usuario institucional para acceder al portal. La administración del portal se reserva el derecho de deshabilitar o modificar los permisos de una cuenta de usuario por inactivación o uso indebido.
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "justify", mt: 2 }}>
                2.2 Cada unidad organizativa (Departamento) es responsable de nombrar y supervisar los editores de contenido.
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "justify", mt: 2 }}>
                2.3 La autoridad responsable de cada Departamento, Unidad o Instancia debe de establecer la estrategia de contenido y asignar la persona que tendrá el rol de administrador de contenido dentro de la unidad organizativa que representa.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
            sx={{
              backgroundColor: expanded === "panel3" ? "#f5f5f5" : "#fff",
              borderLeft: expanded === "panel3" ? `4px solid #002855` : 'none',
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>3. Violación de políticas</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ textAlign: "justify" }}>
                3.1 En caso de que se encuentre o se reporte uno de los tipos de violación a las políticas del modelo de gobernanza, se notificará al autor del contenido con el fin de que atienda el problema. En caso de no solucionarse, se retirará dicho contenido y se notificará a la autoridad en la jerarquía correspondiente. En ciertos casos, el TEC aplicará el procedimiento disciplinario correspondiente con el fin de que el sitio web institucional no se vea afectado.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
            sx={{
              backgroundColor: expanded === "panel4" ? "#f5f5f5" : "#fff",
              borderLeft: expanded === "panel4" ? `4px solid #002855` : 'none',
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>4. Accesibilidad</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ textAlign: "justify" }}>
                4.1 Todo el contenido creado por los usuarios debe de cumplir con los requisitos mínimos que establezca el equipo de gestión del sitio web.
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "justify", mt: 2 }}>
                4.2 Se debe de usar texto alternativo o "Alt text" para las imágenes, excepto en los casos en que las imágenes sean decorativas.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
            sx={{
              backgroundColor: expanded === "panel5" ? "#f5f5f5" : "#fff",
              borderLeft: expanded === "panel5" ? `4px solid #002855` : 'none',
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>5. Redes sociales</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ textAlign: "justify" }}>
                5.1 En el sitio web sólo se pueden enlazar las redes sociales que son oficiales de la universidad o de alguna de las unidades organizativas de la institución.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
            sx={{
              backgroundColor: expanded === "panel6" ? "#f5f5f5" : "#fff",
              borderLeft: expanded === "panel6" ? `4px solid #002855` : 'none',
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>6. Contenido</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ textAlign: "justify" }}>
                6.1 Audiovisual: Los videos que se publiquen en el portal deben de cumplir con los lineamientos que establezca la Oficina de Comunicación y Mercadeo a través de la guía rápida de proceso de producción de video. Los vídeos y audios que se publiquen deben de estar almacenados en un servidor externo al portal (YouTube, Soundcloud) y deben estar disponibles en internet.
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "justify", mt: 2 }}>
                6.2 Imágenes y fotografías: Los archivos de imágenes que se publiquen no deben de exceder lo establecido en la guía de fotos "Consejos para tomar fotografías del TEC". En casos excepcionales se debe de consultar con el gestor correspondiente.
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "justify", mt: 2 }}>
                6.3 Documentos: Los archivos de documentos que se publiquen no deben de exceder los 32 MB. Las excepciones de esta política deben ser consultadas con el gestor correspondiente.
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "justify", mt: 2 }}>
                6.4 Texto: El texto publicado debe de respetar las pautas establecidas en el “Manual de Escritura Institucional”.
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "justify", mt: 2 }}>
                6.5 Derechos de autor: Todo contenido que se publique debe de cumplir con los derechos de autor que el TEC tiene en la utilización de obras de autoría y además tener las debidas autorizaciones de uso por parte de los creadores de contenido.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel7"}
            onChange={handleChange("panel7")}
            sx={{
              backgroundColor: expanded === "panel7" ? "#f5f5f5" : "#fff",
              borderLeft: expanded === "panel7" ? `4px solid #002855` : 'none',
              mb: 8,
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>7. Aplicaciones y herramientas</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ textAlign: "justify" }}>
                7.1 Todo el contenido de las aplicaciones y herramientas que se integre al sitio debe de cumplir con los lineamientos establecidos en el modelo de gobernanza web del TEC. Las herramientas que se integren deben ser herramientas que la universidad tenga contratadas o que hayan sido definidas por la universidad.
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "justify", mt: 2 }}>
                7.2 El uso de herramientas gratuitas por parte de los colaboradores debe de ser consultado con las autoridades de cada unidad.
              </Typography>
            </AccordionDetails>
          </Accordion>

        </Box>
      </Container>
      <SpeedDialFAQS />
    </>
  );
};

export default TermsAndConditions;
