import React, { useContext, useEffect, useState } from 'react'
import { AUTH, GoogleAUTH, DB } from '@core/services/firebase'
import axios from 'axios'

const firebaseAuth = React.createContext()

const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState('initial')   //initial/user/guest
    const [user, setUser] = useState({})
    const [access, setAccess] = useState({})
    const [userData, setUserData] = useState({})
    const [isNew, setIsNew] = useState(false)
    const [errorAuth, setErrorAuth] = useState('')

    const profileData = (displayName, img) => {
        return {
            displayName : displayName,
            photoURL : img,
            fullName : '',
            contact: '',
            province: '',
            city: '',
            school: '',
            noPeserta: ''
        }
    }

    const authMethods = {
        emailSignup : (email, password, displayName) => {
            return AUTH.createUserWithEmailAndPassword(email, password)
                .then(async res => {
                    const avatar = `https://ui-avatars.com/api/?name=${displayName}&background=random&bold=true`

                    const data = await res.user.updateProfile({
                        displayName: displayName,
                        photoURL : avatar
                    })

                    DB.collection('Users').doc(res.user.uid).set(profileData(displayName, avatar))

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

            return AUTH.signInWithPopup(GoogleAUTH).then(async res => {

                if(res.additionalUserInfo.isNewUser){
                    DB.collection('Users').doc(res.user.uid)
                    .set(profileData(res.user.displayName, res.user.photoURL))

                    axios.post('/api/user/user-data/exams-access', {
                        authToken: await user.getIdToken()
                    })
                    
                    setIsNew(true)
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
        DB.collection('Users').doc(uid).get()
        .then(doc => setUserData(doc.data()))
    }   

    useEffect(() => {
        console.log(userData)
    }, [userData])
        
    useEffect(() => {
        const unsubscribe = AUTH.onAuthStateChanged(user => {
            if(user) {
                setAuthState('user')
                setUser(user) 
                refreshUserData(user.uid)
                user.getIdTokenResult().then(res => {
                    setAccess({ admin: res.claims.admin })
                })
            }
            else {
                setAuthState('guest')
                setUser({})
                setUserData({})
                setAccess({})
                setIsNew(false)
            }
        })
        return unsubscribe
    }, [])

    return (
        <firebaseAuth.Provider value={{
            authMethods,
            authState,
            user,
            isNew,
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