// Import the functions you need from the SDKs you need

// import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA3AiYbST45bM6WDWGJ4hHMCF4V39VlWmA",
    authDomain: "hearttest-edc43.firebaseapp.com",
    databaseURL: "https://hearttest-edc43-default-rtdb.firebaseio.com",
    projectId: "hearttest-edc43",
    storageBucket: "hearttest-edc43.appspot.com",
    messagingSenderId: "20603553136",
    appId: "1:20603553136:web:664b887c76c7e7c001bbb5",
    measurementId: "G-CERCHBZ7SH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);