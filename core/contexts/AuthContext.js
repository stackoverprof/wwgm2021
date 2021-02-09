import React, { useContext, useEffect, useState } from 'react'
import { AUTH, GoogleAUTH, DB } from '@core/services/firebase'

const firebaseAuth = React.createContext()

const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState('initial')   //initial/user/guest
    const [user, setUser] = useState({}) 
    const [userData, setUserData] = useState({})
    const [errorCode, setErrorCode] = useState('')

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

                    setUser(data.user) 
                })
                .catch(err => setErrorCode(err.code))
        },

        emailSignin : (email, password) => {
            return AUTH.signInWithEmailAndPassword(email, password)
                .then(res => setUser(res.user))  
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

                setUser(res.user)
            })
            .catch(err => setErrorCode(err.code))
        },

        signout : () => {
            AUTH.signOut()
        }
    }

         
    const refreshUserData = (uid = user.uid) => {
        console.log('Refetching user data...')
        DB.collection('Users').doc(uid).get()
        .then(doc => setUserData(doc.data()))
    }   
        
    useEffect(() => {
        const unsubscribe = AUTH.onAuthStateChanged(userAuth => {
            if(userAuth) {
                refreshUserData(userAuth.uid)
                setAuthState('user')
                userAuth.getIdTokenResult().then(res => {
                    setUser({ role: { admin: res.claims.admin }, ...userAuth })
                })
            }
            else {
                setUserData({})
                setUser({})
                setAuthState('guest')
            }
        })
        return unsubscribe
    }, [])
    
    return (
        <firebaseAuth.Provider value={{
            authMethods,
            authState,
            user,
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