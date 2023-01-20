import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  select: {
    display: 'flex',
    alignItems: 'center',
  },
})

export function BasicSelect() {
  const [age, setAge] = React.useState({ adults: 0, children: 0, infants: 0, pets: 0 });
  const classes = useStyles();

  const handleIncrement = (name) => {
    setAge({
      ...age,
      [name]: age[name] + 1,
    })
  }

  const handleDecrement = (name) => {
    if (age[name] > 0) {
      setAge({
        ...age,
        [name]: age[name] - 1,
      })
    }
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Guests</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
        >
          <MenuItem
            className={classes.select}
            value={age.adults}
            name="adults"
          >
            Adults
            <Button onClick={() => handleIncrement('adults')}>+</Button>
            <Button onClick={() => handleDecrement('adults')}>-</Button>
            <span>{age.adults}</span>
          </MenuItem>
          <MenuItem
            className={classes.select}
            value={age.children}
            name="children"
          >
            Children
            <Button onClick={() => handleIncrement('children')}>+</Button>
            <Button onClick={() => handleDecrement('children')}>-</Button>
            <span>{age.children}</span>
          </MenuItem>
          <MenuItem
            className={classes.select}
            value={age.infants}
            name="infants"
          >
            Infants
            <Button onClick={() => handleIncrement('infants')}>+</Button>
            <Button onClick={() => handleDecrement('infants')}>-</Button>
            <span>{age.infants}</span>
          </MenuItem>
          <MenuItem
            className={classes.select}
            value={age.pets}
            name="pets"
            >
              Pets
              <Button onClick={() => handleIncrement('pets')}>+</Button>
              <Button onClick={() => handleDecrement('pets')}>-</Button>
              <span>{age.pets}</span>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }