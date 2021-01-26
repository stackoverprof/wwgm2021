import React from 'react'
import Navbar from '../molecular/Navbar'
import Styled from '@emotion/styled'

const HomeLayout = ({children}) => {

    return (
        <Wrapper>
            <Navbar big/>
            {children}
        </Wrapper>
    )
}

const Wrapper = Styled.div(() =>`
    padding-top: 88px;
    
`)

export default HomeLayout