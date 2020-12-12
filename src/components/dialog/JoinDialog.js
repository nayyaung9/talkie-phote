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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function JoinDialog({
  joinDialog,
  joinRoomById,
  closeJoinDialog,
}) {
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
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Join Your Friend's Room
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            အတင်းတုပ်ချင်လား? ကြွဖို့ room Id ရိုက်ထည့်လိုက်ပါ။
          </DialogContentText>
          <TextField
            autoFocus
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
