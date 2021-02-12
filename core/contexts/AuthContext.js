import React, { useContext, useEffect, useState } from 'react'
import { AUTH, GoogleAUTH, DB } from '@core/services/firebase'
import { useRouter } from 'next/router'
import axios from 'axios'
import to from '@core/routepath'

const firebaseAuth = React.createContext()

const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState('initial')   //initial/user/guest
    const [user, setUser] = useState({})
    const [access, setAccess] = useState({})
    const [userData, setUserData] = useState({})
    const [isNew, setIsNew] = useState(false)
    const [dataCompleted, setDataCompleted] = useState(false)
    const [errorAuth, setErrorAuth] = useState('')

    const router = useRouter()

    const initialData = (displayName, photoURL) => {
        return {
            displayName : displayName,
            photoURL : photoURL,
            fullName : '',
            contact: '',
            province: '',
            city: '',
            school: '',
            noPeserta: ''
        }
    }

    const authMethods = {
        emailSignUp : (email, password, displayName) => {
            return AUTH.createUserWithEmailAndPassword(email, password)
                .then(async res => {
                    const avatar = `https://ui-avatars.com/api/?name=${displayName}&background=random&bold=true`

                    const data = await res.user.updateProfile({
                        displayName: displayName,
                        photoURL : avatar
                    })

                    DB.collection('Users').doc(res.user.uid).set(initialData(displayName, avatar))

                    setUser(data.user) 
                })
                .catch(err => setErrorAuth(err.code))
        },

        emailSignIn : (email, password) => {
            return AUTH.signInWithEmailAndPassword(email, password)
                .then(res => setUser(res.user))  
                .catch(err => setErrorAuth(err.code))
        },

        google : () => {
            GoogleAUTH.addScope('profile')
            GoogleAUTH.addScope('email')

            const handleSignUp = () => {
                return DB.collection('Users').doc(res.user.uid)
                    .set(initialData(res.user.displayName, res.user.photoURL))
                    .then(async () => {
                        await axios.post('/api/user/user-data/init', {
                            authToken: await res.user.getIdToken()
                        })
                        setIsNew(true)
                    })
            }

            return AUTH.signInWithPopup(GoogleAUTH).then(async res => {
                if(res.additionalUserInfo.isNewUser) {
                    await handleSignUp()
                }
                setUser(res.user)
            })
            .catch(err => setErrorAuth(err.code))
        },

        signOut : () => {
            setIsNew(false)
            router.push(to.home)
            return AUTH.signOut()
        }
    }
         
    const refreshUserData = (uid = user.uid) => {
        return DB.collection('Users').doc(uid).get()
        .then(doc => {
            const data = doc.data()
            setUserData(data)
        })
    }   

    const userDataCompletion = () => {
        let isCompleted = true
        const biodata = ['fullName', 'displayName', 'contact', 'province', 'city', 'school']

        for (const each of biodata) {
            if (!userData[each]) isCompleted = false
        }

        setDataCompleted(isCompleted)
    }

    useEffect(() => {
        userDataCompletion()
    }, [userData])
        
    useEffect(() => {
        const unsubscribe = AUTH.onAuthStateChanged(async user => {
            if(user) {
                setUser(user) 
                await refreshUserData(user.uid)
                await user.getIdTokenResult().then(res => {
                    setAccess({ admin: res.claims.admin })
                })
                setAuthState('user')
            } else {
                setUser({})
                setUserData({})
                setAccess({})
                setIsNew(false)
                setDataCompleted(false)
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
            isNew,
            access,
            userData,
            errorAuth,
            setErrorAuth,
            dataCompleted,
            refreshUserData
        }}>
            { children }
        </firebaseAuth.Provider>
    )
}

export default AuthProvider
export const useAuth = () => useContext(firebaseAuth)