import React, { useState } from 'react'
import Styled from '@emotion/styled'
import Link from 'next/link'
import { useAuth } from '../core/contexts/AuthContext'
import UserOnlyRoute from '../core/customRoute/UserOnlyRoute'
import axios from 'axios'
    
const Dashboard = () => {
    const { currentUser, authMethods } = useAuth()
    const [role, setRole] = useState('user')

    const CheckRole = async () => {
        const res = await axios.post('/api/hello', {
            userToken: await currentUser.getIdToken()
        })
        setRole(res.data.body)
    }

    return (
        <UserOnlyRoute redirect="/login">
            {currentUser && 
                <Wrapper>
                    <img src="" alt=""/>
                    <p>Dashboard of {currentUser.displayName} {role}</p>
                    <div>
                        <img src={currentUser.photoURL} alt=""/>
                        <Link href="/"><button>BACK HOME</button></Link>
                        <button onClick={CheckRole}>check role</button>
                        <button onClick={authMethods.handleSignout} className="red">LOGOUT</button>
                    </div>
                </Wrapper>
            }
        </UserOnlyRoute>
    )
}

// Dashboard.getInitialProps = async () => {
//     const res = await axios.post('https://localhost:3000/api/hello')
//     return { userProfile: res.name }
// }

const Wrapper = Styled.div(() =>`
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
`)
    
export default Dashboard