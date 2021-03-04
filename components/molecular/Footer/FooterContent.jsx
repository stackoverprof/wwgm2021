import React, { useState } from 'react'
import { css } from '@emotion/react'
import { FaInstagram } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { RiLineFill } from 'react-icons/ri'

import { out } from '@core/routepath'
import Attribution from '@components/atomic/Attribution'

const FooterContent = () => {
    const [showAttribution, setShowAttribution] = useState(false)

    return (
        <div css={style}>
            <div className="upper">
                <div className="contain-size-l flex-sc">
                    <p>Diselenggarakan oleh</p>
                </div>
            </div>
            <div className="main">
                <div className="inner contain-size-l flex-bc">
                    <div className="intro flex-cs col">
                        <img src="/img/logo-areksgm.png" alt="logo Areksgm"/>
                        <p>Areksgm adalah wadah yang menaungi mahasiswa-mahasiswa Universitas Gadjah Mada (UGM) yang berasal dari Surabaya</p>
                        <button onClick={() => setShowAttribution(!showAttribution)} className="no-btn">{showAttribution ? 'Close' : 'Show'} attribution</button>
                    </div>
                    <div className="contact flex-cs col">
                        <a href={out.ig}><p className="social flex-cc"><FaInstagram /> @areksgm</p></a>
                        <p className="social flex-cc"><HiOutlineMail /> surabayagadjahmada<br/>@gmail.com</p>
                        <p className="social flex-cc"><RiLineFill /> @nts6607c</p>
                    </div>
                </div>
            </div>
            {showAttribution && <Attribution />}
        </div>
    )
}

const style = css`
    .upper {
        padding: 24px;
        background: #2F4534;
        
        p{
            font-weight: normal;
            font-size: 21px;
            color: #A4BBA9;
        }
    }

    .main {
        background: #1A2C1E;
        padding: 54px 0;

        .intro {
            margin-right: 100px;

            img {
                width: 240px;
                margin-bottom: 16px;
            }

            p {
                font-weight: 600;
                font-size: 20px;
                color: #FFFFFF;
            }

            .no-btn {
                font-weight: 600;
                margin-top: 40px;
                text-decoration: underline;
                color: #327c54;
            }
        }

        .contact {
            min-width: 228px;

            p.social {
                font-family: Poppins;
                font-weight: 500;
                font-size: 16px;
                margin: 6px;
                color: #FBC343;
                display: flex;
                align-items: flex-start;

                svg {
                    margin-right: 6px;
                    font-size: 24px;
                    min-width: 24px;
                }
            }
        }
    }

    @media (max-width: 800px) {

        .upper div {
            justify-content: center;
        }

        .intro {
            width: 100%;
            align-items: center;
            margin: 0 !important;

            p {
                text-align: center;
            }
        }
        
        .contact{
            margin-top: 24px;
            align-items: center;

            p br {
                display: none;
            }
        }
    }
`

export default FooterContent