import React from 'react'
import { css } from '@emotion/react'

// [TODO] : show illus credit di home

const Footer = () => {

    return (
        <div css={style} className="full-w">
            <div className="inner contain-size-l flex-bc">
                <p className="copyright-text">WWGM 2021&ensp;|&ensp;Diselenggarakan oleh ArekSGM</p>
                <img src="/img/logo-areksgm.png" alt=""/>
            </div>
        </div>
    )
}

const style = css`
    padding: 12px 0;
    background: #0F1A12;

    p.copyright-text {
        font-family: Poppins;
        font-weight: normal;
        font-size: 18px;
        color: #A4BBA9;
    }

    img {
        width: 200px;
    }

    @media (max-width: 800px) {
        .inner {
            padding: 12px 0;
            justify-content: center;
            flex-direction: column;
        }

        p.copyright-text {
            margin-bottom: 24px;
            text-align: center;
            font-size: 14px;
        }

        img {
            width: 50%;
            max-width: 200px;
        }
    }

`

export default Footer