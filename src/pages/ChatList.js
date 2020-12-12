import React, { useState, useEffect } from "react";
import AppWrapper from "../components/AppWrapper";
import {
  makeStyles,
  Paper,
  TextField,
  Button,
  Avatar,
} from "@material-ui/core";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    boxShadow: "none",
  },

  container: {
    bottom: 0,
    marginLeft: 10,
    marginRight: 10
  },
  bubbleContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  bubble: {
    border: "0.5px solid black",
    borderRadius: "10px",
    margin: "5px",
    padding: "10px",
    display: "inline-block",
  },
}));

const ChatList = () => {
  const ENDPOINT = "http://localhost:8000";
  const classes = useStyles();

  const auth = useSelector((state) => state.auth.user);

  let roomId = "#alpha8";

  var socket = io(ENDPOINT, {
    query: { roomId },
  });

  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("received", (message) => {
      const incomingMessages = {
        ...message,
        ownedByCurrentUser: message.data.user._id === auth._id,
      };
      setItems((items) => [...items, incomingMessages]);
    });
  }, []);

  const onSendMessage = (e) => {
    e.preventDefault();
    const payload = {
      message,
      user: auth,
    };

    socket.emit("event://send-message", JSON.stringify(payload));
  };

  return (
    <AppWrapper>
      <div style={{ padding: 10, background: "#ddd", height: "100vh" }}>
        <Paper className={classes.paper}>
          <form onSubmit={onSendMessage}>
            <TextField
              placeholder="Type a message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <Button type="submit">Send</Button>
          </form>
        </Paper>

        <Paper>
          <div className={classes.container}>
            {items &&
              items.map((item, i) => (
                <React.Fragment>
                  <div
                    className={`${classes.bubbleContainer} ${
                      item.ownedByCurrentUser ? "right" : "left"
                    }`}
                    key={i}
                  >
                    {!item.ownedByCurrentUser && (
                      <Avatar src={item.data.user.avatar_url} />
                    )}

                    <div key={i++} className={classes.bubble}>
                      <div className={classes.button}>{item.data.message}</div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
          </div>
        </Paper>
      </div>
    </AppWrapper>
  );
};

export default ChatList;
