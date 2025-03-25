import { Alert, AlertTitle, Box, Button, Container, TextField, Typography } from "@mui/material"
import { TicketForm } from "./types/TicketRedactionForm";
import { useForm } from "../../hooks";
import { FormEvent, useContext, useState } from "react";
import { sendTicket } from "./helpers/sendTicket";
import { UserContext } from "../../context/UserContext/UserContext";
import { decodeToken, useJwt } from "react-jwt";
import { getIdUser } from "./helpers";
import { validateTicketFormData } from "./helpers/ValidateTicketFormData";
import { JwtUserToken } from "../../context/UserContext/types";
import { Link } from "react-router-dom";

export default function TicketRedaction() {
  // Obtener el contexto del usuario
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const ContxValues = useContext(UserContext);
  const ID_USER = ContxValues?.user?.id;

  // Inicializar el formulario con el ID de usuario obtenido
  const TicketFormInitialValue: TicketForm = {
    id_user: ID_USER ? ID_USER : 0,
    title: '',
    message: '',
    status: 'Pending'
  };

  // Obtener el estado del formulario y la función para actualizarlo
  const { formState, onInputChange } = useForm<TicketForm>(TicketFormInitialValue);

  // Estado para las validaciones del formulario
  const [formValidations, setFormValidations] = useState({
    validId: !null
  });

  // Manejar el envío del formulario
  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar el ID del usuario
    const isValidId = validateTicketFormData(ID_USER ? ID_USER : 0);

    if (!isValidId) {
      setFormValidations({
        ...formValidations,
        validId: isValidId
      });
      return;
    }

    try {
      // Combina la información del formulario con el ID de usuario
      const ticketData = {
        ...formState,
        id_user: ID_USER ? ID_USER : 0
      };

      // Enviar el ticket con la información combinada
      if (ID_USER) {
        await sendTicket(ticketData);

        setSuccess("Se ha envíado su ticket correctamente.");

        // Esperar 2 segundos antes de redirigir
        setTimeout(() => {
          window.location.href = '/'; // Aquí colocas la URL a la que quieres redirigir
        }, 500);
      } else {
        setError("Necesita iniciar sesión.");

        // Ocultar el error después de 2 segundos
        setTimeout(() => {
          setError(null);
        }, 2000);
      }

      // Limpiar el formulario después de enviar
      // Puedes agregar lógica adicional aquí si es necesario

      // Reiniciar las validaciones
      setFormValidations({
        ...formValidations,
        validId: true
      });
    } catch (error) {
      console.error('Error sending ticket:', error);
    }
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Redacción del ticket
        </Typography>
        <form onSubmit={onFormSubmit}>
          <TextField
            id="title"
            label="Titulo"
            name="title"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            onChange={onInputChange}
          />
          <TextField
            id="message"
            label="Mensaje"
            name="message"
            multiline
            rows={10}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            onChange={onInputChange}
          />
          <Box sx={{ display: 'flex', gap: '1em', float: 'right' }}>
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
            <Link to="/">
              <Button variant="contained" color="primary">
                Cancelar
              </Button>
            </Link>

          </Box>
        </form>

      </Container>
      {error && (
        <Alert variant="filled" severity="warning" sx={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}{success && (
        <Alert variant="filled" severity="success" sx={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
          <AlertTitle>Envío exitoso</AlertTitle>
          {success}
        </Alert>
      )}
    </>
  );
}
