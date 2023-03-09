import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from 'next/link';
import { url } from '@/utils/url';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import AlertBox from '@/components/alert/AlertBox';
import { RootState } from '@/store';
import { toggleModal, updateAlert } from '@/features/global/globalSlice';
import validator from 'validator';
import { useRouter } from 'next/router';
import SuccessModal from '@/components/successMoodal/SuccessModal';

type FormDataProps = {
  newPassword: string;
  confirmPassword: string;
};
const PasswordReset = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState<FormDataProps>({
    newPassword: '',
    confirmPassword: '',
  });
  const { token, email } = router.query;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const alert = useSelector((state: RootState) => state.global.alert);
  const dispatch = useDispatch();

  // hide and show
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  //************************ */

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
    if (
      !validator.isStrongPassword(formData.confirmPassword) ||
      !validator.isStrongPassword(formData.newPassword) ||
      formData.confirmPassword !== formData.newPassword
    ) {
      dispatch(
        updateAlert({
          title: 'Error',
          isShown: true,
          // @ts-ignore
          message: 'Provide a strong password',
          status: 'error',
        })
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${url}/auth/reset-password`, {
        token,
        email,
        confirmPassword: formData.confirmPassword,
      });
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
      <SuccessModal />
      <section className="grid place-items-center h-screen">
        {alert.isShown && <AlertBox />}

        <div className=" bg-mint-cream max-w-lg w-full shadow-md p-4 m-4 rounded-md">
          <h1 className="text-pigment-green text-2xl tracking-wide">
            Password reset
          </h1>
          <Box className="space-y-6 my-6">
            <FormControl
              sx={{ width: '100%' }}
              color="success"
              variant="outlined"
              size="small"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Create new password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={'password'}
                name="newPassword"
                onChange={handleInputs}
                value={formData.newPassword}
                label="create new password"
              />
            </FormControl>
            {/* *********************** */}

            <FormControl
              sx={{ width: '100%' }}
              color="success"
              variant="outlined"
              size="small"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                onChange={handleInputs}
                value={formData.confirmPassword}
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
                label="Confirm password"
              />
            </FormControl>
            {formData.newPassword !== formData.confirmPassword && (
              <small className="text-red-600">Password do not match</small>
            )}
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
            Submit
          </LoadingButton>
        </div>
      </section>
    </>
  );
};

export default PasswordReset;
