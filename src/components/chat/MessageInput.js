import React from "react";
import { makeStyles, fade, InputBase, IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - 320px)`,
      marginLeft: 320,
    },
    background: "#fff",
    color: "#000",
    top: "auto",
    bottom: 0,
    boxShadow: "none",
  },
  search: {
    position: "relative",

    borderRadius: 20,
    backgroundColor: "#f2f2f2",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function MessageInput({ text, onSendMessage, handleKeyPress }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar style={{ alignItems: "flex-end", marginBottom: 10 }}>
          <div className={classes.search}>
            <InputBase
              placeholder="Type a message..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onKeyPress={handleKeyPress}
              multiline
              rowsMax={4}
              inputRef={text}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <IconButton
            edge="right"
            color="primary"
            aria-label="send"
            type="submit"
            onClick={onSendMessage}
          >
            <SendIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
