import React from 'react'
import { css } from '@emotion/react'
import { FaWindowClose } from "react-icons/fa"

const AlertHandler = ({message, closeHandler = () => {}, color = 'default'}) => {
    return (
    <>        
        { message && (
            <div css={style} className="fixed fullscreen flex-ce">
                <div className={`box flex-bc ${color}`}>
                    <p>{message}</p>
                    <FaWindowClose className="icon" onClick={() => closeHandler()}/>
                </div>
            </div>
        )}
    </>
    )
}

const style = css`
    pointer-events: none;
    z-index: 99;

    .box {
        padding: 12px 8px 12px 24px;
        margin-bottom: 32px;
        border-radius: 8px;
        pointer-events: all;
        max-width: 95%;
        
        &.default {
            background: #7fa6f0aa;
            border: 1px solid #335ba5;
            
            p, button, .icon {
                font-weight: bold;
                color: #164191;
            }
        }
        
        &.red {
            background: #f07f7faa;
            border: 1px solid #cf2727;
            
            p, button, .icon {
                font-weight: bold;
                color: #941010;
            }
        }
    }

    .icon {
        margin-left: 24px;
        margin-right: 8px;
    }

`

export default AlertHandler