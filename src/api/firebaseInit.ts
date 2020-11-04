import Firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyD-4ssz63mrItFeo-YPTpcN_awwQ4LD4aw",
    authDomain: "crusade-9ea10.firebaseapp.com",
    databaseURL: "https://crusade-9ea10.firebaseio.com",
    projectId: "crusade-9ea10",
    storageBucket: "crusade-9ea10.appspot.com",
    messagingSenderId: "1057057635214",
    appId: "1:1057057635214:web:1ba0b1bef51c6c8c7b02df",
    measurementId: "G-5DLZNJKP10"
  };



export default Firebase.initializeApp(firebaseConfig);


// firebase.analytics();
