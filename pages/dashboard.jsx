import React from 'react'
import Styled from '@emotion/styled'
import Link from 'next/link'
import { useAuth } from '../core/contexts/AuthContext'
import UserOnlyRoute from '../core/customRoute/UserOnlyRoute'
    
const Dashboard = () => {
    const { currentUser, authMethods } = useAuth()

    return (
        <UserOnlyRoute redirect="/login">
            {currentUser && 
                <Wrapper>
                    <p>Dashboard of {currentUser.displayName}</p>
                    <div>
                        <Link href="/"><button>BACK HOME</button></Link>
                        <button onClick={authMethods.handleSignout} className="red">LOGOUT</button>
                    </div>
                </Wrapper>
            }
        </UserOnlyRoute>
    )
}

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