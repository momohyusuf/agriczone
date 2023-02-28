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
import { url } from '@/utils/url';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import AlertBox from '@/components/alert/AlertBox';
import { RootState } from '@/store';
import { updateAlert } from '@/features/global/globalSlice';
import { validateLoginInputs } from '@/utils/validateInputs';

type FormDataProps = {
  email: string;
  password: string;
};
const SignIn = () => {
  const [formData, setFormData] = React.useState<FormDataProps>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const alert = useSelector((state: RootState) => state.global.alert);
  const dispatch = useDispatch();
  //
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  //

  //
  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, type, checked } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // ////////////////////////

  const handleSubmit = async () => {
    if (validateLoginInputs(formData)) {
      dispatch(
        updateAlert({
          title: 'Error',
          isShown: true,
          // @ts-ignore
          message: validateLoginInputs(formData),
          status: 'error',
        })
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${url}/auth/login`, formData);
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      setIsLoading(false);

      dispatch(
        updateAlert({
          isShown: true,
          title: 'Error',

          message:
            // @ts-ignore
            error?.response?.data.message || 'Network error try again later',
          status: 'error',
        })
      );
    }
  };

  // /////////////////////////////
  return (
    <>
      <section className="grid place-items-center h-screen">
        {alert.isShown && <AlertBox />}
        <div className=" bg-mint-cream max-w-lg w-full shadow-md p-4 m-4 rounded-md">
          <h1 className="text-pigment-green text-2xl tracking-wide">
            Log into your account
          </h1>
          <Box className="space-y-6 my-6">
            <TextField
              id="outlined-multiline-flexible"
              label="Email"
              multiline
              maxRows={4}
              fullWidth
              color="success"
              size="small"
              name="email"
              onChange={handleInputs}
              value={formData.email}
            />
            <FormControl
              sx={{ width: '100%' }}
              color="success"
              variant="outlined"
              size="small"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                onChange={handleInputs}
                value={formData.password}
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
            loading={isLoading}
            size="large"
            variant="contained"
            className="bg-pigment-green"
            onClick={handleSubmit}
          >
            Sign in
          </LoadingButton>
          <p className="mt-6 text-center">
            {' '}
            Dont have an account yet?{' '}
            <Link href="/sign-up" className="text-pigment-green">
              Register
            </Link>
          </p>
          <p className="mt-2 text-center">
            {' '}
            Forgot password?{' '}
            <Link href="/sign-up" className="text-pigment-green">
              Reset
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default SignIn;
