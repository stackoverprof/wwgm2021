import React from 'react'
import Styled from '@emotion/styled'

const Dynamic = () => {

    return (
        <Wrapper>
            <h1>dynamic but index</h1>
        </Wrapper>
    )
}

const Wrapper = Styled.div(() =>`
    
`)

export default Dynamic