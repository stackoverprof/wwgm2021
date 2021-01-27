import React, { useContext, useEffect, useState } from 'react'
import { AUTH, GoogleAUTH, DB } from '../services/firebase'

const firebaseAuth = React.createContext()

const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState('initial')
    const [currentUser, setCurrentUser] = useState({})
    const [errorCode, setErrorCode] = useState('')
    const [role, setRole] = useState({})

    const authMethods = {
        handleSignup : (email, password, displayName) => {
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

        handleSignin : (email, password) => {
            return AUTH.signInWithEmailAndPassword(email, password)
                .then(res => setCurrentUser(res.user))  
                .catch(err => setErrorCode(err.code))
        },

        handleGoogle : () => {
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

        handleSignout : () => {
            AUTH.signOut()
        }
    }
        
    useEffect(() => {     
        const fetchApproval = () => {
            return ['saintek-to-1', 'soshum-to-2', 'soshum-to-3']
        }   

        const unsubscribe = AUTH.onAuthStateChanged(user => {
            if(user) {
                setAuthState('user')
                user.getIdTokenResult().then(res => {
                    setCurrentUser(user)
                    setRole({
                        admin: res.claims.admin,
                        approved: fetchApproval().length !== 0,
                        access: fetchApproval()
                    })
                })
            }
            else setAuthState('guest')
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
            setErrorCode
        }}>
            { children }
        </firebaseAuth.Provider>
    )
}

export default AuthProvider
export const useAuth = () => useContext(firebaseAuth)