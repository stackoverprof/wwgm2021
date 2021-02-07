import React from 'react'
import { css } from '@emotion/react'
import { FaPencilAlt, FaRegCalendarAlt, FaBook } from 'react-icons/fa'
import { MdTimelapse, MdClass } from 'react-icons/md'
import { BiTimeFive } from 'react-icons/bi'
import RunningText from './RunningText'

const Advantages = ({title, size, duration, sessionsLength, fullDate, time}) => {

    return (
        <ul css={style}>
            <li className="flex-sc"><FaBook /><RunningText offset={20}>{title}</RunningText></li>
            <li className="flex-sc"><FaPencilAlt /><p>{size} Soal</p></li>
            <li className="flex-sc"><MdTimelapse /><p>{duration} Menit</p></li>
            <li className="flex-sc"><MdClass /><p>{sessionsLength} Sesi</p></li>
            <li className="flex-sc"><FaRegCalendarAlt /><p>{fullDate}</p></li>
            <li className="flex-sc"><BiTimeFive /><p>{time} WIB</p></li>
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
        white-space: nowrap;
        max-width: 220px;
        overflow: hidden;

        p{
            max-width: 76%;
        }

        &:hover{
            color: var(--army);
            -webkit-text-stroke-width: 1px;
        }

        /* &:nth-of-type(1){
            text-align: center;
        } */

        svg{
            margin-right: 12px;
            min-width: 20px;
        }
    }
`

export default Advantages