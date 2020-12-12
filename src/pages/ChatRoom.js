import React, { useState, useEffect, useRef } from "react";
import AppWrapper from "../components/AppWrapper";
import {
  makeStyles,
  Paper,
  TextField,
  Button,
  Avatar,
  Typography,
  Tooltip,
} from "@material-ui/core";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import moment from "moment";
import MessageInput from "../components/chat/MessageInput";
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    boxShadow: "none",
  },

  container: {
    bottom: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  bubbleContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  bubbleRight: {
    border: "0.5px solid #0099ff",
    background: "#0099ff",
    color: "#fff",
    borderRadius: "10px",
    margin: "5px",
    padding: "10px",
  },
  bubbleLeft: {
    border: "0.5px solid #f2f2f2",
    background: "#f2f2f2",
    borderRadius: "10px",
    margin: "5px",
    padding: "10px",
  },
}));

const ChatRoom = () => {
  const { roomId } = useParams();

  // text message input
  const text = useRef("");
  const socketRef = useRef();
  const ENDPOINT = "https://api-talkie-phote.herokuapp.com";
  const classes = useStyles();
  // let roomId = "#alpha8";
  const auth = useSelector((state) => state.auth.user);

  useEffect(() => {
    socketRef.current = io(ENDPOINT, {
      query: { roomId },
    });

    socketRef.current.on("received", (message) => {
      const incomingMessages = {
        ...message,
        ownedByCurrentUser: message.data.user._id === auth._id,
      };
      setItems((items) => [...items, incomingMessages]);
    });

 
  }, [roomId]);



  const [items, setItems] = useState([]);


  const onSendMessage = (e) => {
    e.preventDefault();
    const payload = {
      message: text.current.value,
      user: auth,
    };

    socketRef.current.emit("event://send-message", JSON.stringify(payload));
  };

  return (
    <AppWrapper>
      <div style={{ background: "#fff", height: "100%" }}>
        <Paper className={classes.paper}>
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
                    <Tooltip title="Add" arrow placement="left-start">
                      <div>
                        {!item.ownedByCurrentUser && (
                          <Typography
                            component="span"
                            color="textSecondary"
                            gutterBottom
                            style={{ paddingLeft: 8, fontSize: 12 }}
                          >
                            {item.data.user.fullname}
                          </Typography>
                        )}

                        <div
                          key={i}
                          className={
                            item.ownedByCurrentUser
                              ? classes.bubbleRight
                              : classes.bubbleLeft
                          }
                        >
                          <div className={classes.button}>
                            {item.data.message}
                          </div>
                        </div>
                      </div>
                    </Tooltip>
                  </div>
                </React.Fragment>
              ))}
          </div>
          <MessageInput text={text} onSendMessage={onSendMessage} />
        </Paper>
      </div>
    </AppWrapper>
  );
};

export default ChatRoom;
