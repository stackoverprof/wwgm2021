import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import axios from 'axios'
import { useRouter } from 'next/router'

import UserOnlyRoute from '@core/routeblocks/UserOnlyRoute'
import { to } from '@core/routepath'
import { useAuth } from '@core/contexts/AuthContext'
import MainLayout from '@components/layouts/MainLayout'

const TryOutRank = () => {
    const [examData, setExamData] = useState(null)
    const [examResult, setExamResult] = useState(null)

    const { user, authState } = useAuth() 
    const { query: { examId } } = useRouter()
    
    const fetchData = async () => {
        await axios.post('/api/public/exams/get-exam-data', {
            examId: examId
        })
        .then(res => setExamResult(res.data.body))
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
    
    useEffect(() => {
        console.log(examData)
    }, [examData])
    
    useEffect(() => {
        console.log(examResult)
    }, [examResult])
    
    return (
        <UserOnlyRoute redirect={to.home}>
            { authState === 'user' && (
                <MainLayout css={style.page} title="Hasil TO" className="flex-sc col">
                    {/* {examResult?.map((answer, i) => (
                        <div key="i"></div>
                    ))} */}
                </MainLayout>
            )}
        </UserOnlyRoute>
    )
}

const style = css`
    
`

export default TryOutRank