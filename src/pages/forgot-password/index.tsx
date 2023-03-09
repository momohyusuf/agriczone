import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import LoadingButton from '@mui/lab/LoadingButton';
import { url } from '@/utils/url';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import AlertBox from '@/components/alert/AlertBox';
import { RootState } from '@/store';
import { updateAlert, toggleModal } from '@/features/global/globalSlice';
import validator from 'validator';
import SuccessModal from '@/components/successMoodal/SuccessModal';

type FormDataProps = {
  email: string;
};
const ForgotPassword = () => {
  const [formData, setFormData] = React.useState<FormDataProps>({
    email: '',
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const alert = useSelector((state: RootState) => state.global.alert);
  const dispatch = useDispatch();

  //
  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // ////////////////////////

  const handleSubmit = async () => {
    if (!validator.isEmail(formData.email)) {
      dispatch(
        updateAlert({
          title: 'Error',
          isShown: true,
          // @ts-ignore
          message: 'Please enter a valid email',
          status: 'error',
        })
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${url}/auth/forgot-password`,
        formData
      );
      setIsLoading(false);
      dispatch(
        toggleModal({
          isOpen: true,
          message: response.data.message,
        })
      );
      setFormData({
        email: '',
      });
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
          <h1 className="text-pigment-green text-center text-2xl tracking-wide">
            Forgot password
          </h1>
          <Box className="space-y-6 my-6">
            <TextField
              id="outlined-multiline-flexible"
              label="Enter email address"
              multiline
              maxRows={4}
              fullWidth
              color="success"
              size="small"
              name="email"
              onChange={handleInputs}
              value={formData.email}
            />
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
            Request password reset link
          </LoadingButton>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
