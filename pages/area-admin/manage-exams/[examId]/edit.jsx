import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'

import AdminOnlyRoute from '@core/routeblocks/AdminOnlyRoute'
import { useAuth } from '@core/contexts/AuthContext'
import FireFetcher from '@core/services/FireFetcher'
import AdminLayout from '@components/layouts/AdminLayout'

const Edit = () => {
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const { authState, access } = useAuth()
    const { query: { examId } } = useRouter()

    useEffect(() => {
        if (examId) {
            FireFetcher.listen.examQuestions(examId, {
                attach: doc => {
                    setQuestions(doc.data().list)
                },
                detach: () => {
                    setQuestions([])
                }
            })
            FireFetcher.listen.examAnswers(examId, {
                attach: doc => {
                    setAnswers(doc.data().list)
                },
                detach: () => {
                    setAnswers([])
                }
            })
        }
    }, [examId])

    useEffect(() => {
        console.log(questions)
    }, [questions])
    
    useEffect(() => {
        console.log(answers)
    }, [answers])

    return (
        <AdminOnlyRoute>
            { authState === 'user' && access.admin && (
                <AdminLayout css={style.page} title="Exam Control" className="flex-sc col">
                    <select value={activeIndex} onChange={e => setActiveIndex(e.target.value)} name="index-pad" id="index-pad">    
                        {questions.map((item, i) => (
                            <option value={item.id - 1} key={i}>{item.id}</option>
                        ))}
                    </select>
                    {questions.length !== 0 && answers.length !== 0 &&
                        <>
                            <h1>{questions[activeIndex].id}</h1>
                            <h2>{answers[activeIndex].id}</h2>
                        </>
                    }
                </AdminLayout>
            )}
        </AdminOnlyRoute>
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