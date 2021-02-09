import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import { mainDate, fullDate, getDuration, getSize, time} from '@core/utils/examData'
import { useAuth } from '@core/contexts/AuthContext'

import { FaRegCalendarAlt } from 'react-icons/fa'
import OverviewExam from '@components/atomic/OverviewExam'
import EditDisplayExams from '@components/atomic/EditDisplayExams'

const CardDisplay = ({examId, i, refreshData}) => {
    const [examData, setExamData] = useState(null)
    const { user, access } = useAuth()
    
    useEffect(() => {
        if (!examId) return
        
        const fetchData = async () => {
            await axios.post('/api/public/exams/get-exam-data', {
                examId: examId
            }).then(res => setExamData(res.data.body))
        }

        fetchData()
    }, [examId])

    useEffect(() => {
        console.log(user)
    }, [user])

    if (!examId || !examData) return <ContentLoader />

    return (
        <div css={style}>
            <div className="header flex-cc col">
                <p className="title">{examData.cluster}</p>
                <p className="date flex-cc"><FaRegCalendarAlt />{mainDate(examData.availability.start)}</p>
            </div>
            <div className="body flex-cc col">
                <OverviewExam
                    title={examData.title}
                    size={getSize(examData.sessions)}
                    duration={getDuration(examData.sessions)}
                    sessionsLength={examData.sessions.length}
                    fullDate={fullDate(examData.availability.start)}
                    time={time(examData.availability.start)}
                />
                <button className="mx-auto bordered green">IKUTI TRYOUT</button>
            </div>
            {access.admin && <EditDisplayExams i={i} refreshData={refreshData}/>}
        </div>
    )
}

const ContentLoader = () => {

    return (
        <div css={style}>
            <div className="header-skeleton">
                <Skeleton height={110} />
            </div>
            <div className="body body-skeleton">
                <OverviewExam skeleton/>
                <button className="mx-auto bordered" disabled>IKUTI TRYOUT</button>
            </div>
        </div>
    )
}

const style = css`
    margin: 16px;
    width: 100%;
    max-width: 238px;

    @media (max-width: 1000px){
        max-width: 300px;
    }

    .header-skeleton{
        .react-loading-skeleton{
            width: 100%;
            border-radius: 12px;
            margin-bottom: 12px;
        }    
    }
    
    .header{
        background: var(--army);
        border-radius: 14px;
        box-shadow: 0 10px 12px -10px #0008;
        padding: 20px 30px;
        margin-bottom: 12px;

        .title{
            font-family: Poppins;
            font-weight: 600;
            font-size: 42px;
            text-align: center;
            line-height: 36px;
            max-width: 200px;
            
            color: #FFFFFF;
            margin-bottom: 10px;
        }

        p.date{
            font-family: Poppins;
            font-weight: 500;
            font-size: 21px;
            text-align: center;
            line-height: 24px;
            color: #5C826D;
            transition: 0.1s;

            &:hover{
                color: white;
                -webkit-text-stroke-width: 0.1px;
            }

            svg{
                margin-right: 8px;
                margin-bottom: 3px;
            }
        }
    }

    .body{
        border: 1px solid #0F412544;
        border-radius: 14px;
        padding: 0 18px;

        @media (min-width: 1000px) {
        }
        
        button{
            padding: 10px 0;
            width: 100%;
            margin-bottom: 18px;
            font-family: Poppins;
            font-weight: 600;
            font-size: 20px;
            letter-spacing: -0.02em;
            line-height: 31px;
            text-align: center;
            color: #7B7B7B;
            border-color: #0F412544;

            &.green{
                color: var(--army);
                box-shadow: inset 0 0 0 1.5px var(--army);
                opacity: 0.9;
                
                &:hover{
                    box-shadow: inset 0 0 0 3px var(--army);
                    opacity: 1;
                    -webkit-text-stroke-width: 0.25px;
                }
                
            }
        }

        &.body-skeleton{
            border-color: #0001;

            button{
                border-color: #0001;
                color: #0003;

                &:hover{
                    box-shadow: none;
                    color: #0003;
                }
            }
        }
    }

`

export default CardDisplay