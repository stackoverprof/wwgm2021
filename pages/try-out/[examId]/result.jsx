import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import axios from 'axios'
import { useRouter } from 'next/router'

import UserOnlyRoute from '@core/routeblocks/UserOnlyRoute'
import { to } from '@core/routepath'
import { useAuth } from '@core/contexts/AuthContext'
import MainLayout from '@components/layouts/MainLayout'
import CardResult from '@components/atomic/CardResult'

const TryOutRank = () => {
    const [examData, setExamData] = useState(null)
    const [examResult, setExamResult] = useState([])

    const { user, authState } = useAuth() 
    const { query: { examId } } = useRouter()
    
    const fetchData = async () => {
        await axios.post('/api/public/exams/get-exam-data', {
            examId: examId
        })
        .then(res => setExamData(res.data.body))
        .catch(err => console.log(err.response.data.message))
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
        .catch(err => console.log(err.response.data.message))
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

                    <section css={style.header}>
                        <div className="inner contain-size-s flex-cc col">
                            <h1>Detail Hasil Try Out</h1>
                        </div>
                    </section>

                    <section css={style.list}>
                        <div className="inner contain-size-s">
                            {examResult.map((item, i) => (
                                <CardResult item={item} i={i} key={i} />
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
    
    `,
    list: css`

    `,
    header: css`
    .inner{
        padding: 48px 0;
        
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
}

export default TryOutRank