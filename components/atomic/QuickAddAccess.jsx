import React, { useState } from 'react'
import { css } from '@emotion/react'
import { useLayout } from '@core/contexts/LayoutContext'
import { useAuth } from '@core/contexts/AuthContext'
import axios from 'axios'

const QuickAddExamAccess = ({examId}) => {
    const [inputData, setInputData] = useState({
        email: '',
        examId: examId ? examId : ''
    })

    const { user } = useAuth()
    const { setGlobalAlert } = useLayout()

    const mutateInputData = ({target: { name, value }}) => {
        setInputData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        
        axios.post('/api/private/users/exam-access-add', {
            authToken: await user.getIdToken(),
            issuedEmail: inputData.email,
            examId: inputData.examId
        })
        .then(res => {
            setInputData({
                email: '',
                examId: examId ? examId : ''
            })
            setGlobalAlert({error: false, body: res.data.message})
        })
        .catch(err => setGlobalAlert({error: true, body: err.response.data.message}))
    }

    return (
        <form onSubmit={handleSubmit} css={style} className="flex-cc col">
            <input value={inputData.email} onChange={mutateInputData} type="text" name="email"/>
            <input disabled={examId} value={inputData.examId} onChange={mutateInputData} type="text" name="examId"/>
            <button>ADD</button>
        </form>
    )
}

const style = css`
    margin-top: 12px;

    input, button {
        margin: 4px 0;
    }
`

export default QuickAddExamAccess