import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { FaArrowRight } from 'react-icons/fa'
import { BiCloudUpload } from 'react-icons/bi'

import UserOnlyRoute from '@core/routeblocks/UserOnlyRoute'
import { useAuth } from '@core/contexts/AuthContext'
import { to, set } from '@core/routepath'
import { useLayout } from '@core/contexts/LayoutContext'
import ExamLayout from '@components/layouts/ExamLayout'
import QuizNav from '@components/atomic/QuizNav'
import OptionsUI from '@components/atomic/OptionsUI'
import QuestionUI from '@components/atomic/QuestionUI'
import SubmissionPopUp from '@components/molecular/PopUps/SubmissionPopUp'

const Start = () => {
    const [countdown, setCountdown] = useState('')
    const [inputData, setInputData] = useState(Array(20).fill(''))
    const [activeIndex, setActiveIndex] = useState(0)
    const [questions, setQuestions] = useState([])
    const [examData, setExamData] = useState(null)
    const [openPopUp, setOpenPopUp] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const { user, authState } = useAuth()
    const { setDimm, setGlobalAlert } = useLayout()
    const { query: { examId } } = useRouter()
    const router = useRouter()
    
    const safeLocal = (filler) => {
        localStorage.setItem('answers', JSON.stringify(filler))
    }
    
    const mutateChange = ({target: { value }}) => {
        setInputData(prev => {
            let filler = [...prev]
            filler[activeIndex] = filler[activeIndex] !== value ? value : ''
            safeLocal(filler)
            return filler
        })
    }

    const countProgress = () => {
        return inputData.filter(item => item !== '').length
    }

    const showPopUp = {
        open: () => {
            setOpenPopUp(true)
        },
        close: () => {
            setDimm(false)
            setOpenPopUp(false)
        }
    }

    const handleSubmission = async () => {
        setLoading(true)

        console.log('submitting...')
        
        await axios.post('/api/user/exams/submit', {
            authToken: await user.getIdToken(),
            examId: examId,
            answers: inputData
        }).then(res => {
            setGlobalAlert({error: false, body: res.data.message + '. Menuju ke sesi selanjutnya...'})
            setTimeout(() => {
                if (examData.successor) router.push(set.overviewTO({examId: examData.successor}))
                else router.push(to.dashboard)
            }, 3000)
        })
        .catch(err => setGlobalAlert({error: true, body: err.response.data.message}))
        
        setLoading(false)
    }
    
    const fetchQuestions = async () => {
        axios.post('/api/user/exams/get-questions', {
            authToken: await user.getIdToken(),
            examId: examId
        }).then(res => setQuestions(res.data.body))
        .catch(err => setGlobalAlert({error: true, body: err.response.data.message}))
    }

    const fetchExamData = async () => {
        await axios.post('/api/public/exams/get-exam-data', {
            examId: examId
        }).then(res => setExamData(res.data.body))
        .catch(err => setGlobalAlert({error: true, body: err.response.data.message}))
    }

    const syncLocal = () => {
        const savedExamId = localStorage.getItem('examId')
        const savedUser = localStorage.getItem('user')
        const savedAnswers = JSON.parse(localStorage.getItem('answers'))
        const savedTime = JSON.parse(localStorage.getItem('time'))
        
        if (savedTime && savedAnswers && savedExamId === examId && savedUser === user.uid){
            setInputData(savedAnswers)
        }

        if (savedTime && savedExamId === examId && savedUser === user.uid) {
            setCountdown(savedTime)
        } else {
            const timeEnd = Date.now() + examData.duration * 60 * 1000
            setCountdown(timeEnd)
            localStorage.setItem('time', timeEnd)    
            localStorage.setItem('user', user.uid)
            localStorage.setItem('examId', examId)
        }    
    }

    useEffect(() => {
        if (examId) {
            fetchExamData()
        }
    }, [examId])

    useEffect(() => {
        if (examId && typeof user.getIdToken === 'function') {
            fetchQuestions()
        }
    }, [examId, user])
    
    useEffect(() => {
        if (questions.length !== 0 && user.uid && examId && examData) {
            syncLocal()
        }
    }, [examId, user, examData, questions])

    return (
        <UserOnlyRoute redirect={to.home}>
            { authState === 'user' && (
                <ExamLayout css={style.page} title="Try Out" className="flex-sc col" countdown={countdown} onTimeUp={handleSubmission}>
                    {questions.length !== 0 && examData && (
                        <>  

                            <section css={style.header}>
                                <div className="inner contain-size-m flex-cc">
                                    <div className="no flex-cc">
                                        {questions[activeIndex].id}
                                    </div>
                                    <div className="detail flex-bc">
                                        <p>{examData.title}</p>
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
                                        <button onClick={() => setActiveIndex(activeIndex > 0 ? activeIndex - 1 : 0)} className="bordered">Previous</button>
                                        <p className="answer-counter">{countProgress()} dari {inputData.length} terjawab</p>
                                        {activeIndex < 19 ?
                                            <button onClick={() => setActiveIndex(activeIndex < 19 ? activeIndex + 1 : 19)}>Next &nbsp; <FaArrowRight /></button>
                                            : 
                                            <button onClick={showPopUp.open}>KUMPULKAN &nbsp; <BiCloudUpload /></button>
                                        }
                                    </div>
                                    <p className="answer-counter-2">{countProgress()} dari {inputData.length} terjawab</p>
                                    <QuizNav
                                        activeIndex={activeIndex}
                                        setActiveIndex={setActiveIndex}
                                        inputData={inputData}
                                    />
                                </div>
                                {openPopUp && 
                                    <SubmissionPopUp
                                        loading={loading}
                                        handleSubmission={handleSubmission}
                                        emptyAnswers={inputData.length - countProgress()}
                                        handleClose={showPopUp.close}
                                        examId={examId}
                                    />
                                }
                            </section>
                            
                        </>
                    )}
                </ExamLayout>
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

        .answer-counter-2 {
            display: none;
            margin-bottom: 24px;
        }

        @media (max-width: 550px) {
            .answer-counter {
                display: none;
            }
            .answer-counter-2 {
                display: unset;
            }
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
export default Start