import React, { useContext, useEffect, useState } from 'react'
import { AUTH, GoogleAUTH, DB } from '@core/services/firebase'

const firebaseAuth = React.createContext()

const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState('initial')   //initial/user/guest
    const [user, setUser] = useState({})
    const [access, setAccess] = useState({})
    const [userData, setUserData] = useState({})
    const [errorAuth, setErrorAuth] = useState('')

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
                        photoURL : avatar,
                        fullName : '',
                        contact: '',
                        province: '',
                        city: '',
                        school: '',
                        noPeserta: '',
                        examsAccess: []
                    })

                    setUser(data.user) 
                })
                .catch(err => setErrorAuth(err.code))
        },

        emailSignin : (email, password) => {
            return AUTH.signInWithEmailAndPassword(email, password)
                .then(res => setUser(res.user))  
                .catch(err => setErrorAuth(err.code))
        },

        google : () => {
            GoogleAUTH.addScope('profile')
            GoogleAUTH.addScope('email')

            return AUTH.signInWithPopup(GoogleAUTH).then(res => {
                if(res.additionalUserInfo.isNewUser){
                    DB.collection('Users').doc(res.user.uid).set({
                        uid : res.user.uid,
                        displayName : res.user.displayName,
                        fullName : '',
                        photoURL : res.user.photoURL,
                        contact: '',
                        province: '',
                        city: '',
                        school: '',
                        noPeserta: '',
                        examsAccess: []
                    })
                }

                setUser(res.user)
            })
            .catch(err => setErrorAuth(err.code))
        },

        signout : () => {
            return AUTH.signOut()
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
                setAuthState('user')
                setUser(userAuth)
                refreshUserData(userAuth.uid)
                userAuth.getIdTokenResult().then(res => {
                    setAccess({ admin: res.claims.admin })
                })
            }
            else {
                setAuthState('guest')
                setUser({})
                setUserData({})
                setAccess({})
            }
        })
        return unsubscribe
    }, [])
    
    return (
        <firebaseAuth.Provider value={{
            authMethods,
            authState,
            user,
            access,
            userData,
            errorAuth,
            setErrorAuth,
            refreshUserData,
        }}>
            { children }
        </firebaseAuth.Provider>
    )
}

export default AuthProvider
export const useAuth = () => useContext(firebaseAuth)