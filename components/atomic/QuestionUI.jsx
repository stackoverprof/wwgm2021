import React from 'react'
import { css } from '@emotion/react'

const QuestionUI = ({question, current, mutateChange}) => {

    return (
        <div css={style}>
            {question.options?.map((item, i) => (
                <label htmlFor={i} key={i} className="flex-ss">
                    <input onClick={mutateChange} id={i} type="button" className={`btn ${current === item.option ? 'selected' : ''}`} value={item.option}/>
                    <p>{item.body}</p>
                </label>
            ))}
        </div>
    )
}

const style = css`
    label {
        margin: 10px 0;
        border: 1px solid #0005;
        border-radius: 8px;
        padding: 12px;

        input {
            width: 40px;
            min-width: 40px;
            height: 40px;
            background: white;
            border: none;
            border-radius: 8px;
            padding: 0;

            font-family: Poppins;
            font-weight: 600;
            font-size: 22px;
            color: var(--army);
            /* box-shadow: inset 0 0 0 1px var(--army); */
            
            box-shadow:  inset 0 0 0 1px var(--army);
            
            &:hover {
                box-shadow: inset 0 0 0 1px #b9dbc9, 0 0 0 1px #b9dbc9, 0 0 0 1.8px var(--army);
            }
            
            &.selected {
                background: var(--army);
                color: white;

                &:hover {
                    box-shadow: inset 0 0 0 1px var(--army), 0 0 0 2px #ffffff, 0 0 0 2.8px var(--army);
                }
            }
        }

        p {
            padding: 8px 0;
            margin: 0 12px;
            font-family: Poppins;
            font-weight: 400;
            font-size: 16px;
        }
    }
`

export default QuestionUI