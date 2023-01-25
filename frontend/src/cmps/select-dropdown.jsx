import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import { useState } from 'react'
import IconPlus from './svg-cmps/plus-icon.jsx'
import IconMinus from './svg-cmps/minus-icon.jsx'

const useStyles = makeStyles({
  select: {
    // display: 'flex',
    // alignItems: 'center',
  },
})

export function BasicSelect({ handleGuestsChange }) {
  const classes = useStyles()
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 })
  const [selectedValue, setSelectedValue] = useState('')

  const handleIncrement = (name) => {
    setGuests({
      ...guests,
      [name]: guests[name] + 1,
    })
    handleGuestsChange(guests)
  }

  const handleDecrement = (name) => {
    if (guests[name] > 0) {
      setGuests({
        ...guests,
        [name]: guests[name] - 1,
      })
    }
    handleGuestsChange(guests)
  }

  return (
    <Box className="select-dropdown">
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">
          <div className="guests">
            <span className="bold">GUESTS</span>
            <span className="second-row">{guests.adults + guests.children + guests.infants + guests.pets} guests</span>
          </div>
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          value=''
          inputProps={{
            sx: {
              "&.MuiOutlinedInput-input:hover": {
                border: "1px solid gray",
              }
            }
          }}
          MenuProps={{
            keepMounted: true,
            disablePortal: true,
            PaperProps: {
              sx: {
                "& .MuiMenuItem-root:hover": {
                  backgroundColor: "transparent",
                  cursor: "default",

                },
              }
            }
          }}
        >
          <MenuItem
            onClickCapture={(e) => {
              e.stopPropagation()
            }}
            keepMounted='true'
            className={classes.select}
            value="adults"
          >
            <div className="guest-type">
              <div className="content">Adults <span className="description">Age 13+</span></div>
              <div className="btns">
                <button className='guest-btn' onClick={() => handleDecrement('adults')}><span>-</span></button>
                <span>{guests.adults}</span>
                <button className='guest-btn' onClick={() => handleIncrement('adults')}><span>+</span></button>
              </div>
            </div>
          </MenuItem>
          <MenuItem
            onClickCapture={(e) => {
              e.stopPropagation()
            }}
            className={classes.select}
            value="children"
          >
            <div className="guest-type">
              <div className="content">Childern <span className="description">Age 2-12</span></div>
              <div className="btns">
                <button className='guest-btn' onClick={() => handleDecrement('children')}><span>-</span></button>
                <span>{guests.children}</span>
                <button className='guest-btn' onClick={() => handleIncrement('children')}><span>+</span></button>
              </div></div>
          </MenuItem>
          <MenuItem
            onClickCapture={(e) => {
              e.stopPropagation()
            }}
            className={classes.select}
            value="infants"
          >
            <div className="guest-type">
              <div className="content">Infants <span className="description">Under 2</span></div>
              <div className="btns">
                <button className='guest-btn' onClick={() => handleDecrement('infants')}><span>-</span></button>
                <span>{guests.infants}</span>
                <button className='guest-btn' onClick={() => handleIncrement('infants')}><span>+</span></button>
              </div></div>
          </MenuItem>
          <MenuItem
            onClickCapture={(e) => {
              e.stopPropagation()
            }}
            className={classes.select}
            value="pets"
          >
            <div className="guest-type">
              <div className="content">Pets <span className="description-pets">Bringing a service animal?</span></div>
              <div className="btns">
                <button className='guest-btn' onClick={() => handleDecrement('pets')}><span>-</span></button>
                <span>{guests.pets}</span>
                <button className='guest-btn' onClick={() => handleIncrement('pets')}><span>+</span></button>
              </div></div>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}