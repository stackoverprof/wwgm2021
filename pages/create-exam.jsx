import React, { useState } from 'react'
import { css } from '@emotion/css'
import Link from 'next/link'
import to from '../core/routepath'
import axios from 'axios'
import { useAuth } from '../core/contexts/AuthContext'
import UserOnlyRoute from '../core/routeblocks/UserOnlyRoute'

import MainLayout from '../components/layouts/MainLayout'
import Spinner from '../components/atomic/spinner/Circle'
    
const Dashboard = () => {
    const { currentUser, role, authMethods } = useAuth()
    const [data, setData] = useState('')

    const CheckRole = async () => {
        setData(null)
        
        axios.post('/api/admin/manage/try-out/new', {
                userToken: await currentUser.getIdToken(),
                title: 'Try Out Soshum 1',
                cluster: 'SOSHUM',
                availability: {
                    status: 'limited',
                    start: 1611802800000,
                    end: 1611820800000
                },
                durations: {
                    TPS1: 15,
                    TPS2: 15,
                    TPS3: 15,
                    TPS4: 15,
                    TPA1: 20,
                    TPA2: 20,
                    TPA3: 20,
                    TPA4: 20,
                }
            })
        .then(res => setData(res.data.message))
        .catch(err => setData(err.response.data.message))
    }

    //TODO: admin only route
    return (
        <UserOnlyRoute redirect={to.login}>
            {currentUser && (
                <MainLayout className={style}>
                    <img src="" alt=""/>
                    <p>Dashboard of {currentUser.displayName}</p>
                    <div>
                        <img src={currentUser.photoURL} alt=""/>
                        <Link href={to.home}><button>BACK HOME</button></Link>
                        <button onClick={CheckRole}>{data === null ? <Spinner /> : 'create exam'}</button>
                        <button onClick={authMethods.handleSignout} className="red">LOGOUT</button>
                    </div>
                    <p>Admin Status : {role.admin ? 'admin' : 'false'}</p>
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