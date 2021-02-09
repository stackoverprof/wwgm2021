import React, { useState } from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import axios from 'axios'
import to from '@core/routepath'
import { useAuth } from '@core/contexts/AuthContext'
import UserOnlyRoute from '@core/routeblocks/UserOnlyRoute'

import MainLayout from '@components/layouts/MainLayout'
import Spinner from '@components/atomic/spinner/Circle'
import AlertHandler from '@components/atomic/AlertHandler'
    
const Dashboard = () => {
    const { user, access, authMethods } = useAuth()
    const [alert, setAlert] = useState('')
    const [issuedEmail, setIssuedEmail] = useState('')

    const handleSetAdmin = async (e) => {
        e.preventDefault()
        setAlert(null)
        
        axios.post('/api/private/admin/set', {
            userToken: await user.getIdToken(),
            email: issuedEmail
        })
        .then(res => setAlert({error: false, body: res.data.message}))
        .catch(err => setAlert({error: true, body: err.response.data.message}))
    }

    return (
        <UserOnlyRoute redirect={to.home}>
            {user && (
                <MainLayout css={style}>
                    <p>Dashboard of {user.displayName}</p>
                    <div className="control">
                        <img src={user.photoURL} alt=""/>
                        <Link href={to.home}><button className="btn">Back Home</button></Link>
                        <button className="btn red" onClick={authMethods.signout}>LOGOUT</button>
                    </div>
                    <p>Admin Status : {access.admin ? 'admin' : 'false'}</p>
                    {access.admin && (
                        <form onSubmit={handleSetAdmin}>
                            <input type="email" value={issuedEmail} required onChange={e => setIssuedEmail(e.target.value)}/>
                            <button className="btn" type="submit">{alert === null ? <Spinner /> : 'set admin'}</button>
                        </form>
                    )}
                    {alert && <AlertHandler message={alert.body} closeHandler={() => setAlert('')} color={alert.error ? 'red' : 'default'}/>}
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
    padding-top: 54px;

    form{
        margin-top: 24px;
    }

    @media (max-width: 580px) {
        
        .control, form{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
    }

    .alert-box{
        position: fixed;
        bottom: 32px;
        padding: 12px 32px;
        background: #0006;
        border-radius: 4px;
        color: white;
    }
    
    div{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    img{
        margin: 24px;
    }

    input{
        border: 1px solid #000;
    }
`
    
export default Dashboard