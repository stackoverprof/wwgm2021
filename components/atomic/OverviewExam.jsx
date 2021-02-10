import React from 'react'
import { css } from '@emotion/react'
import { FaPencilAlt, FaRegCalendarAlt, FaBook } from 'react-icons/fa'

import { RiShieldFlashLine } from 'react-icons/ri'
import { MdTimelapse, MdClass } from 'react-icons/md'
import { BiTimeFive } from 'react-icons/bi'
import Skeleton from 'react-loading-skeleton'
import RunningText from '@components/atomic/RunningText'
import { useAuth } from '@core/contexts/AuthContext'

const Advantages = ({examId, title, size, duration, sessionsLength, fullDate, time, skeleton}) => {
    const { access } = useAuth()

    return (
        <ul css={style({skeleton})}>
            <li className="flex-sc"><FaBook />{title && !skeleton ? <RunningText className="title" offset={20}>{title}</RunningText> : <p><Skeleton /></p>}</li>
            <li className="flex-sc"><FaPencilAlt /><p>{size && !skeleton ? size + ' Soal' : <Skeleton />}</p></li>
            <li className="flex-sc"><MdTimelapse /><p>{duration && !skeleton ? duration + ' Menit' : <Skeleton />}</p></li>
            <li className="flex-sc"><MdClass /><p>{sessionsLength && !skeleton ? sessionsLength + ' Sesi' : <Skeleton />}</p></li>
            <li className="flex-sc"><FaRegCalendarAlt /><p>{fullDate && !skeleton ? fullDate : <Skeleton />}</p></li>
            <li className="flex-sc"><BiTimeFive /><p>{time && !skeleton ? time + ' WIB' : <Skeleton />}</p></li>
            {access.admin && <li className="flex-sc"><RiShieldFlashLine color="orange" />{examId && !skeleton ? <RunningText className="title" offset={20}>{examId}</RunningText> : <p><Skeleton /></p>}</li>}
        </ul>
    )
}

const style = ({skeleton}) => css`
    padding: 16px 12px 16px 24px;
    max-width: 300px;
    width: 100%;

    .react-loading-skeleton{
        position: relative;
        width: 100%;
        transform: scaleY(1.2);
    }

    li{
        position: relative;
        font-family: Poppins;
        font-weight: normal;
        font-size: 19px;
        color: ${skeleton ? '#0003' : 'gray'};
        margin: 6px 0;
        transition: 0.25s;
        white-space: nowrap;
        overflow: hidden;

        .title{
            max-width: 220px;
            margin-right: 20px;
        }

        p{
            position: relative;
            width: 100%;
            max-width: 80%;
        }

        &:hover{
            color: ${skeleton ? '' : 'var(--army)'};
            -webkit-text-stroke-width: 1px;
        }

        svg{
            margin-right: 12px;
            min-width: 20px;
        }
    }
`

export default Advantages