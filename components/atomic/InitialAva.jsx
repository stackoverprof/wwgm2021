import React from 'react'
import { css } from '@emotion/react'
import { useAuth } from '@core/contexts/AuthContext'
import parse from 'url-parse'
import Skeleton from 'react-loading-skeleton'

const InitialAva = ({size, className, src, override, overrideValue, loading}) => {
    const { userData: { displayName } } = useAuth()
    
    const showInitial = () => {
        if (override) return overrideValue
        const parsed = parse(src, true)
        if (!parsed.query.initial) return false
        return JSON.parse(parsed.query.initial)
    }

    if (loading) return <ContentLoader size={size} />

    return (
        <div css={style.main({size})} className={`${className} flex-cc`}>
            <img width={size} height={size} src={src} alt=""/>
            <div className="ava-cover full flex-cc">
                {showInitial() && <p className="flex-cc">{displayName.charAt(0).toUpperCase()}</p>}
            </div>
        </div>
    )
}

const ContentLoader = ({size}) => {
    return (
        <div css={style.loader({size})} className="flex-cc">
            <Skeleton className="skeleton"/>
        </div>
    )
}

const style = {
    main: ({size}) => css`
        position: relative;
        width: ${size}px;
        height: ${size}px;
        min-width: ${size}px;
        min-height: ${size}px;
        max-width: ${size}px;
        max-height: ${size}px;
        border-radius: 50%;
        overflow: hidden;

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
    `,
    loader: ({size}) => css`
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        overflow: hidden;

        span, .skeleton {
            width: 100%;
            height: 100%;
            line-height: 0;
        }
    `

}
export default InitialAva