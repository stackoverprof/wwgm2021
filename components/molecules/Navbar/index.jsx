import React from 'react'
import Styled from '@emotion/styled'

const Navbar = ({big}) => {

    return (
        <Wrapper big={big}>
            <div className="brand">
                <img src="/img/sgm-icon.png" alt=""/>
                <p>ArekSGM</p>
            </div>
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

    .brand{
        p{
            font-family: Poppins;
            font-style: normal;
            font-weight: bold;
            font-size: 30px;
            line-height: 45px;
            text-align: center;

            color: #0B4D29;
        }
    }
`)

export default Navbar