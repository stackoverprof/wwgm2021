import firebase from 'firebase/app'

import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAydGicvm4iwHUgV8uW4sgoSvZG_T2f8sw",
    authDomain: "areks-gm.firebaseapp.com",
    projectId: "areks-gm",
    storageBucket: "areks-gm.appspot.com",
    messagingSenderId: "189477264449",
    appId: "1:189477264449:web:fee71f0abce80489013ac0",
}

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)

export default firebase
export const DB = firebase.firestore()
export const AUTH = firebase.auth()
export const GoogleAUTH = new firebase.auth.GoogleAuthProvider()