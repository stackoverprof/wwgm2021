import React from 'react'
import { css } from '@emotion/react'
import { FaPlus } from 'react-icons/fa'

import initialFormat from '@core/utils/makeExam'
import convert from '@core/utils/convertExamData'
import axios from 'axios'
import { useAuth } from '@core/contexts/AuthContext'
import { useLayout } from '@core/contexts/LayoutContext'

const MakeNewExams = () => {
    const { setGlobalAlert } = useLayout()
    const { user } = useAuth()

    const newExam = async (cluster) => {
        setGlobalAlert('')
        const now = new Date()

        axios.post('/api/private/exams/new', {
            ...initialFormat[cluster],
            availability: {
                start: now.toISOString(),
                end: convert.later(now)
            },
            authToken: await user.getIdToken()
        })
        .then(res => setGlobalAlert({error: false, body: res.data.message}))
        .catch(err => setGlobalAlert({error: true, body: err.response.data.message}))
    }

    return (
        <>
            <div css={style} className="flex-cs col">                                
                <button className="add" onClick={() => newExam('UMUM_PU')}><FaPlus />Penalaran Umum</button>
                <button className="add" onClick={() => newExam('UMUM_PBM')}><FaPlus />Pemahaman Bacaan dan Menulis</button>
                <button className="add" onClick={() => newExam('UMUM_PPU')}><FaPlus />Pengetahuan dan Pemahaman Umum</button>
                <button className="add" onClick={() => newExam('UMUM_PK')}><FaPlus />Pengetahuan Kuantitatif</button>
            </div>
            <div css={style} className="flex-cs col">                                
                <button className="add" onClick={() => newExam('SAINTEK_MATEMATIKA')}><FaPlus />Matematika</button>
                <button className="add" onClick={() => newExam('SAINTEK_FISIKA')}><FaPlus />Fisika</button>
                <button className="add" onClick={() => newExam('SAINTEK_KIMIA')}><FaPlus />Kimia</button>
                <button className="add" onClick={() => newExam('SAINTEK_BIOLOGI')}><FaPlus />Biologi</button>
            </div>
            <div css={style} className="flex-cs col">                                
                <button className="add" onClick={() => newExam('SOSHUM_SEJARAH')}><FaPlus />Sejarah</button>
                <button className="add" onClick={() => newExam('SOSHUM_GEOGRAFI')}><FaPlus />Geografi</button>
                <button className="add" onClick={() => newExam('SOSHUM_SOSIOLOGI')}><FaPlus />Sosiologi</button>
                <button className="add" onClick={() => newExam('SOSHUM_EKONOMI')}><FaPlus />Ekonomi</button>
            </div>
        </>
    )
}

const style = css`
    margin: 12px 0;
    width: 100%;
    max-width: 400px;
    
    button.add {
        margin: 6px 0;
        padding: 12px 10px;
        width: 100%;
        text-align: left;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 16px;

        svg {
            margin-right: 8px;
        }
    }
`

export default MakeNewExams