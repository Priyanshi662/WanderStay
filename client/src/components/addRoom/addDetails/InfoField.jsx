import { Avatar, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useValue } from '../../../context/ContextProvider';
import pendingIcon from './Icons/progress1.svg';
import { Check } from '@mui/icons-material';

let timer;
const InfoField = ({ mainProps, optionalProps = {}, minLength }) => {
    // optional props are for description 
  const { dispatch } = useValue();
//   user is typing or not
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    dispatch({
      type: 'UPDATE_DETAILS',
      payload: { [e.target.name]: e.target.value },
    });
    if (!editing) setEditing(true);
    clearTimeout(timer);
    
    timer = setTimeout(() => {
      setEditing(false);
      if (e.target.value.length < minLength) {
        if (!error) setError(true);
        if (success) setSuccess(false);
      } else {
        if (error) setError(false);
        if (!success) setSuccess(true);
      }
    //   if the user is not typing for 1 sec then setEditing to false
    }, 1000);
  };
  return (
    <TextField
      {...mainProps}
      {...optionalProps}
      error={error}
      helperText={error && `This field must be ${minLength} characters or more`}
      color={success ? 'success' : 'primary'}
      variant="outlined"
      onChange={handleChange}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {editing ? (
              <Avatar src={pendingIcon} sx={{ height: 70 }} />
            ) : (
              success && <Check color="success" />
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InfoField;