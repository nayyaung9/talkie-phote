import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import PropTypes from "prop-types"; // ES6

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
/**
 * Render room create dialog <CreateDialog />
 *
 * @param  {object} props - Specific method for dialog function
 * @returns {HTMLDialogElement} - Render dialog that can create the room
 */
function JoinDialog(props) {
  const { joinDialog, joinRoomById, closeJoinDialog } = props;

  const [state, setState] = useState({
    name: "",
  });
  return (
    <div>
      <Dialog
        open={joinDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeJoinDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle id="alert-dialog-slide-title">Join Your Friend&apos;s Room</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            အတင်းတုပ်ချင်လား? ကြွဖို့ room Id ရိုက်ထည့်လိုက်ပါ။
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Room Id"
            type="text"
            fullWidth
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeJoinDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => joinRoomById(state.name)} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

JoinDialog.propTypes = {
  joinDialog: PropTypes.bool,
  closeJoinDialog: PropTypes.func,
  joinRoomById: PropTypes.func,
};

export default JoinDialog;
