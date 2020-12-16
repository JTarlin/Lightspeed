import Firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCqCbOLXezX19K1EV8cvo1jfZbBaw3hfdU",
    authDomain: "lightspeed-97661.firebaseapp.com",
    databaseURL: "https://lightspeed-97661-default-rtdb.firebaseio.com",
    projectId: "lightspeed-97661",
    storageBucket: "lightspeed-97661.appspot.com",
    messagingSenderId: "483438876897",
    appId: "1:483438876897:web:9510bd84db91123771ffa0",
    measurementId: "G-S6KQKL0H3R"
};


const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();