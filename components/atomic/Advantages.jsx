import React from 'react'
import { css } from '@emotion/react'
import { FaStar } from 'react-icons/fa'
import { MdQuestionAnswer } from 'react-icons/md'
import { GiRank3, GiRank2 } from 'react-icons/gi'

const Advantages = () => {

    return (
        <ul css={style}>
            <li className="flex-sc"><FaStar />Berstandar UTBK</li>
            <li className="flex-sc"><MdQuestionAnswer />Pembahasan</li>
            <li className="flex-sc"><GiRank3 />Rank Nasional</li>
            <li className="flex-sc"><GiRank2 />Rank Provinsi</li>
        </ul>
    )
}

const style = css`
    padding: 16px 0;

    li{
        font-family: Poppins;
        font-weight: 500;
        font-size: 32px;
        color: #0B4D29;
        margin: 16px 0;

        svg{
            margin-right: 24px;
        }
    }
`

export default Advantages