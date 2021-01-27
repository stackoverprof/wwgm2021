import React, { useState } from 'react'
import { css } from '@emotion/css'
import Link from 'next/link'
import to from '../core/routepath'
import axios from 'axios'
import { useAuth } from '../core/contexts/AuthContext'
import UserOnlyRoute from '../core/routeblocks/UserOnlyRoute'

import MainLayout from '../components/layouts/MainLayout'
import Spinner from '../components/atomic/Spinner'
    
const Dashboard = () => {
    const { currentUser, authMethods } = useAuth()
    const [data, setData] = useState('')

    const CheckRole = async () => {
        setData('_loading')
        
        axios.post('/api/admin/set', {
            userToken: await currentUser.getIdToken(),
            email: 'zvezda.esella.ze@gmail.com'
        })
        .then(res => {
            console.log(res)
            setData(res.data.message)
        })
        .catch(err => {
            console.log(err.response.data)
            setData(err.response.data.message)
        })
    }

    return (
        <UserOnlyRoute redirect={to.login}>
            {currentUser && (
                <MainLayout className={style}>
                    <img src="" alt=""/>
                    <p>Dashboard of {currentUser.displayName}</p>
                    <div>
                        <img src={currentUser.photoURL} alt=""/>
                        <Link href={to.home}><button>BACK HOME</button></Link>
                        <button onClick={CheckRole}>check data</button>
                        <button onClick={authMethods.handleSignout} className="red">LOGOUT</button>
                    </div>
                    <p>{data === '_loading' ? <Spinner /> : data}</p>
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