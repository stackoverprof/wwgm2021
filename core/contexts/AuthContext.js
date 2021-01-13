import React, { useContext, useEffect, useState } from 'react'
import { AUTH, GoogleAUTH } from '../services/firebase'

const firebaseAuth = React.createContext()

const AuthProvider = ({children}) => {
    const [authState, setauthState] = useState('initial')
    const [currentUser, setcurrentUser] = useState({})
    const [errorCode, seterrorCode] = useState('')

    const authMethods = {
        handleSignup : (email, password, displayName) => {
            return AUTH.createUserWithEmailAndPassword(email, password)
                .then(async res => {
                    const data = await res.user.updateProfile({
                        displayName: displayName
                    })
                    setcurrentUser(data.user)
                })
                .catch(err => seterrorCode(err.code))
        },

        handleSignin : (email, password) => {
            return AUTH.signInWithEmailAndPassword(email, password)
                .then(res => setcurrentUser(res.user))  
                .catch(err => seterrorCode(err.code))
        },

        handleGoogle : () => {
            GoogleAUTH.addScope('profile')
            GoogleAUTH.addScope('email')

            return AUTH.signInWithPopup(GoogleAUTH).then((res)=>{
                if(res.additionalUserInfo.isNewUser){
                    db.collection("Profile").doc(res.user.uid).set({
                        uid : res.user.uid,
                        displayName : res.user.displayName,
                        photoURL : res.user.photoURL
                    })
                    .then(() => console.log("Signed up"))
                } 
                else console.log('Signed in')
            })
            .then(res => setcurrentUser(res.user))
            .catch(err => seterrorCode(err.code))
        },

        handleSignout : () => {
            AUTH.signOut()
        }
    }
        
    useEffect(() => {        
        const unsubscribe = AUTH.onAuthStateChanged(user => {
            if(user) setauthState('user')
            else setauthState('guest')
            setcurrentUser(user)
        })
        return unsubscribe
    }, [])
    
    return (
        <firebaseAuth.Provider value={{
            authMethods,
            authState,
            currentUser,
            errorCode,
            seterrorCode
        }}>
            {children}
        </firebaseAuth.Provider>
    )
}

export default AuthProvider
export const useAuth = () => useContext(firebaseAuth)