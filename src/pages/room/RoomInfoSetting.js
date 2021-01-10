import React from "react";
import {
  makeStyles,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@material-ui/core";
import history from "../../history";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { roomActions } from "../../store/actions/room.action";
import { useQuery } from "react-query";
import api from "../../api";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: "#fff",
    color: "#000",
    boxShadow: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const roomFormValidation = Yup.object().shape({
  roomName: Yup.string()
    .min(3, "Room name must be at least 3 characters")
    .max(25, "Room name must be below 25 characters")
    .required("Room name is required"),
  privacy: Yup.string().required("Please Select Room Privacy"),
});

const RoomInfoSetting = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { roomId } = useParams();

  const { status, data, error } = useQuery("roomInfo", async () => {
    const { data } = await api.get(`/api/room/${roomId}`);
    return data.data;
  });

  console.log("status", status);
  const auth = useSelector((state) => state.auth.user);

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography>Edit Room Info</Typography>
          <div className={classes.root} />
        </Toolbar>
      </AppBar>
      <Container>
        {status === "loading" ? (
          <div>Loading</div>
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <Formik
            initialValues={{
              roomName: data?.name,
              privacy: data?.privacy,
              id: data?.code,
            }}
            validationSchema={roomFormValidation}
            onSubmit={(values) => {
              const payload = {
                id: values.id,
                roomName: values.roomName,
                privacy: values.privacy,
                admin: auth._id ? auth._id : auth.id,
              };

              dispatch(roomActions.updateRoomInfo(payload));
            }}>
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
              <form onSubmit={handleSubmit} id="roomForm">
                <TextField
                  margin="dense"
                  id="roomName"
                  variant="outlined"
                  label="Room Name *"
                  type="text"
                  fullWidth
                  value={values.roomName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ marginBottom: 20 }}
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

                <Button
                  style={{ marginTop: 20 }}
                  fullWidth
                  type="submit"
                  variant="outlined"
                  size="small"
                  color="primary">
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        )}
      </Container>
    </div>
  );
};

export default RoomInfoSetting;
