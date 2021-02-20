import React from 'react'
import { css } from '@emotion/react'
import { FaPlus } from 'react-icons/fa'

import initialFormat from '@core/utils/makeExam'
import axios from 'axios'
import { useAuth } from '@core/contexts/AuthContext'
import { useLayout } from '@core/contexts/LayoutContext'

const MakeNewExams = () => {
    const { setGlobalAlert } = useLayout()
    const { user } = useAuth()

    const newExam = async (cluster) => {
        setGlobalAlert('')

        axios.post('/api/private/exams/new', {
            authToken: await user.getIdToken(),
            ...initialFormat[cluster]
        })
        .then(res => setGlobalAlert({error: false, body: res.data.message}))
        .catch(err => setGlobalAlert({error: true, body: err.response.data.message}))
    }

    return (
        <div css={style} className="flex-cc">                                
            <button className="add" onClick={() => newExam('SAINTEK')}><FaPlus />SAINTEK</button>
            <button className="add" onClick={() => newExam('SOSHUM')}><FaPlus />SOSHUM</button>
        </div>
    )
}

const style = css`
    button.add {
        margin: 0 6px;

        svg {
            margin-right: 8px;
        }
    }
`

export default MakeNewExams