import React, { useContext, useEffect, useState } from 'react'
import { AUTH, GoogleAUTH, DB } from '@core/services/firebase'

const firebaseAuth = React.createContext()

const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState('initial')   //initial/user/guest
    const [currentUser, setCurrentUser] = useState({}) 
    const [errorCode, setErrorCode] = useState('')
    const [role, setRole] = useState({})
    const [userData, setUserData] = useState({})

    const authMethods = {
        emailSignup : (email, password, displayName) => {
            return AUTH.createUserWithEmailAndPassword(email, password)
                .then(async res => {
                    const avatar = `https://ui-avatars.com/api/?name=${displayName}&background=random&bold=true`

                    const data = await res.user.updateProfile({
                        displayName: displayName,
                        photoURL : avatar
                    })

                    DB.collection('Users').doc(res.user.uid).set({
                        uid : res.user.uid,
                        displayName : displayName,
                        photoURL : avatar
                    })

                    setCurrentUser(data.user) 
                })
                .catch(err => setErrorCode(err.code))
        },

        emailSignin : (email, password) => {
            return AUTH.signInWithEmailAndPassword(email, password)
                .then(res => setCurrentUser(res.user))  
                .catch(err => setErrorCode(err.code))
        },

        google : () => {
            GoogleAUTH.addScope('profile')
            GoogleAUTH.addScope('email')

            return AUTH.signInWithPopup(GoogleAUTH).then(res => {
                if(res.additionalUserInfo.isNewUser){
                    DB.collection('Users').doc(res.user.uid).set({
                        uid : res.user.uid,
                        displayName : res.user.displayName,
                        photoURL : res.user.photoURL
                    })
                }

                setCurrentUser(res.user)
            })
            .catch(err => setErrorCode(err.code))
        },

        signout : () => {
            AUTH.signOut()
        }
    }

         
    const refreshUserData = (uid = currentUser.uid) => {
        console.log('Refetching user data...')
        DB.collection('Users').doc(uid).get()
        .then(doc => setUserData(doc.data()))
    }   
        
    useEffect(() => {
        const unsubscribe = AUTH.onAuthStateChanged(user => {
            if(user) {
                user.getIdTokenResult().then(res => {
                    setCurrentUser(user)
                    setRole({
                        admin: res.claims.admin
                    })
                    setAuthState('user')
                    refreshUserData(user.uid)
                })
            }
            else {
                setCurrentUser({})
                setRole({})
                setAuthState('guest')
            }
        })
        return unsubscribe
    }, [])
    
    return (
        <firebaseAuth.Provider value={{
            authMethods,
            authState,
            currentUser,
            role,
            errorCode,
            setErrorCode,
            userData,
            refreshUserData
        }}>
            { children }
        </firebaseAuth.Provider>
    )
}

export default AuthProvider
export const useAuth = () => useContext(firebaseAuth)