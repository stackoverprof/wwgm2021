import firebase from 'firebase/app'

import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAydGicvm4iwHUgV8uW4sgoSvZG_T2f8sw",
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
}

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)

export default firebase
export const DB = firebase.firestore()
export const AUTH = firebase.auth()
export const GoogleAUTH = new firebase.auth.GoogleAuthProvider()