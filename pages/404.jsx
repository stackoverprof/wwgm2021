import React from 'react'
import Styled from '@emotion/styled'
    
const error404 = () => {
    return (
        <Wrapper>
            <h1>404 | Not Found</h1>
        </Wrapper>
    )
}
    
const Wrapper = Styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
`
    
export default error404