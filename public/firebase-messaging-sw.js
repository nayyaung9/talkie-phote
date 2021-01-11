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

function receivePushNotification(event) {
  console.log("[Service Worker] Push Received.");
  console.log("evet", event);
  const { image, tag, url, title, text } = event.data.json();

  const options = {
    data: "this is data",
    body: "Hello",
    // icon: image,
    vibrate: [200, 100, 200],
    // image: image,
    badge: "https://spyna.it/icons/favicon.ico",
    actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }],
  };
  event.waitUntil(self.registration.showNotification("This is title :3", options));
}
self.serviceWorker.addEventListener("message", (message) => {
  console.log(message);
});

self.addEventListener("notificationclick", function (event) {
  console.log("[Service Worker] Notification click Received.", event);

  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
});
