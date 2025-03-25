import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Typography } from '@mui/material';

type ComboBoxProps = {
  title : string,
  options: Array<string>
}

export const ComboBox = ({title, options}:ComboBoxProps) => {
  const [version, setVersion] = React.useState(options[options.length-1]);

  const handleChange = (event: SelectChangeEvent) => {
    setVersion(event.target.value);
  };

  return (
    <>
        <FormControl sx={{minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">{title}</InputLabel>
          <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={version}
              label={title}
              onChange={handleChange}
              defaultValue={options[0]}
          >
              {options.map((x) => 
                    <MenuItem value = {x}>{x}</MenuItem>
                )
              }
              
          </Select>
      </FormControl>
    </> 
  );
} 