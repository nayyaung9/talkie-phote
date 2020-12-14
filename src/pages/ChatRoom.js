import React, { useState, useEffect, useRef } from "react";
import AppWrapper from "../components/AppWrapper";
import { makeStyles, Paper, Avatar, Typography } from "@material-ui/core";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import moment from "moment";
import MessageInput from "../components/chat/MessageInput";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    boxShadow: "none",
    background: "#eff7fe",
    height: "100%",
  },

  container: {
    // bottom: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  bubbleContainer: {
    width: "100%",
    display: "flex",
    // alignItems: "center",
    flexDirection: "row",
  },
  bubbleRight: {
    border: "0.5px solid #e5edf5",
    background: "#e5edf5",
    borderRadius: "10px",
    margin: "5px",
    padding: "10px",
    display: "inline-block",
  },
  bubbleLeft: {
    border: "0.5px solid #1c9dea",
    background: "#1c9dea",
    color: "#fff",
    borderRadius: "10px",
    margin: "5px",
    padding: "10px",
    display: "inline-block",
  },
}));

const ChatRoom = () => {
  const [items, setItems] = useState([]);
  const auth = useSelector((state) => state.auth.user);

  const classes = useStyles();
  const { roomId } = useParams();

  // text message input
  const text = useRef("");
  const socketRef = useRef();

  const ENDPOINT = "https://api-talkie-phote.herokuapp.com";
  // const ENDPOINT = "http://localhost:8000";

  const scrollToBottom = () => {
    const chat = document.getElementById("chat");
    chat.scrollTop = chat.scrollHeight;
  };

  useEffect(() => {
    socketRef.current = io(ENDPOINT, {
      query: { roomId },
    });

    socketRef.current.on("connect", function () {
      socketRef.current.emit("room", roomId);
    });

    // event://init-message
    socketRef.current.on("event://init-message", (message) => {
      setItems((items) => [message]);
      scrollToBottom();
    });

    socketRef.current.on("event://push-message", (message) => {
      setItems((items) => [...items, message]);
      scrollToBottom();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const onSendMessage = (e) => {
    e.preventDefault();
    const payload = {
      message: text.current.value,
      sender: auth,
      roomId,
    };

    socketRef.current.emit("event://send-message", JSON.stringify(payload));

    return (text.current.value = "");
  };

  // typing event

  const handleKeyPress = (event) => {
    if (event) {
      socketRef.current.emit("typing", JSON.stringify(auth));
    }
  };

  return (
    <AppWrapper>
      <div style={{ background: "#eff7fe", height: "100%" }}>
        <Paper className={classes.paper}>
          <div className={classes.container}>
            <div id="chat">
              {items &&
                items.map((data, i) => {
                  return data.map((item, i) => {
                    return (
                      <React.Fragment>
                        <div
                          className={`${classes.bubbleContainer} ${
                            item?.sender?._id === auth._id ? "right" : "left"
                          }`}
                          key={i}
                        >
                          {item?.sender?._id !== auth._id && (
                            <Avatar src={item?.sender?.avatar_url} />
                          )}

                          <div style={{ marginLeft: 8 }}>
                            <div>
                              <Typography
                                component="span"
                                color="inherit"
                                gutterBottom
                                style={{
                                  paddingLeft: 8,
                                  paddingRight: 8,
                                  fontSize: 12,
                                  fontWeight: "bold",
                                }}
                              >
                                {item?.sender?._id !== auth._id
                                  ? item?.sender?.fullname
                                  : "You"}
                              </Typography>
                              <Typography
                                component="span"
                                color="textSecondary"
                                style={{
                                  fontSize: 13,
                                  fontWeight: 300,
                                }}
                              >
                                {moment(item.createdAt).format("h:mm a")}
                              </Typography>
                            </div>

                            <div
                              key={i}
                              className={
                                item?.sender?._id === auth._id
                                  ? classes.bubbleRight
                                  : classes.bubbleLeft
                              }
                            >
                              <div>{item?.message}</div>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  });
                })}
            </div>
          </div>
          <MessageInput
            text={text}
            onSendMessage={onSendMessage}
            handleKeyPress={handleKeyPress}
          />
        </Paper>
      </div>
    </AppWrapper>
  );
};

export default ChatRoom;
