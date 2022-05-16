// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const config = {
    apiKey: "AIzaSyB9T4Iy567fX4ydN9jKUg3vVfm2SKVCUfc",
    authDomain: "itransition-69c85.firebaseapp.com",
    projectId: "itransition-69c85",
    storageBucket: "itransition-69c85.appspot.com",
    messagingSenderId: "454595931588",
    appId: "1:454595931588:web:cbc8f742cf69532d76c891",
    measurementId: "G-GX9W8D12HJ"
}

firebase.initializeApp(config)

export default firebase
