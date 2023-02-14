import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Hero = () => {
  return (
    <header className="hero--bg grid place-items-center">
      <div className="grid place-items-center gap-9">
        <h1 className="text-6xl font-bold text-center text-white">
          Making Agriculture Exciting And <br /> Innovative
        </h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            placeholder="Subscribe to our newsletter"
            hiddenLabel
            id="filled-hidden-label-small"
            variant="filled"
            size="small"
            color="success"
            // style={{
            //   backgroundColor: 'white',

            // }}
            className="bg-white w-full rounded-sm"
          />
          <Button variant="outlined" color="success" size="large">
            Subscribe
          </Button>
        </Box>
      </div>
    </header>
  );
};

export default Hero;
