import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import useResize from 'use-resizing'

import { useAuth } from '@core/contexts/AuthContext'
import EditPhotoURL from '@components/atomic/EditPhotoURL'

const UserCard = () => {
    const [isWrapped, setIsWrapped] = useState(false)
    const { userData } = useAuth()
    const screen = useResize().width

    const container = useRef({current: { offsetWidth: 0 }})
    const inner = useRef({current: { offsetWidth: 0 }})

    useEffect(() => {
        const containerWidth = Math.floor(container.current.offsetWidth)
        const innerWidth = Math.ceil(inner.current.offsetWidth)

        setIsWrapped(containerWidth <= innerWidth)
    }, [screen])
    
    return (
        <div css={style} ref={container} className="contain-size-sm flex-sc">
            <div ref={inner}>
                <div className="padder flex-cc">
                    <EditPhotoURL size={isWrapped || screen < 470 ? 128 : 96}/>
                    <div className={`content ${isWrapped || screen < 470 ? 'flex-cc col on-wrap' : 'flex-cs col no-wrap'}`}>
                        <p className="display-name">{userData.displayName}</p>
                        <p className="email">{userData.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const style = css`
    background: #FFFFFF;
    box-sizing: border-box;
    box-shadow: 0px 15px 24px -18px rgba(0, 0, 0, 0.25), inset 0 0 0 1px #AFAFAF;
    border-radius: 12px;

    @media (max-width: 600px) {
        box-shadow: 0px 8px 14px -12px rgba(0, 0, 0, 0.25), inset 0 0 0 1px #AFAFAF;
    }

    .padder {
        flex-wrap: wrap;
        margin: 0 20px;
    }

    .on-wrap {
        padding-bottom: 20px;

        p {                
            text-align: center;
        }

        p.email {
            margin-top: 8px;
        }
    }

    .no-wrap {
        padding-left: 20px;
    }

    p.display-name {
        font-family: Poppins;
        font-weight: 600;
        font-size: 24px;
        color: #1A2C1E;
    }

    p.email {
        font-family: Poppins;
        font-size: 20px;
        color: #6C6C6C;
        word-break: break-all;
    }
`

export default UserCard