import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import AdminOnlyRoute from '@core/routeblocks/AdminOnlyRoute'
import { useAuth } from '@core/contexts/AuthContext'
import FireFetcher from '@core/services/FireFetcher'
import AdminLayout from '@components/layouts/AdminLayout'
import axios from 'axios'
import { useLayout } from '@core/contexts/LayoutContext'
import { STORAGE } from '@core/services/firebase'

const Edit = () => {
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [inputData, setInputData] = useState({})

    const fileInput = useRef({current: {file: [{name: ''}]}})
    
    const { setGlobalAlert } = useLayout()
    const { user, authState, access } = useAuth()
    const { query: { examId } } = useRouter()

    const mutateInputData = ({target: { name, value }}) => {
        setInputData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const generateFileName = (prevName) => {
        const unique = uuid().split('-').shift()
        const ext = prevName.split('.').pop()

        return `${prevName}-${unique}.${ext}`
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setGlobalAlert('')
        
        const image = fileInput.current.files[0]
        let imageLink = ''

        if (image) {
            const filename = generateFileName(image.name)
            const storageRef = STORAGE.ref('/Users/profile-pictures').child(filename)
            await storageRef.put(image)
                .catch(() => {
                    setGlobalAlert({error: true, body:'Gagal input image'})
                    return
                })
            imageLink = await storageRef.getDownloadURL()
                .catch(() => {
                    setGlobalAlert({error: true, body:'Gagal input image'})
                    return 
                })
        }

        axios.post('/api/private/exams/update-content', {
            authToken: await user.getIdToken(),
            examId: examId,
            index: activeIndex,
            data: {
                ...inputData,
                imageURL: imageLink ? imageLink : inputData.imageURL
            }
        })
        .then(res => {
            setGlobalAlert({error: false, body: res.data.message})
        })
        .catch(err => setGlobalAlert({error: true, body: err.response.data.message}))
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
            fileInput.current.value = ''
            setInputData({
                question: questions[activeIndex].body,
                optionA: questions[activeIndex].options[0].body,
                optionB: questions[activeIndex].options[1].body,
                optionC: questions[activeIndex].options[2].body,
                optionD: questions[activeIndex].options[3].body,
                optionE: questions[activeIndex].options[4].body,
                imageURL: questions[activeIndex].imageURL,
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
                    <select value={activeIndex} onChange={e => setActiveIndex(e.target.value)} name="index-pad" id="index-pad">
                         {questions.map((item, i) => (
                            <option value={item.id - 1} key={i}>{item.id}</option>
                        ))}
                    </select>
                    <section css={style.form}>
                        <div className="inner contain-size-s">
                            {questions.length !== 0 && answers.length !== 0 &&
                                <form onSubmit={handleSubmit} className="flex-cc col">
                                    <img src={inputData.imageURL} alt=""/>
                                    <div className="input-group">
                                        <input type="file" ref={fileInput} name="imageURL" id="imageURL"/>
                                    </div>
                                    <div className="input-group">
                                        <textarea value={inputData.question} onChange={mutateInputData} name="question" id="question"></textarea>                                    
                                    </div>
                                    <div className="input-group">
                                        <textarea value={inputData.optionA} onChange={mutateInputData} name="optionA" id="optionA"></textarea>                                    
                                    </div>
                                    <div className="input-group">
                                        <textarea value={inputData.optionB} onChange={mutateInputData} name="optionB" id="optionB"></textarea>                                    
                                    </div>
                                    <div className="input-group">
                                        <textarea value={inputData.optionC} onChange={mutateInputData} name="optionC" id="optionC"></textarea>                                    
                                    </div>
                                    <div className="input-group">
                                        <textarea value={inputData.optionD} onChange={mutateInputData} name="optionD" id="optionD"></textarea>                                    
                                    </div>
                                    <div className="input-group">
                                        <textarea value={inputData.optionE} onChange={mutateInputData} name="optionE" id="optionE"></textarea>
                                    </div>
                                    <div className="input-group">
                                        <select value={inputData.key} onChange={mutateInputData} name="key" id="key">
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                            <option value="E">E</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <textarea value={inputData.explanation} onChange={mutateInputData} name="explanation" id="explanation"></textarea>
                                    </div>
                                    <div className="input-group">
                                        <select value={inputData.level} onChange={mutateInputData} name="level" id="level">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>
                                    <button type="submit">SIMPAN</button>
                                </form>
                            }
                        </div>
                    </section>
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
    form: css`

        form {
            width: 100%;

            .input-group {
                width: 100%;
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