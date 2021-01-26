import React from 'react'
import Navbar from '../molecular/Navbar'
import Styled from '@emotion/styled'

const MainLayout = ({children}) => {

    return (
        <Wrapper>
            <Navbar/>
            {children}
        </Wrapper>
    )
}

const Wrapper = Styled.div(() =>`
    padding-top: 60px;
`)

export default MainLayout