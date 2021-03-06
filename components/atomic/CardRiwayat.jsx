import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import axios from 'axios'
import { FaBook } from 'react-icons/fa'
import Skeleton from 'react-loading-skeleton'

import { set } from '@core/routepath'
import { useAuth } from '@core/contexts/AuthContext'
import convert from '@core/utils/convertExamData'
import { useLayout } from '@core/contexts/LayoutContext'

const CardRiwayat = ({examId}) => {
    const [examData, setExamData] = useState(null)
    const [examResult, setExamResult] = useState(null)

    const { user } = useAuth()
    const { setGlobalAlert } = useLayout()
    
    const fetchData = async () => {
        await axios.post('/api/public/exams/get-exam-data', {
            examId: examId
        })
        .then(res => setExamData(res.data.body))
    }

    const fetchResult = async () => {
        await axios.post('/api/user/exams/get-result', {
            authToken: await user.getIdToken(),
            examId: examId
        })
        .then(res => setExamResult(res.data.body))
        .catch(err => {
            const { end, message } = err.response.data
            const finalMessage = end ? message + convert.time(end) : message
            setGlobalAlert({error: true, body: finalMessage})
        })
    }

    useEffect(() => {
        if (examId) {
            fetchData()
            fetchResult()
        }
    }, [examId])

    if (!examId || !examData) return <ContentLoader />
    
    return (
        <div css={style.main} className="full-w flex-cc">
            {examResult && (
                <div className="body flex-cc col">
                    <div className="rowing full-w flex-bc">
                        <p className="date green flex-cc"><FaBook />{examData.title}</p>
                        <Link href={set.resultTO({examId: examId})}>
                            <button className="bordered">
                                DETAIL
                            </button>
                        </Link>
                    </div>
                    <div className="rowing full-w flex-bc">
                        <p className="date smaller flex-cc">Hasil : {examResult.nonIRTResult} dari {examResult.userAnswers.length} benar</p>
                    </div>
                </div>
            )}
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

        .green {
            color: var(--army) !important;
        }

        .smaller {
            font-size: 16px !important;
        }

        .body {
            width: 100%;
            border: 1px solid #0005;
            border-radius: 12px;
            margin-left: 12px;
            padding: 12px 16px;

            @media (max-width: 660px) {
                margin-left: 0;
            }

            .rowing {
                margin: 6px 0;
            }

            p.date {
                font-family: Poppins;
                font-weight: 500;
                font-size: 21px;
                line-height: 24px;
                color: #000a;
                transition: 0.1s;
                margin-left: 12px;

                &:hover {
                    color: var(--army);
                    -webkit-text-stroke-width: 0.1px;
                }

                svg {
                    margin-right: 8px;
                    margin-bottom: 3px;
                }
            }

            button:disabled {
                opacity: 0.25;

                &:hover {            
                    box-shadow: 0 0 0 0 #000;
                }
            }
        }
    `,

    skeleton: css`

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
export default CardRiwayat