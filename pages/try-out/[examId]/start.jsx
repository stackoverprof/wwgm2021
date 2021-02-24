import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import axios from 'axios'
import { useRouter } from 'next/router'

import UserOnlyRoute from '@core/routeblocks/UserOnlyRoute'
import { useAuth } from '@core/contexts/AuthContext'
import { to } from '@core/routepath'
import { useLayout } from '@core/contexts/LayoutContext'
import MainLayout from '@components/layouts/MainLayout'
import QuizNav from '@components/atomic/QuizNav'

const Edit = () => {
    const [questions, setQuestions] = useState([])
    const [inputData, setInputData] = useState(Array(20).fill(''))
    const [activeIndex, setActiveIndex] = useState(0)
    const { user, authState } = useAuth()
    const { query: { examId, sesi } } = useRouter()
    const { setGlobalAlert } = useLayout()

    const fetchQuestions = async () => {
        axios.post('/api/user/exams/get-questions', {
            authToken: await user.getIdToken(),
            examId: examId,
            sesi: sesi
        }).then(res => setQuestions(res.data.body))
        .catch(err => setGlobalAlert({error: true, body: err.response.data.message}))
    }

    useEffect(() => {
        if (examId && typeof user.getIdToken === 'function') {
            fetchQuestions()
        }
    }, [examId, user])

    return (
        <UserOnlyRoute redirect={to.home}>
        { authState === 'user' && (
        <MainLayout css={style.page} title="Exam Control" className="flex-sc col">
        {questions.length !== 0 && (
        <>  
            <section css={style.navigator}>
                <div className="inner contain-size-m flex-cc">
                    <QuizNav activeIndex={activeIndex} setActiveIndex={setActiveIndex} inputData={inputData}/>
                </div>
            </section>
            <section css={style.main}>
                <div className="inner contain-size-l">
                    <h1>{questions[activeIndex].body}</h1>
                </div>
            </section>
        </>
        )}
        </MainLayout>
        )}
        </UserOnlyRoute>
    )
}

const style = {
    page: css`
        margin: 24px 0;
    `,
    main: css`
        .inner {
            height: 1000px;
        }
    `,
    navigator: css`
    `,
    header: css`
        .inner{
            padding: 48px 0 24px 0;
            
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
    userList: css`
    
    `
}
export default Edit