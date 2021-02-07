import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { FaRegCalendarAlt } from 'react-icons/fa'
import axios from 'axios'
import { mainDate, fullDate, getDuration, getSize, time} from '@core/utils/examData'

import OverviewExam from '@components/atomic/OverviewExam'

const CardDisplay = ({examId}) => {
    const [examData, setExamData] = useState(null)
    
    useEffect(() => {
        axios.post('/api/public/exams/get-exam-data', {
            examId: examId
        }).then(res => setExamData(res.data.body))
    }, [])

    return (
        <div css={style}>
            {examData && 
            <>     
                <div className="header flex-cc col">
                    <p className="title">{examData.cluster}</p>
                    <p className="date flex-cc"><FaRegCalendarAlt />{mainDate(examData.availability.start)}</p>
                </div>
                <div className="body">
                    <OverviewExam
                        size={getSize(examData.sessions)}
                        duration={getDuration(examData.sessions)}
                        sessionsLength={examData.sessions.length}
                        fullDate={fullDate(examData.availability.start)}
                        time={time(examData.availability.start)}
                    />
                    <button className="mx-auto bordered">IKUTI TRYOUT</button>
                </div>
            </>
            }
        </div>
    )
}

const style = css`
    margin: 16px;
    
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
        
        button{
            padding: 10px 0;
            width: calc(100% - 40px);
            margin-bottom: 18px;
            font-family: Poppins;
            font-weight: 600;
            font-size: 20px;
            letter-spacing: -0.02em;
            line-height: 31px;
            text-align: center;
            color: #7B7B7B;
            border-color: #0F412544;

            &:hover{
                box-shadow: inset 0 0 0 1.5px var(--army);
                color: var(--army);
            }
        }
    }
    
`

export default CardDisplay