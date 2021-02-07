import React from 'react'
import { css } from '@emotion/react'
import { FaPencilAlt, FaRegCalendarAlt } from 'react-icons/fa'
import { MdTimelapse, MdClass } from 'react-icons/md'
import { BiTimeFive } from 'react-icons/bi'

const Advantages = ({size, duration, sessionsLength, fullDate, time}) => {

    return (
        <ul css={style}>
            <li className="flex-sc"><FaPencilAlt />{size} Soal</li>
            <li className="flex-sc"><MdTimelapse />{duration} Menit</li>
            <li className="flex-sc"><MdClass />{sessionsLength} Sesi</li>
            <li className="flex-sc"><FaRegCalendarAlt />{fullDate}</li>
            <li className="flex-sc"><BiTimeFive />{time} WIB</li>
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