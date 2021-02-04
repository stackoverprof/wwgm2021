import React from 'react'
import { css } from '@emotion/react'
import { FaWindowClose } from "react-icons/fa"

const AlertHandler = ({message, closeHandler = () => {}, color = 'default'}) => {
    return (
    <>        
        { message && (
            <div css={style} className="flex -cc">
                <div className={`box flex -bc ${color}`}>
                    <p>{message}</p>
                    <FaWindowClose onClick={() => closeHandler()}/>
                </div>
            </div>
        )}
    </>
    )
}

const style = css`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 40px;
    pointer-events: none;
    z-index: 99;

    .box{
        padding: 12px 8px 12px 24px;
        border-radius: 8px;
        pointer-events: all;
        
        &.default{
            background: #7fa6f0aa;
            border: 1px solid #335ba5;
            
            p, button, svg {
                font-weight: bold;
                color: #164191;
            }
        }
        
        &.red{
            background: #f07f7faa;
            border: 1px solid #cf2727;
            
            p, button, svg {
                font-weight: bold;
                color: #941010;
            }
        }
    }

    svg{
        margin-left: 24px;
        margin-right: 8px;
    }

`

export default AlertHandler