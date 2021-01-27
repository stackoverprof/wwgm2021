import React, { useState } from 'react'
import { css } from '@emotion/css'
import Link from 'next/link'
import axios from 'axios'
import { useAuth } from '../core/contexts/AuthContext'
import UserOnlyRoute from '../core/routeblocks/UserOnlyRoute'
import MainLayout from '../components/layouts/MainLayout'
    
const Dashboard = () => {
    const { currentUser, authMethods } = useAuth()
    const [role, setRole] = useState('initial')

    const CheckRole = async () => {
        axios.post('/api/admin/set', {
            userToken: await currentUser.getIdToken(),
            email: 'zvezda.estrella.ze@gmail.com'
        })
        .then(res => {
            console.log(res)
            setRole(res.data.message)
        })
        .catch(err => {
            console.log(err.response.data)
            setRole(err.response.data.message)
        })
    }

    return (
        <UserOnlyRoute redirect="/login">
            {currentUser && (
                <MainLayout className={style}>
                    <img src="" alt=""/>
                    <p>Dashboard of {currentUser.displayName} {role}</p>
                    <div>
                        <img src={currentUser.photoURL} alt=""/>
                        <Link href="/"><button>BACK HOME</button></Link>
                        <button onClick={CheckRole}>check role</button>
                        <button onClick={authMethods.handleSignout} className="red">LOGOUT</button>
                    </div>
                </MainLayout>
            )}
        </UserOnlyRoute>
    )
}
const style = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    div{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    p{

        margin-top: 54px;
        text-align: center;
    }
`
    
export default Dashboard