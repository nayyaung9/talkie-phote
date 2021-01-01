import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  Slide,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { roomActions } from "../../store/actions/room.action";
import PropTypes from "prop-types"; // ES6
import * as Yup from "yup";
import { Formik } from "formik";

export const roomFormValidation = Yup.object().shape({
  roomName: Yup.string()
    .min(3, "Room name must be at least 3 characters")
    .max(25, "Room name must be below 25 characters")
    .required("Room name is required"),
  privacy: Yup.string().required("Please Select Room Privacy"),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Render room create dialog <CreateDialog />
 *
 * @param  {object} props - Specific method for dialog function
 * @returns {HTMLDialogElement} - Render dialog that can create the room
 */
function CreateDialog(props) {
  const { createDialog, closeCreateDialog } = props;
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.user);

  return (
    <div>
      <Dialog
        open={createDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeCreateDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle id="alert-dialog-slide-title">Create your Room</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Have a fun with your friends?
          </DialogContentText>
          <Formik
            initialValues={{
              roomName: "",
              privacy: "",
            }}
            validationSchema={roomFormValidation}
            onSubmit={(values) => {
              const payload = {
                user: auth._id ? auth._id : auth.id,
                admin: auth._id ? auth._id : auth.id,
                roomName: values.roomName,
                privacy: values.privacy,
              };
              dispatch(roomActions.createRoom(payload));
            }}>
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
              <form onSubmit={handleSubmit} id="roomForm">
                <TextField
                  margin="dense"
                  id="roomName"
                  label="Room Name *"
                  type="text"
                  fullWidth
                  value={values.roomName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.roomName ? errors.roomName : ""}
                  error={touched.roomName && Boolean(errors.roomName)}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Room Privacy *</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="privacy"
                    fullWidth
                    value={values.privacy}
                    onChange={handleChange("privacy")}
                    onBlur={handleBlur}
                    helperText={touched.roomName ? errors.roomName : ""}
                    error={touched.roomName && Boolean(errors.roomName)}>
                    <MenuItem value="0">Public</MenuItem>
                    <MenuItem value="1">Private</MenuItem>
                  </Select>
                </FormControl>
              </form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCreateDialog} color="primary">
            Cancel
          </Button>
          <Button color="primary" form="roomForm" type="submit">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CreateDialog.propTypes = {
  createDialog: PropTypes.bool,
  closeCreateDialog: PropTypes.func,
};

export default CreateDialog;
