import React from 'react'
import { css } from '@emotion/react'
import { FaPencilAlt, FaRegCalendarAlt } from 'react-icons/fa'
import { MdTimelapse, MdClass } from 'react-icons/md'
import { BiTimeFive } from 'react-icons/bi'

const Advantages = () => {

    return (
        <ul css={style}>
            <li className="flex-sc"><FaPencilAlt />160 Soal</li>
            <li className="flex-sc"><MdTimelapse />210 Menit</li>
            <li className="flex-sc"><MdClass />8 Sesi</li>
            <li className="flex-sc"><FaRegCalendarAlt />6 Maret 2021</li>
            <li className="flex-sc"><BiTimeFive />10:00 WIB</li>
        </ul>
    )
}

const style = css`
    padding: 16px 12px 16px 24px;

    li{
        font-family: Poppins;
        font-weight: normal;
        font-size: 19px;
        color: gray;
        margin: 6px 0;
        transition: 0.25s;

        &:hover{
            color: var(--army);
            -webkit-text-stroke-width: 1px;
        }

        svg{
            margin-right: 12px;
        }
    }
`

export default Advantages