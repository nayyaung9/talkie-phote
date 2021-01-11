import React, { useEffect } from "react";
import { messaging } from "../init-fcm";

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

  return (
    <div>
      <h1>NotiPage</h1>
    </div>
  );
};

export default NotiPage;
