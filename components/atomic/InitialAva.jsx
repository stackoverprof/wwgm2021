import React from 'react'
import { css } from '@emotion/react'
import { useAuth } from '@core/contexts/AuthContext'
import parse from 'url-parse'

const InitialAva = ({size, className, src, override, overrideValue}) => {
    const { userData: { displayName } } = useAuth()
    
    const showInitial = () => {
        if (override) return overrideValue
        const parsed = parse(src, true)
        return JSON.parse(parsed.query.initial)
    }

    return (
        <div css={style({size})} className={`${className} flex-cc`}>
            <img width={size} height={size} src={src} alt=""/>
            <div className="ava-cover full flex-cc">
                {showInitial() && <p className="flex-cc">{displayName.charAt(0).toUpperCase()}</p>}
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
    max-width: ${size}px;
    max-height: ${size}px;

    img {
        position: relative;
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        min-width: ${size}px;
        min-height: ${size}px;
        max-width: ${size}px;
        max-height: ${size}px;
        object-fit: cover;
    }

    .ava-cover { 
        position: absolute;
        pointer-events: none;

        p {
            font-weight: normal !important;
            font-family: Poppins !important;
            font-size: ${size*2/3}px !important;
            color: white !important;
        }
    }
    
`

export default InitialAva