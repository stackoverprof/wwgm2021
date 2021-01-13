import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Styled from '@emotion/styled'
import { useAuth } from '../core/contexts/AuthContext'
import GuestOnlyRoute from '../core/customRoute/GuestOnlyRoute'

const Register = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [displayName, setdisplayName] = useState('')

    const { authMethods, errorCode, seterrorCode } = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()
        seterrorCode('')
        authMethods.handleSignup(email, password, displayName)
            .catch(() => setpassword(''))
    }

    useEffect(() => {
        return seterrorCode('')
    }, [])

    return (
        <GuestOnlyRoute redirect="/dashboard">
            <Wrapper>
                {errorCode != '' && <p className="error-message">{errorCode}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="diplay-name">NAMA</label>
                        <input type="text" onChange={(e) => setdisplayName(e.target.value)} value={displayName} required id="display-name" placeholder="Masukan Nama"/>
                    </div>
                    <div>
                        <label htmlFor="email">EMAIL</label>
                        <input type="email" onChange={(e) => setemail(e.target.value)} value={email} required id="email" placeholder="Masukan Email"/>
                    </div>
                    <div>
                        <label htmlFor="password">PASSWORD</label>
                        <input type="password" onChange={(e) => setpassword(e.target.value)} value={password} required id="password" placeholder="Masukan Password"/>
                    </div>
                    <button type="submit">REGISTER</button>
                </form>
                <div className="links">
                    <Link href="/login">Login Instead</Link>
                    |
                    <Link href="/">Back Home</Link>
                </div>
            </Wrapper>
        </GuestOnlyRoute>
    )
}

const Wrapper = Styled.div(() =>`
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
`)

export default Register