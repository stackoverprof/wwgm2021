import React, { useState } from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import axios from 'axios'
import { to }from '@core/routepath'
import { useAuth } from '@core/contexts/AuthContext'
import AdminOnlyRoute from '@core/routeblocks/AdminOnlyRoute'

import MainLayout from '@components/layouts/MainLayout'
import Spinner from '@components/atomic/spinner/Circle'
    
const Dashboard = () => {
    const { user, access, authMethods } = useAuth()
    const [data, setData] = useState('')

    const CheckRole = async () => {
        setData(null)
        
        axios.post('/api/private/exams/new', {
                authToken: await user.getIdToken(),
                })
        .then(res => setData(res.data.message))
        .catch(err => setData(err.response.data.message))
    }

    return (
        <AdminOnlyRoute redirect={to.home}>
            {user && (
                <MainLayout css={style}>
                    <p>Dashboard of {user.displayName}</p>
                    <div>
                        <img src={user.photoURL} alt=""/>
                        <Link href={to.home}><button>BACK HOME</button></Link>
                        <button onClick={CheckRole}>{data === null ? <Spinner /> : 'create exam'}</button>
                        <button onClick={authMethods.signOut} className="red">LOGOUT</button>
                    </div>
                    <p>Admin Status : {access.admin ? 'admin' : 'false'}</p>
                    <p>{data}</p>
                </MainLayout>
            )}
        </AdminOnlyRoute>
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