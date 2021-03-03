import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import axios from 'axios'
import { useRouter } from 'next/router'

import UserOnlyRoute from '@core/routeblocks/UserOnlyRoute'
import { to } from '@core/routepath'
import { useAuth } from '@core/contexts/AuthContext'
import MainLayout from '@components/layouts/MainLayout'
import CardResult from '@components/atomic/CardResult'
import { useLayout } from '@core/contexts/LayoutContext'
import convert from '@core/utils/convertExamData'

// [!TODO] : tonmbol download hasil rank irt
// [!TODO] : input buat admin file hasil rank irt

const TryOutResult = () => {
    const [examData, setExamData] = useState(null)
    const [examResult, setExamResult] = useState([])
    const [openDropper, setOpenDropper] = useState(null)

    const { query: { examId } } = useRouter()
    const { user, authState } = useAuth() 
    const { setGlobalAlert } = useLayout()
    
    const fetchData = async () => {
        await axios.post('/api/public/exams/get-exam-data', {
            examId: examId
        })
        .then(res => setExamData(res.data.body))
        .catch(err => setGlobalAlert({error: true, body: err.response.data.message}))
    }

    const fetchResult = async () => {
        await axios.post('/api/user/exams/get-result', {
            authToken: await user.getIdToken(),
            examId: examId
        })
        .then(res => res.data.body)
        .then(async data => {
            const keyAnswer = await axios.post('/api/user/exams/get-key-answers', {
                authToken: await user.getIdToken(),
                examId: examId
            }).then(res => res.data.body)
            
            let filler = []
            data.userAnswers.forEach((answer, i) => {
                filler.push({
                    ...keyAnswer[i],
                    userAnswer: answer,
                    correctness: data.correctness[i]
                })
            })
            setExamResult(filler)
        })
        .catch(err => {
            const { end, message } = err.response.data
            const finalMessage = end ? message + convert.time(end) : message
            setGlobalAlert({error: true, body: finalMessage})
        })
    }

    useEffect(() => {
        if (examId && typeof user.getIdToken === 'function') {
            fetchData()
            fetchResult()
        }
    }, [examId, user])
    
    return (  
        <UserOnlyRoute redirect={to.home}>
            { authState === 'user' && (
                <MainLayout css={style.page} title="Hasil TO" className="flex-sc col">

                    <section css={style.illus}>
                        <div className="inner contain-size-s flex-cc">    
                            <p>Ini adalah hasil sementara. Tunggu kami menganalisis nilai IRT-nya!</p>
                            <img src="/img/illus/time-wait.svg" alt=""/>
                        </div>
                        <hr className="fade-flip"/>
                    </section>

                    <section css={style.header}>
                        <div className="inner contain-size-s flex-cc col">
                            <h1>Detail Hasil Try Out</h1>
                            {examData && <p>{examData.title}</p>}
                        </div>
                    </section>

                    <section css={style.list}>
                        <div className="inner contain-size-m">
                            {examResult.map((item, i) => (
                                <CardResult item={item} openDropper={openDropper} setOpenDropper={setOpenDropper} num={i +1} key={i} />
                            ))}
                        </div>
                    </section>

                </MainLayout>
            )}
        </UserOnlyRoute>
    )
}

const style = {
    page: css`
        padding-top: 48px;
    `,
    list: css`

    `,
    header: css`
        .inner{
            padding: 24px 0 48px 0;
            
            @media (max-width: 600px) {
                padding: 32px 0;
            }
        }
        
        h1 {
            font-family: Poppins;
            font-weight: 600;
            font-size: 40px;
            color: #1A2C1E;

            @media (max-width: 780px) {
                font-size: 28px;
            }
        }
    `,

    illus: css`
        width: 90%;
        margin-bottom: 32px;

        .inner {
            margin-bottom: 24px;
        }

        p {
            margin-right: 24px;
            font-family: Poppins;
            font-weight: 700;
            font-size: 20px;
            color: #75AA87;

            a {
                text-decoration: underline;
            }
        }

        @media (max-width: 500px) {
            padding: 0;
            
            img {
                width: 88px;
            }
            
            p {
                line-height: 20px;
                font-size: 16px;
            }
        }
    `,

}

export default TryOutResult