import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import axios from 'axios'
import { FaRegCalendarAlt } from 'react-icons/fa'
import Skeleton from 'react-loading-skeleton'

import convert from '@core/utils/convertExamData'

const CardDisplayWide = ({examId, showId, onButton}) => {
    const [examData, setExamData] = useState(null)
    
    const fetchData = async () => {
        await axios.post('/api/public/exams/get-exam-data', {
            examId: examId
        })
        .then(res => setExamData(res.data.body))
    }

    useEffect(() => {
        if (examId) fetchData()
    }, [examId])

    if (!examId || !examData) return <ContentLoader />
    
    return (
        <div css={style.main} className="full-w flex-cc">
            <div className="header flex-cc col">
                <p className="title">{examData.cluster}</p>
            </div>
            <div className="body flex-bc">
                {showId ?
                    <p className="date flex-cc smaller">{examId}</p>
                :
                    <p className="date flex-cc"><FaRegCalendarAlt />{convert.date(examData.availability.start)}</p>
                }
                <button className="bordered" onClick={onButton}>DETAIL</button>
            </div>
        </div>
    )
}

const ContentLoader = () => {

    return (
        <div css={style.skeleton} className="full-w flex-cc">
            <div className="header">
                <Skeleton className="header-skeleton"/>
            </div>
            <div className="body flex-ec">
                <Skeleton className="btn-skeleton"/>
            </div>
        </div>
    )
}

const style = {
    main: css`
        margin: 12px 0;
        
        @media (max-width: 700px) {
            flex-direction: column;

            .header {
                width: 100%;
                margin-bottom: 12px;
            }

            .body {
                width: calc(100% - 32px) !important;
            }
        }
        
        .header {
            background: var(--army);
            border-radius: 12px;
            box-shadow: 0 10px 12px -10px #0008;
            min-width: 240px;
            height: 80px;

            .title {
                font-family: Poppins;
                font-weight: 600;
                font-size: 42px;
                text-align: center;
                line-height: 36px;
                max-width: 200px;
                
                color: #FFFFFF;
            }
        }    

        .smaller {
            font-size: 16px !important;
        }

        .body {
            width: 100%;
            border: 1px solid #0005;
            border-radius: 12px;
            height: 80px;
            margin-left: 12px;
            padding: 0 16px;

            @media (max-width: 660px) {
                margin-left: 0;
            }

            p.date {
                font-family: Poppins;
                font-weight: 500;
                font-size: 21px;
                line-height: 24px;
                color: #000a;
                transition: 0.1s;

                &:hover {
                    color: var(--army);
                    -webkit-text-stroke-width: 0.1px;
                }

                svg {
                    margin-right: 8px;
                    margin-bottom: 3px;
                }
            }
        }
    `,

    skeleton: css`
        margin: 12px 0;

        @media (max-width: 700px) {
            flex-direction: column;

            .header {
                width: 100%;
                margin-bottom: 12px;
            }

            .body {
                width: calc(100% - 32px) !important;
            }
        }

        .header { 
            min-width: 240px;
            height: 80px;
            border-radius: 12px;

            .header-skeleton {
                line-height: unset;
                padding-top: 0;
                height: 100%;
                border-radius: 12px;
            }
        }

        .body {
            width: 100%;
            height: 80px;
            padding: 0 16px;
            border: 1px solid #0005;
            border-radius: 12px;
            margin-left: 12px;

            @media (max-width: 660px) {
                margin-left: 0;
            }

            .btn-skeleton {
                line-height: unset;
                padding-top: 0;
                width: 115.5px;
                height: 48px;
                border-radius: 8px;
            }
        }
    `
}
export default CardDisplayWide