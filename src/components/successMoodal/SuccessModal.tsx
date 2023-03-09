import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleModal } from '@/features/global/globalSlice';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #019B4C',
  boxShadow: 24,
  p: 4,
  boderRadius: '16px',
};

export default function SuccessModal() {
  const modal = useSelector((state: RootState) => state.global.isModalOpen);
  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        open={modal?.isOpen}
        onClose={() =>
          dispatch(
            toggleModal({
              isOpen: false,
              message: '',
            })
          )
        }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modal?.isOpen}>
          <Box sx={style}>
            <Typography id="modal-modal-description" className="text-slate-500">
              {modal?.message}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
