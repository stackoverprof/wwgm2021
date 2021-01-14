import React from 'react'
import Styled from '@emotion/styled'
import Link from 'next/link'
import { useAuth } from '../core/contexts/AuthContext'
import UserOnlyRoute from '../core/customRoute/UserOnlyRoute'
    
const Dashboard = ({userProfile}) => {
    const { currentUser, authMethods } = useAuth()

    return (
        <UserOnlyRoute redirect="/login">
            {currentUser && 
                <Wrapper>
                    <img src="" alt=""/>
                    <p>Dashboard of {currentUser.displayName} {userProfile}</p>
                    <div>
                        <img src={currentUser.photoURL} alt=""/>
                        <Link href="/"><button>BACK HOME</button></Link>
                        <button onClick={authMethods.handleSignout} className="red">LOGOUT</button>
                    </div>
                </Wrapper>
            }
        </UserOnlyRoute>
    )
}

Dashboard.getInitialProps = async () => {
    const userProfile = "haha"
    return {userProfile : userProfile}
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