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
  const [guests, setAge] = React.useState({ adults: 0, children: 0, infants: 0, pets: 0 });
  const classes = useStyles()
  const [selectedValue, setSelectedValue] = React.useState('')

  const handleIncrement = (name) => {
    setAge({
      ...guests,
      [name]: guests[name] + 1,
    })
  }

  const handleDecrement = (name) => {
    if (guests[name] > 0) {
      setAge({
        ...guests,
        [name]: guests[name] - 1,
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
          value={selectedValue}
          onChange={event => setSelectedValue(event.target.value)}
        >
          <MenuItem
            className={classes.select}
            value="adults"
          >
            Adults
            <Button onClick={() => handleIncrement('adults')}>+</Button>
            <Button onClick={() => handleDecrement('adults')}>-</Button>
            <span>{guests.adults}</span>
          </MenuItem>
          <MenuItem
            className={classes.select}
            value="children"
          >
            Children
            <Button onClick={() => handleIncrement('children')}>+</Button>
            <Button onClick={() => handleDecrement('children')}>-</Button>
            <span>{guests.children}</span>
          </MenuItem>
          <MenuItem
            className={classes.select}
            value="infants"
          >
            Infants
            <Button onClick={() => handleIncrement('infants')}>+</Button>
            <Button onClick={() => handleDecrement('infants')}>-</Button>
            <span>{guests.infants}</span>
          </MenuItem>
          <MenuItem
            className={classes.select}
            value="pets"
          >
            Pets
            <Button onClick={() => handleIncrement('pets')}>+</Button>
            <Button onClick={() => handleDecrement('pets')}>-</Button>
            <span>{guests.pets}</span>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}