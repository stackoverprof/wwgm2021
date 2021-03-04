import React from 'react'
import { css } from '@emotion/react'

import FooterContent from './FooterContent'

// [TODO] : show illus credit di home

const Footer = ({bigger}) => {

    return (
        <footer css={style}>
            {bigger && <FooterContent />}
            <div className="inner contain-size-l flex-bc">
                <p className="copyright-text">WWGM 2021&ensp;|&ensp;Diselenggarakan oleh ArekSGM</p>
                <div className={`brand ${bigger ? 'aligned' : ''}`}>
                    <img src="/img/logo-areksgm.png" alt="logo Areksgm"/>
                </div>
            </div>
        </footer>
    )
}

const style = css`
    background: #0F1A12;

    .inner {
        padding: 12px 0;
        
        p.copyright-text {
            font-family: Poppins;
            font-weight: normal;
            font-size: 16px;
            color: #A4BBA9;
        }

        .aligned {
            min-width: 228px;
        }
        
        img {
            width: 160px;
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
                font-size: 12px;
            }
            
            img {
                width: 50%;
                max-width: 160px;
            }
        }
    }
`
    
export default Footer