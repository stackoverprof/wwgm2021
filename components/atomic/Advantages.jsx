import React from 'react'
import { css } from '@emotion/react'
import { FaStar, FaBalanceScaleRight } from 'react-icons/fa'
import { MdQuestionAnswer } from 'react-icons/md'

const Advantages = () => {

    return (
        <ul css={style}>
            <li className="flex-sc"><FaStar />Berstandar UTBK</li>
            <li className="flex-sc"><FaBalanceScaleRight />Pembobotan IRT</li>
            <li className="flex-sc"><MdQuestionAnswer />Pembahasan</li>
        </ul>
    )
}

const style = css`
    padding: 16px 0;

    li {
        font-family: Poppins;
        font-weight: 500;
        font-size: 28px;
        color: #0B4D29;
        margin: 16px 0;

        @media (max-width: 1000px) {
            font-size: 24px;
            justify-content: center;
        }

        svg {
            margin-right: 24px;
        }
    }
`

export default Advantages