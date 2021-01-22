import React from 'react'
import Styled from '@emotion/styled'

const Navbar = ({big}) => {

    return (
        <Wrapper big={big}>
            
        </Wrapper>
    )
}

const Wrapper = Styled.nav(({big}) =>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: ${big ? '88px' : '60px'};
    z-index: 100;

    background: #FFFFFF;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
`)

export default Navbar