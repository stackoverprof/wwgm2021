import React from 'react'
import { css } from '@emotion/react'

const QuizNav = ({activeIndex, setActiveIndex, inputData = Array(20).fill('')}) => {
    
    return (
        <div css={style} className="full-w flex-sc">
            <div className="slider flex-sc">
                {inputData.map((item, i) => (
                    <div 
                        onClick={() => setActiveIndex(i)} 
                        className={`box flex-cc ${activeIndex === i ? 'active' : ''} ${item ? 'green' : ''}`} 
                        key={i}
                    >
                        <p>{i + 1}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

const style = css`
    width: 100%;
    height: 72px;
    background: white;
    box-shadow: 0 0 4px 0 #0002;
    border-radius: 6px;
    border: 1px solid #0005;
    overflow-x: scroll;
    overflow-y: hidden;

    .slider {
        padding: 0 4px;
    }
    
    .box {
        margin: 4px;
        width: 32px;
        min-width: 32px;
        height: 32px;
        background: white;
        border-radius: 6px;
        border: 1px solid #0002;

        p {
            color: var(--army);
        }

        &.active {
            border: none;
            background: #0001;
            p {
                font-weight: bold;
            }
        }

        &.green {
            border: none;
            background: var(--army);
            p {
                font-weight: bold;
                color: white;
            }
        }
    }
`

export default QuizNav