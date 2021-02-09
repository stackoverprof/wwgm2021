import React from 'react'
import { css } from '@emotion/react'

const CircleSpinner = ({ w, h }) => {

    return (
        <div css={style({w, h})} className="full-w flex-cc">
            <div className="spinner">
                <div></div><div></div><div></div><div></div>
            </div>
        </div>
    )
}

const style = ({w, h}) => css`
    width: ${w ? `${w}px` : '100%'};
    height: ${h ? `${h}px` : '100%'};

    .spinner {
        position: relative;
        width: 20px;
        height: 20px;

        div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 16px;
            height: 16px;
            margin: 2px;
            border: 2px solid #fff;
            border-radius: 50%;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: #fff transparent transparent transparent;
        }

        div:nth-of-type(1) {
            animation-delay: -0.45s;
        }

        div:nth-of-type(2) {
            animation-delay: -0.3s;
        }

        div:nth-of-type(3) {
            animation-delay: -0.15s;
        }

        @keyframes lds-ring {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }

`

export default CircleSpinner