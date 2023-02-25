import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// miu components
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// ************************
import Link from 'next/link';
// ************************
import axios from 'axios';
import { states } from '@/utils/data/statesInNigeria';
import { url } from '@/utils/url';
import { RootState } from '@/store';
import { updateAlert, toggleModal } from '@/features/global/globalSlice';
import AlertBox from '@/components/alert/AlertBox';
import { validateRegisterInputs } from '@/utils/validateInputs';
import SuccessModal from '@/components/successMoodal/SuccessModal';

type FormDataProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: string;
  state: string;
  field: string;
  acceptAgreement: boolean;
};

const AgroExpert = () => {
  const [formData, setFormData] = React.useState<FormDataProps>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profilePicture: '',
    state: '',
    field: '',
    acceptAgreement: true,
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const alert = useSelector((state: RootState) => state.global.alert);

  const dispatch = useDispatch();

  // //////////////////
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // ////////////////////////////////
  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, type, checked } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleSubmit = async () => {
    if (validateRegisterInputs(formData)) {
      dispatch(
        updateAlert({
          title: 'Error',
          isShown: true,
          // @ts-ignore
          message: validateRegisterInputs(formData),
          status: 'error',
        })
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${url}/api/v1/auth/create-agro-expert`,
        formData
      );

      console.log(response);
      setIsLoading(false);
      dispatch(
        toggleModal({
          isOpen: true,
          message: response.data.message,
        })
      );
    } catch (error) {
      setIsLoading(false);

      dispatch(
        updateAlert({
          title: 'Error',
          isShown: true,
          // @ts-ignore
          message:
            error?.response?.data.message || 'Network error try again later',
          status: 'error',
        })
      );
      console.log();
    }
  };

  return (
    <section className="grid py-36 place-items-center min-h-screen">
      {alert.isShown && <AlertBox />}
      <SuccessModal />
      <div className="shadow-md p-1 md:p-4 fadeIn  mx-2 rounded-md bg-mint-cream m: md:w-[600px]">
        <h1 className="text-3xl text-center text-pigment-green py-1 tracking-wider">
          Agro Expert
        </h1>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            '& > :not(style)': { my: 1.5 },
          }}
        >
          <div className="flex gap-5">
            {' '}
            <TextField
              id="outlined-basic"
              label="First name"
              variant="outlined"
              fullWidth
              color="success"
              size="small"
              required
              name="firstName"
              value={formData.firstName}
              onChange={handleInputs}
              type="text"
            />
            <TextField
              id="outlined-basic"
              label="Last name"
              variant="outlined"
              fullWidth
              size="small"
              required
              name="lastName"
              value={formData.lastName}
              onChange={handleInputs}
              color="success"
              type="text"
            />
          </div>

          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            size="small"
            type="email"
            required
            name="email"
            value={formData.email}
            onChange={handleInputs}
            color="success"
          />

          <FormControl
            size="small"
            color="success"
            required
            fullWidth
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputs}
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
          <Autocomplete
            id="controllable-states-demo"
            onChange={(event: any, newValue: string | null) => {
              // @ts-ignore
              setFormData((prevState) => ({
                ...prevState,
                state: newValue,
              }));
            }}
            value={formData.state}
            options={states}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose your state"
                variant="outlined"
                size="small"
                color="success"
              />
            )}
          />

          <TextField
            size="small"
            onChange={handleInputs}
            id="outlined-basic"
            label="Field"
            variant="outlined"
            fullWidth
            color="success"
            required
            name="field"
            type="text"
            value={formData.field}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.acceptAgreement}
                inputProps={{ 'aria-label': 'controlled' }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    acceptAgreement: event.target.checked,
                  }));
                }}
                sx={{
                  color: '#019B4C',
                  '&.Mui-checked': {
                    color: '#019B4C',
                  },
                }}
              />
            }
            label="Please accept our terms and conditions."
          />
          <LoadingButton
            fullWidth
            loading={isLoading}
            variant="contained"
            color="success"
            className="bg-pigment-green"
            onClick={handleSubmit}
          >
            create account
          </LoadingButton>
          <p className="mt-6 text-center">
            {' '}
            Already have account?{' '}
            <Link href="/sign-in" className="text-pigment-green">
              Sign in
            </Link>
          </p>
        </Box>
      </div>
    </section>
  );
};
export default AgroExpert;
