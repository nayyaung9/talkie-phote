import React, { useEffect } from "react";
import { messaging } from "../init-fcm";
import axios from "axios";

const NotiPage = () => {
  useEffect(() => {
    messaging
      .requestPermission()
      .then(async function () {
        const token = await messaging.getToken();
        console.log("TOKEN", token);
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
    navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
  }, []);

  const fetchOptions = {
    body: {
      collapse_key: "type_a",
      notification: {
        body: "Body of Your Notification",
        title: "Title of Your Notification",
        icon: "http://www.liberaldictionary.com/wp-content/uploads/2019/02/icon-0326.jpg",
      },
      data: {
        body: "Body of Your Notification in Data",
        title: "Title of Your Notification in Title",
        key_1: "Value for key_1",
        key_2: "Value for key_2",
      },
      to:
        "dLaiVfm1uoLmfEzsWsKHp9:APA91bFe4rC9tKdoTI5_7rTt-Qsr-K0j32wscWvDHml2qJCPHP73v3bWIWXpb2BuXqOLeTrjU8s3xHlspblETBQufQdzGoFig9esVExKk16nSlTL6n_dQLYBfF6Gco6eaYdaAVcL-7zy",
    },
  };

  const onSendMessage = () => {
    axios
      .post("https://fcm.googleapis.com/fcm/send", fetchOptions, {
        headers: {
          Authorization:
            "AAAAnkUgEbM:APA91bGgOiGaDcLFmsURPYh7OyjV1bCkE_YOXoORbJYebqK3Z8hSDsB1hy99aDqSuFkTA46-tDczI3Je02RZOrSN98L9ohm7FUzKZyCZDS8l6MTrD0LMAOr1GubKnaW9EXUY65bxY7Cm",
        },
      })
      .then((res) => {
        console.log("RES", res);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  return (
    <div>
      <h1>NotiPage</h1>
      <button onClick={onSendMessage}>Send a message</button>
    </div>
  );
};

export default NotiPage;
