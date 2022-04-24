import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCfReDSeIYqhFMRsGODtyvQfEhcDgeCjFA",
    authDomain: "whatsapp-clone-2f7da.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-2f7da.firebaseio.com",
    projectId: "whatsapp-clone-2f7da",
    storageBucket: "whatsapp-clone-2f7da.appspot.com",
    messagingSenderId: "443884726307",
    appId: "1:443884726307:web:f2a01a39f1c2c1dd9e2996",
    measurementId: "G-CRTNC2D06H"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth =firebase.auth();
const provider =new firebase.auth.GoogleAuthProvider()

export {auth, provider};
export default db;