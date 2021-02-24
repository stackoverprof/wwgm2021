import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'

import UserOnlyRoute from '@core/routeblocks/UserOnlyRoute'
import { useAuth } from '@core/contexts/AuthContext'
import MainLayout from '@components/layouts/MainLayout'
import { to } from '@core/routepath'
import axios from 'axios'
import { useLayout } from '@core/contexts/LayoutContext'

const Edit = () => {
    const [questions, setQuestions] = useState([])
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

    // useEffect(() => {
    //     console.log(questions)
    // }, [questions])

    return (
        <UserOnlyRoute redirect={to.home}>
            { authState === 'user' && (
                <MainLayout css={style.page} title="Exam Control" className="flex-sc col">
                    {questions.length !== 0 && (
                    <>  
                        <select value={activeIndex} onChange={e => setActiveIndex(e.target.value)} name="index-pad" id="index-pad">    
                            {questions.map((item, i) => (
                                <option value={item.id - 1} key={i}>{item.id}</option>
                                ))}
                        </select>
                        <h1>{questions[activeIndex].id}</h1>
                    </>
                    )}
                </MainLayout>
            )}
        </UserOnlyRoute>
    )
}

const style = {
    page: css`
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