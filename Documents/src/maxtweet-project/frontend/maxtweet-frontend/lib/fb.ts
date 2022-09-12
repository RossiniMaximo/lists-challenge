import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAW38OUDnIEk0pGnoVxamB6G78zVnjNkp4",
  authDomain: "maxtweeter-app.firebaseapp.com",
  databaseURL: "https://maxtweeter-app-default-rtdb.firebaseio.com",
  projectId: "maxtweeter-app",
  storageBucket: "maxtweeter-app.appspot.com",
  messagingSenderId: "71751480901",
  appId: "1:71751480901:web:b504536d6d5121d251952c",
};
const app = firebase.initializeApp(firebaseConfig);

export { app };
