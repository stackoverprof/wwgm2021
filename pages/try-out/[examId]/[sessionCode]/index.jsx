import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'

import MainLayout from '@components/layouts/MainLayout'
import axios from 'axios'
import { useAuth } from '@core/contexts/AuthContext'

const Home = () => {
    const [examData, setExamData] = useState(null)
    const { query: { examId, sessionCode } } = useRouter()
    const { userData } = useAuth()

    const fetchData = async () => {
        await axios.post('/api/public/exams/get-exam-data', {
            examId: examId
        })
        .then(res => setExamData(res.data.body))
        .catch(err => setGlobalAlert({error: true, body: err.response.data.message}))
    }

    useEffect(() => {
        if (examId) fetchData()
    }, [examId])

    return (
        <MainLayout css={style.page} title="Selamat datang!" className="flex-sc col">
            {examData !== null &&
                <section css={style.header}>
                    <div className="inner contain-size-s flex-cc">
                        <div className="kluster-box flex-cc">
                            <p>{examData.cluster}</p>
                        </div>
                        <div className="sesi-box flex-cc">
                            <p>SESI {sessionCode} : {examData.sessions[sessionCode - 1].name}</p>
                        </div>
                    </div>
                </section>
            }
            {examData !== null &&
                <section css={style.card}>
                    <div className="inner contain-size-s flex-cc">
                        <div className="top">
                            <div className="text-group">
                                <p className="label">NAMA</p>
                                <p className="data">{userData.fullName}</p>
                            </div>
                            <div className="text-group">
                                <p className="label">NO. PESERTA</p>
                                <p className="data">{userData.noPeserta}</p>
                            </div>
                        </div>
                        <hr/>
                        <div className="bottom">

                        </div>
                    </div>
                </section>
            }
        </MainLayout>
    )
}

const style = {
    page: css`
        padding: 24px 0;
    `,

    card: css`

        .inner {
            margin-top: 12px;
            min-height: 400px;
            width: 100%;
            box-shadow: 0 0 4px 0 #0005;
            background: white;
            border-radius: 8px;

            .text-group{
                margin: 10px 0;
            }
            
            p {
                font-family: Poppins;
                font-style: normal;
                font-weight: 700;
                font-size: 18px;
                color: var(--army);

                &.data {
                    font-weight: normal;
                }
            }
        }
    `,

    header: css`

        .inner {

            @media (max-width: 700px) {
                flex-direction: column;
            }
        }
        
        .kluster-box {
            height: 60px;
            min-width: 132px;
            background: var(--army);
            border-radius: 6px;
            
            p {
                font-family: Poppins;
                font-style: normal;
                font-weight: 600;
                font-size: 24px;
                text-align: center;
                
                color: #FFFFFF;
            }

            @media (max-width: 700px) {
               width: 100%;
            }
        }
        
        .sesi-box {
            height: 60px;
            width: 100%;
            border: 1px solid var(--army);
            border-radius: 6px;
            margin-left: 8px;
            
            p {
                font-family: Poppins;
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                text-align: center;
            }

            @media (max-width: 700px) {
                height: unset;
                width: calc(100% - 24px);
                padding: 12px;
                margin: 12px 0;
            }
        }
        `
}

    
export default Home
