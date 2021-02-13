import React from 'react'
import { css } from '@emotion/react'
import { useAuth } from '@core/contexts/AuthContext'

const InitialAva = ({size, className, src}) => {
    const { userData: { displayName } } = useAuth()

    return (
        <div css={style({size})} className={`${className} flex-cc`}>
            <img src={src} alt=""/>
            <div className="initial full flex-cc">
                <p className="flex-cc">{displayName.charAt(0).toUpperCase()}</p>
            </div>
        </div>
    )
}

const style = ({size}) => css`
    position: relative;
    width: ${size}px;
    height: ${size}px;
    min-width: ${size}px;
    min-height: ${size}px;

    img {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .initial { 
        position: absolute;

        p {
            font-weight: normal !important;
            font-family: Poppins !important;
            font-size: ${size*2/3}px !important;
            color: white !important;
        }
    }
    
`

export default InitialAva