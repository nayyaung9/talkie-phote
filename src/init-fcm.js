// import * as firebase from "firebase/app";
// import "firebase/messaging";
import firebase from "firebase";

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
messaging.usePublicVapidKey(
  // Project Settings => Cloud Messaging => Web Push certificates
  "BFG-p0xudNiSEMVIfge4DwkepmrmueYy7ktKnDeLPbyqcJsAVN4bWtAzYQHKZCB79xZpS9TJTugoIW_PHH6IR28",
);
export { messaging };
