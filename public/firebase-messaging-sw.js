/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
// import * as firebase from "firebase/app";
// import "firebase/messaging";

const initializedFirebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCC1kZB1A76IjcKVZhGBouzA7o7SVg3dl0",
  authDomain: "talkie-phote.firebaseapp.com",
  projectId: "talkie-phote",
  storageBucket: "talkie-phote.appspot.com",
  messagingSenderId: "679764562355",
  appId: "1:679764562355:web:3aa8ec54ef22fe4de4fbc6",
  measurementId: "G-N0GW3306F6",
});

const messaging = initializedFirebaseApp.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      console.log("payload", payload);
      const notificationTitle = "Background Message Title";
      const notificationOptions = {
        body: "Background Message body.",
        icon: "/itwonders-web-logo.png",
      };
      return registration.showNotification(notificationTitle, notificationOptions);
    });
  return promiseChain;
});

self.addEventListener("notificationclick", function (event) {
  // do what you want
  // ...
});
