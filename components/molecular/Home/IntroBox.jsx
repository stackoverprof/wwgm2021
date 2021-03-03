import React from 'react'
import { css } from '@emotion/react'
import { FaInstagram } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { RiLineFill } from 'react-icons/ri'

const IntroBox = () => {

    return (
        <div css={style} className="content-container full-w">
            <div className="upper full-w flex-cc">
                <div className="inner contain-size-l flex-cc">
                    <p>Wara-Wiri Gadjah Mada (WWGM) merupakan acara yang bertujuan untuk mengenalkan UGM kepada pelajar di Surabaya yang berbentuk TryOut berbasis UTBK dan faculty fair.</p>
                    <img src="/img/illus/intro.svg" alt=""/>
                </div>
            </div>
            <div className="lower flex-cc">
                <div className="inner contain-size-l flex-sc">
                    <p className="social flex-cc"><FaInstagram /> @areksgm</p>
                    <p className="social flex-cc"><HiOutlineMail /> surabayagadjahmada@gmail.com</p>
                    <p className="social flex-cc"><RiLineFill /> @nts6607c</p>
                </div>
            </div>
        </div>
    )
}

const style = css`
    margin-top: 32px;
    
    .upper {
        background: #1A2C1E;

        @media (max-width: 760px) {
            .inner {
                flex-direction: column;
                width: 70%;
            }
        }
        
        p {
            font-family: Poppins;
            font-weight: 600;
            font-size: 20px;
            margin-right: 24px;
            color: #FFFFFF;
            
            @media (max-width: 760px) {
                font-size: 16px;
                margin: 54px 0 24px 0;
                text-align: center;
            }
        }
        
        img {
            position: relative;
            height: 280px;
            bottom: -24px;
            object-position: bottom;
            object-fit: contain;
        }
    }
    
    .lower {
        background: #0F1A12;
        padding: 24px 0;
        
        @media (max-width: 760px) {
            padding: 32px 0;
            
            .inner {
                flex-direction: column;
            }
        }
        
        p.social {
            font-family: Poppins;
            font-weight: 500;
            font-size: 16px;
            margin: 6px;
            color: #FBC343;

            svg {
                margin-right: 6px;
                font-size: 24px;
            }
        }
    }
`

export default IntroBox