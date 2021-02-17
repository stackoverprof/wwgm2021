import React, { useContext, useEffect, useState } from 'react'
import { AUTH, GoogleAUTH } from '@core/services/firebase'
import { useRouter } from 'next/router'
import axios from 'axios'
import to from '@core/routepath'
import getAvatar from '@core/utils/getAvatar'
import FireFetcher from '@core/services/FireFetcher'

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

    const initialData = (displayName) => {
        return {
            displayName : displayName,
            photoURL : getAvatar(),
            fullName : '',
            contact: '',
            province: '',
            city: '',
            school: ''
        }
    }

    const authMethods = {
        google : () => {
            GoogleAUTH.addScope('profile')
            GoogleAUTH.addScope('email')

            const handleSignUp = async (res) => {
                await FireFetcher.initUserDatabase(res.user.uid, initialData(res.user.displayName))
                    .then(async () => {
                        axios.post('/api/user/user-data/init', {
                            authToken: await res.user.getIdToken()
                        })
                    })
                setIsNew(true)
            }

            return AUTH.signInWithPopup(GoogleAUTH).then(async res => {
                if (res.additionalUserInfo.isNewUser) {
                    handleSignUp(res)
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

    const checkCompletion = (data) => {
        let isCompleted = true
        const fields = ['fullName', 'displayName', 'contact', 'province', 'city', 'school']
        for (const field of fields) {
            if (!data[field]) isCompleted = false
        }
        setDataCompleted(isCompleted)
    }
         
    const listenUserData = (uid) => {
        FireFetcher.listen.userData(uid, (doc) => {
            setUserData(doc.data())
            checkCompletion(doc.data())
            console.log('listened...')
        }, () => {
            setUserData({})
        })
    }   

    useEffect(() => {
        const unsubscribe = AUTH.onAuthStateChanged(async user => {
            if(user) {
                setAccess({ admin: await user.getIdTokenResult().then(res => res.claims.admin)})
                listenUserData(user.uid)
                setUser(user) 
                setAuthState('user')
            } else {
                setAuthState('guest')
                setUser({})
                setAccess({})
                setIsNew(false)
                setDataCompleted(false)
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
            dataCompleted
        }}>
            { children }
        </firebaseAuth.Provider>
    )
}

export default AuthProvider
export const useAuth = () => useContext(firebaseAuth)