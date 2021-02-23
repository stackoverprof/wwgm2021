import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'

import MainLayout from '@components/layouts/MainLayout'
import axios from 'axios'

const Home = () => {
    const [examData, setExamData] = useState(null)
    const { query: { examId, sessionCode } } = useRouter()

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
        </MainLayout>
    )
}

const style = {
    page: css`
        padding: 24px 0;
    `,
    header: css`

        .inner {

            @media (max-width: 700px) {
                flex-direction: column;
            }
        }
        
        .kluster-box {
            height: 40px;
            width: 140px;
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
            height: 40px;
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
