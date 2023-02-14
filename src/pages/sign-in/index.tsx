import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from 'next/link';

const SignIn = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <section className="grid place-items-center h-screen">
      <div className="bg-slate-50 max-w-lg w-full shadow-md p-4 m-4 rounded-md">
        <h1 className="text-pigment-green text-2xl tracking-wide">
          Log into your account
        </h1>
        <Box className="space-y-6 my-6">
          <TextField
            id="outlined-multiline-flexible"
            label="Username or Email"
            multiline
            maxRows={4}
            fullWidth
            color="success"
          />
          <FormControl
            sx={{ width: '100%' }}
            color="success"
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Box>
        <LoadingButton
          fullWidth
          color="success"
          size="large"
          variant="contained"
          className="bg-pigment-green"
        >
          Sign in
        </LoadingButton>
        <p className="mt-6">
          {' '}
          Dont have an account yet?{' '}
          <Link href="/sign-up" className="text-pigment-green">
            Register here
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default SignIn;
