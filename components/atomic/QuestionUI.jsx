import React from 'react'
import { css } from '@emotion/react'
import parseHTML from 'html-react-parser'

const QuestionUI = ({question}) => {

    return (
        <div css={style}>
            {/* {question.imageURL && (
                <div className="full-w flex-cc">
                    <img src={question.imageURL} alt=""/>
                </div>
            )} */}
            <div>{parseHTML(question.body)}</div>
        </div>
    )
}

const style = css`
    margin: 24px 0;

    img {
        max-width: 600px;
        width: 100%;
        margin-bottom: 12px;
    }
`

export default QuestionUI