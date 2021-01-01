import React from "react";
import { makeStyles, InputBase, IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import SendIcon from "@material-ui/icons/Send";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { Picker } from "emoji-mart";
import PropTypes from "prop-types"; // ES6
import "emoji-mart/css/emoji-mart.css";

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
    display: "flex",
    flexDirection: "row",
  },
  emojiPicker: {
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

/**
 * Render Message Input Box
 *
 * @param  {object} props - Necessary data for message input
 * @returns {HTMLElement} - Render Perfect message input box
 */
function MessageInput(props) {
  const { text, onSendMessage, handleKeyup, handleKeyPress } = props;
  const classes = useStyles();

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);

    return (text.current.value += emoji);
  };

  const [pickerMode, setPicketMode] = React.useState(false);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar style={{ alignItems: "flex-end", marginBottom: 10 }}>
          <div className={classes.search}>
            <InputBase
              placeholder="Write your message..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onKeyPress={handleKeyPress}
              onKeyUp={handleKeyup}
              onClick={() => setPicketMode(false)}
              multiline
              rowsMax={4}
              inputRef={text}
              inputProps={{ "aria-label": "search" }}
            />

            <div
              style={{
                alignSelf: "flex-end",
              }}>
              <IconButton onClick={() => setPicketMode(!pickerMode)}>
                <InsertEmoticonIcon />
              </IconButton>
              {pickerMode && (
                <Picker
                  set="apple"
                  onSelect={addEmoji}
                  style={{
                    position: "absolute",
                    bottom: "55px",
                    right: "-70px",
                  }}
                />
              )}
            </div>
          </div>

          <IconButton
            edge="right"
            color="primary"
            aria-label="send"
            type="submit"
            disabled={!text.current.value}
            onClick={onSendMessage}>
            <SendIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

MessageInput.propTypes = {
  text: PropTypes.any,
  onSendMessage: PropTypes.func,
  handleKeyup: PropTypes.func,
  handleKeyPress: PropTypes.func,
};

export default MessageInput;
