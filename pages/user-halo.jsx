import React, { useState } from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import to from '@core/routepath'
import axios from 'axios'
import { useAuth } from '@core/contexts/AuthContext'
import UserOnlyRoute from '@core/routeblocks/UserOnlyRoute'

import MainLayout from '@components/layouts/MainLayout'
import Spinner from '@components/atomic/spinner/Circle'
    
const Dashboard = () => {
    const { currentUser, authMethods } = useAuth()
    const [data, setData] = useState('')

    const CheckRole = async () => {
        setData(null)
        
        axios.post('/api/user/halo', {
            authToken: await currentUser.getIdToken()
        })
        .then(res => setData(res.data.message))
        .catch(err => setData(err.response.data.message))
    }

    return (
        <UserOnlyRoute redirect={to.login}>
            {currentUser && (
                <MainLayout style={style}>
                    <p>Dashboard of {currentUser.displayName}</p>
                    <div>
                        <img src={currentUser.photoURL} alt=""/>
                        <Link href={to.home}><button>BACK HOME</button></Link>
                        <button onClick={CheckRole}>{data === null ? <Spinner /> : 'api user'}</button>
                        <button onClick={authMethods.handleSignout} className="red">LOGOUT</button>
                    </div>
                    <p>{data}</p>
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