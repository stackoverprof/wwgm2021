import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'

import { to } from '@core/routepath'
import { useAuth } from '@core/contexts/AuthContext'
import UserOnlyRoute from '@core/routeblocks/UserOnlyRoute'
import MainLayout from '@components/layouts/MainLayout'
import convert from '@core/utils/convertExamData'

const Home = () => {
    const [examData, setExamData] = useState(null)
    const { query: { examId, sesi = 1 } } = useRouter()
    const { dataCompleted, userData, authState } = useAuth()

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
        <UserOnlyRoute redirect={to.home}>
            { authState === 'user' && examData !== null && (    
                <MainLayout css={style.page} title="Selamat datang!" className="flex-sc col">
                    <section css={style.header}>
                        <div className="inner contain-size-s flex-cc">
                            <div className="kluster-box flex-cc">
                                <p>{examData.cluster}</p>
                            </div>
                            <div className="sesi-box flex-cc">
                                <p>SESI {sesi} : {examData.sessions[sesi - 1].name}</p>
                            </div>
                        </div>
                    </section>
                    <section css={style.card}>
                        <div className="card contain-size-s flex-cc">
                            <div className="inner flex-bs col full">
                                <div className="top">
                                    <div className="text-group">
                                        <p className="label">DATA DIRI</p>
                                        <p className="data">{userData.fullName ? userData.fullName : 'Nama lengkap belum diisi'}</p>
                                        {!dataCompleted && <p className="data">Data belum lengkap</p>}
                                    </div>
                                    <div className="text-group">
                                        <p className="label">NO. PESERTA</p>
                                        <p className="data">{userData.noPeserta ? userData.noPeserta : 'No peserta belum ada'}</p>
                                        {!userData.approved && <p className="data">No peserta belum diapprove panitia</p>}
                                    </div>
                                    <div className="text-group">
                                        <p className="label">MULAI</p>
                                        <p className="data">{convert.time(examData.availability.start)} - {convert.fullDate(examData.availability.start)}</p>
                                    </div>
                                    <div className="text-group">
                                        <p className="label">AKHIR</p>
                                        <p className="data">{convert.time(examData.availability.end)} - {convert.fullDate(examData.availability.end)}</p>
                                    </div>
                                </div>
                                <div className="bottom flex-bc full-w">
                                    <p className="access">Access : {userData.examsAccess?.includes(examId) && dataCompleted && userData.approved ? 'Allowed' : 'Not Allowed'}</p>
                                    <Link href={to._404}>
                                        <button>MASUK</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </MainLayout>
            )}
        </UserOnlyRoute>
    )
}

const style = {
    page: css`
        padding: 24px 0;
    `,

    card: css`

        .card {
            margin-top: 12px;
            width: 100%;
            box-shadow: 0 0 4px 0 #0005;
            background: white;
            border-radius: 8px;

            .inner {    
                padding: 0 32px;
            }

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
            .top {
                margin-top: 32px;
            }

            .bottom {
                margin-top: 24px;
                height: 80px;
                border-top: solid 1px #0005;
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
