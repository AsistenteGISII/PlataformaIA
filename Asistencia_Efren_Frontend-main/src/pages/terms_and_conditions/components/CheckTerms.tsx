import React from 'react';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface CheckTermsProps {
    checkedTerms: boolean;
    setCheckedTerms: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckTerms: React.FC<CheckTermsProps> = ({ checkedTerms, setCheckedTerms }) => {
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="center">
      <FormControlLabel
        control={<Checkbox checked={checkedTerms} onChange={(e) => setCheckedTerms(e.target.checked)} />}
        label={
          <>
            Acepto los&nbsp;
            <Typography
              component="span"
              onClick={() => navigate('/terms_and_conditions')}
              sx={{
                textDecoration: 'underline',
                color: '#1976d2',
                cursor: 'pointer',
                fontStyle: 'italic',
              }}
            >
              términos y condiciones
            </Typography>
          </>
        }
      />
    </Box>
  );
};

export default CheckTerms;
