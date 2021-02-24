import React from 'react'
import { css } from '@emotion/react'

const QuestionUI = ({question, current, mutateChange}) => {

    return (
        <div css={style}>
            {question.options?.map((option, i) => (
                <label htmlFor={i} key={i} className="flex-sc">
                    <input onClick={mutateChange} id={i} type="button" value={option.key}/>
                    <p>{option.body}</p>
                </label>
            ))}
        </div>
    )
}

const style = css`
    
`

export default QuestionUI