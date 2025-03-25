// JustificationForm.tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

interface JustificationFormProps {
  currentStatus: string;
  onSubmit: (justification: string, status: string) => void;
}

const JustificationForm: React.FC<JustificationFormProps> = ({ currentStatus, onSubmit }) => {
  const [justification, setJustification] = useState('');
  const [status, setStatus] = useState(currentStatus);

  const handleSubmit = () => {
    onSubmit(justification, status);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
      <Typography variant="h6" mb={2}>Justificar Cambio de Estado</Typography>
      <TextField
        label="Justificación"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={justification}
        onChange={(e) => setJustification(e.target.value)}
        style={{ resize: 'none' }} // Para evitar el redimensionamiento
      />
      <TextField
        select
        label="Estado"
        fullWidth
        variant="outlined"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        SelectProps={{
          native: true,
        }}
        sx={{ mt: 2 }}
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Rejected">Rejected</option>
      </TextField>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Enviar</Button>
      </Box>
    </Box>
  );
};

export default JustificationForm;
