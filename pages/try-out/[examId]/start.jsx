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
import OptionsUI from '@components/atomic/OptionsUI'
import QuestionUI from '@components/atomic/QuestionUI'

const Edit = () => {
    const [questions, setQuestions] = useState([])
    const [inputData, setInputData] = useState(Array(20).fill(''))
    const [activeIndex, setActiveIndex] = useState(0)
    const [examData, setExamData] = useState(null)
    
    const { user, authState } = useAuth()
    const { query: { examId, sesi } } = useRouter()
    const { setGlobalAlert } = useLayout()
    
    const safeLocal = (filler) => {
        localStorage.setItem('user', user.email)
        localStorage.setItem('examId', examId)
        localStorage.setItem('sesi', sesi)
        localStorage.setItem('answers', JSON.stringify(filler))
    }
    
    const mutateChange = (e) => {
        setInputData(prev => {
            let filler = [...prev]
            filler[activeIndex] = filler[activeIndex] === e.target.value ? '' : e.target.value
            safeLocal(filler)
            return filler
        })
    }

    const fetchQuestions = async () => {
        axios.post('/api/user/exams/get-questions', {
            authToken: await user.getIdToken(),
            examId: examId,
            sesi: sesi
        }).then(res => setQuestions(res.data.body))
        .catch(err => setGlobalAlert({error: true, body: err.response.data.message}))
    }

    const fetchExamData = async () => {
        await axios.post('/api/public/exams/get-exam-data', {
            examId: examId
        })
        .then(res => setExamData(res.data.body))
        .catch(err => setGlobalAlert({error: true, body: err.response.data.message}))
    }

    useEffect(() => {
        if (examId) fetchExamData()
    }, [examId])

    useEffect(() => {
        if (examId && sesi && typeof user.getIdToken === 'function') {
            fetchQuestions()
        }
    }, [examId, user, sesi])

    useEffect(() => {
        const savedExamId = localStorage.getItem('examId')
        const savedSesi = localStorage.getItem('sesi')
        const savedUser = localStorage.getItem('user')
        const savedAnswers = JSON.parse(localStorage.getItem('answers'))

        if(user.email && sesi && examId && savedExamId === examId && savedSesi === sesi && savedUser === user.email) {
            setInputData(savedAnswers)
        }
    }, [user, examId, sesi])

    return (
        <UserOnlyRoute redirect={to.home}>
            { authState === 'user' && (
                <MainLayout css={style.page} title="Exam Control" className="flex-sc col">
                    {questions.length !== 0 && examData && (
                    <>  

                        <section css={style.header}>
                            <div className="inner contain-size-m flex-cc">
                                <div className="no flex-cc">
                                    {questions[activeIndex].id}
                                </div>
                                <div className="detail flex-bc">
                                    <p>SESI {sesi} <span className="hide">: {examData.sessions[sesi - 1].name}</span></p>
                                    <p className="kluster"><strong>{examData.cluster}</strong></p>
                                </div>
                            </div>
                        </section>

                        <section css={style.main}>
                            <div className="inner contain-size-m">
                                <QuestionUI question={questions[activeIndex]}/>
                                <OptionsUI
                                    options={questions[activeIndex].options}
                                    value={inputData[activeIndex]}
                                    onChange={mutateChange}
                                />
                            </div>
                        </section>

                        <section css={style.navigator}>
                            <div className="inner contain-size-m flex-cc col">
                                <div className="buttons full-w flex-bc">
                                    <button>Previous</button>
                                    <button>Next</button>
                                </div>
                                <QuizNav
                                    activeIndex={activeIndex}
                                    setActiveIndex={setActiveIndex}
                                    inputData={inputData}
                                />
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
        margin-bottom: 32px;
    `,
    navigator: css`
        .buttons {
            margin-bottom: 24px;
        }
    `,
    header: css`
        margin-bottom: 24px;

        .no {
            height: 52px;
            min-width: 20px;
            padding: 0 16px;
            font-family: Poppins;
            font-weight: 700;
            font-size: 24px;
            color: white;
            background: var(--army);
            border-radius: 8px;
            margin-right: 12px;
            box-shadow: 0 10px 12px -10px #0008;
        }
        .detail {
            height: 50px;
            width: 100%;
            border: 1px solid #0005;
            border-radius: 8px;
            padding: 0 16px;

            p {
                font-family: Poppins;
                font-weight: 400;
                font-size: 20px;
                color: var(--army);
                text-transform: uppercase;
                white-space: nowrap;
                max-width: 100%;
                text-overflow: ellipsis;
                overflow: hidden;
                
                @media (max-width: 800px) {
                    font-size: 18px;
                    max-width: 450px;
                }
                @media (max-width: 700px) {
                    max-width: 350px;
                }
                @media (max-width: 620px) {
                    max-width: 250px;
                }
                @media (max-width: 520px) {
                    max-width: 150px;
                }

                &.kluster {
                    min-width: 100px;
                    text-align: right;
                }
                
                span.hide {
                    @media (max-width: 410px) {
                        display: none;
                    }
                }
            }
        }
    `,
    userList: css`
    
    `
}
export default Edit