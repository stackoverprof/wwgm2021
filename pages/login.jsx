import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import to from '../core/routepath'
import { useAuth } from '../core/contexts/AuthContext'
import GuestOnlyRoute from '../core/routeblocks/GuestOnlyRoute'

import MainLayout from '../components/layouts/MainLayout'
import GoogleAuth from '../components/atomic/GoogleAuth'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { authMethods, errorCode, setErrorCode } = useAuth()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setErrorCode('')
        authMethods.handleSignin(email, password)
            .catch(() => setPassword(''))
    }

    useEffect(() => {
        return () => setErrorCode('')
    }, [])

    return (
        <GuestOnlyRoute redirect={to.dashboard}>
            <MainLayout style={style}>
                {errorCode !== '' && <p className="error-message">{errorCode}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">EMAIL</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required id="email" placeholder="Masukan Email"/>
                    </div>
                    <div>
                        <label htmlFor="email">PASSWORD</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required id="password" placeholder="Masukan Password"/>
                    </div>
                    <button type="submit">LOGIN</button>
                </form>
                
                <GoogleAuth />

                <div className="links">
                    <Link href={to.register}>Register Instead</Link>
                    |
                    <Link href={to.home}>Back Home</Link>
                </div>
            </MainLayout>
        </GuestOnlyRoute>
    )
}

const style = css`
    position: fixed;
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    form{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-bottom: 102px;
        
        div{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            margin: 8px 0;

            label{
                margin-bottom: 4px;
            }
        }
    }

    .links{
        display: flex;
        justify-content: center;
        align-items: center;

        a{
            margin: 12px;
        }
    }
`

export default Login