import React from 'react'
import { css } from '@emotion/react'
import parseHTML from 'html-react-parser'

const QuestionUI = ({question}) => {

    return (
        <div css={style}>
            {parseHTML(question.body)}
        </div>
    )
}

const style = css`
    margin: 24px 0;
    user-select: none;
`

export default QuestionUI