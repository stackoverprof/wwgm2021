import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import axios from 'axios'
import { useRouter } from 'next/router' 

import AdminOnlyRoute from '@core/routeblocks/AdminOnlyRoute'
import { useLayout } from '@core/contexts/LayoutContext'
import { useAuth } from '@core/contexts/AuthContext'
import FireFetcher from '@core/services/FireFetcher'
import AdminLayout from '@components/layouts/AdminLayout'
import QuizNav from '@components/atomic/QuizNav'
import InputMCE from '@components/atomic/InputMCE'
import Spinner from '@components/atomic/spinner/Circle'

const Edit = () => {
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [inputData, setInputData] = useState({})
    const [loading, setLoading] = useState(false)

    const { setGlobalAlert } = useLayout()
    const { user, authState, access } = useAuth()
    const { query: { examId } } = useRouter()

    const mutateInputData = ({target: { name, value }}) => {
        setInputData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const mutateMCE = {
        question: (value) => {
            setInputData((prevState) => ({
                ...prevState,
                ['question']: value
            }))
        },
        explanation: (value) => {
            setInputData((prevState) => ({
                ...prevState,
                ['explanation']: value
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setGlobalAlert('')

        axios.post('/api/private/exams/update-content', {
            authToken: await user.getIdToken(),
            examId: examId,
            index: activeIndex,
            data: inputData
        })
        .then(res => {
            setGlobalAlert({error: false, body: res.data.message})
            setLoading(false)
        })
        .catch(err => {
            setGlobalAlert({error: true, body: err.response.data.message})
            setLoading(false)
        })
    }

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
        if (questions.length !== 0 && answers.length !== 0){
            setInputData({
                question: questions[activeIndex].body,
                optionA: questions[activeIndex].options[0].body,
                optionB: questions[activeIndex].options[1].body,
                optionC: questions[activeIndex].options[2].body,
                optionD: questions[activeIndex].options[3].body,
                optionE: questions[activeIndex].options[4].body,
                key: answers[activeIndex].body,
                explanation: answers[activeIndex].explanation,
                level: answers[activeIndex].level
            })
        }
    }, [questions, answers, activeIndex])

    return (
        <AdminOnlyRoute>
            { authState === 'user' && access.admin && (
                <AdminLayout css={style.page} title="Exam Control" className="flex-sc col">
                    {questions.length !== 0 && answers.length !== 0 && (
                    <>
                        <section css={style.header}>
                            <div className="inner contain-size-m flex-cc col">
                                <h1>EDIT SOAL</h1>
                            </div>
                        </section>

                        <section css={style.navigator}>
                            <div className="inner contain-size-m flex-cc">
                                <QuizNav inputData={Array(questions.length).fill('')} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
                            </div>
                        </section>

                        <section css={style.form}>
                            <div className="inner contain-size-m">
                                {questions.length !== 0 && answers.length !== 0 &&
                                    <form onSubmit={handleSubmit} className="flex-cc col">
                                        <div className="input-group flex-cs col">
                                            <label>Pertanyaan</label>
                                            <InputMCE value={inputData.question} onChange={mutateMCE.question}/>
                                        </div>
                                        <div className="input-group flex-cs col">
                                            <label>Opsi A</label>
                                            <textarea value={inputData.optionA} onChange={mutateInputData} name="optionA" id="optionA"></textarea>                                    
                                        </div>
                                        <div className="input-group flex-cs col">
                                            <label>Opsi B</label>
                                            <textarea value={inputData.optionB} onChange={mutateInputData} name="optionB" id="optionB"></textarea>                                    
                                        </div>
                                        <div className="input-group flex-cs col">
                                            <label>Opsi C</label>
                                            <textarea value={inputData.optionC} onChange={mutateInputData} name="optionC" id="optionC"></textarea>                                    
                                        </div>
                                        <div className="input-group flex-cs col">
                                            <label>Opsi D</label>
                                            <textarea value={inputData.optionD} onChange={mutateInputData} name="optionD" id="optionD"></textarea>                                    
                                        </div>
                                        <div className="input-group flex-cs col">
                                            <label>Opsi E</label>
                                            <textarea value={inputData.optionE} onChange={mutateInputData} name="optionE" id="optionE"></textarea>
                                        </div>
                                        <div className="input-group flex-cs col">
                                            <label>Kunci Jawaban</label>
                                            <select value={inputData.key} onChange={mutateInputData} name="key" id="key">
                                                <option disabled value="">-</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                                <option value="E">E</option>
                                            </select>
                                        </div>
                                        <div className="input-group flex-cs col">
                                            <label>Pembahasan</label>
                                            <InputMCE value={inputData.explanation} onChange={mutateMCE.explanation}/>
                                        </div>
                                        <div className="input-group flex-cs col">
                                            <label>Level kesulitan</label>
                                            <select value={inputData.level} onChange={mutateInputData} name="level" id="level">
                                                <option disabled value="">-</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>
                                        <button type="submit">{loading ? <Spinner /> : 'SIMPAN'}</button>
                                    </form>
                                }
                            </div>
                        </section>
                    </>
                    )}
                </AdminLayout>
            )}
        </AdminOnlyRoute>
    )
}

const style = {
    page: css`
    `,
    navigator: css`
        margin-bottom: 24px;
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
    form: css`

        form {
            width: 100%;

            img {
                max-height: 400px;
            }

            select {
                width: 100%;
                height: 32px;
            }

            .input-group {
                width: 100%;
                margin: 6px 0;
            }

            textarea {
                width: 100%;
                height: 100px;
                min-height: 100px;
                resize: vertical;
            }
        }
    `
}
export default Edit