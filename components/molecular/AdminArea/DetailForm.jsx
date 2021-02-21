import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import axios from 'axios'

import { useLayout } from '@core/contexts/LayoutContext'
import { useAuth } from '@core/contexts/AuthContext'
import convert from '@core/utils/convertExamData'
import { to } from '@core/routepath'

// [TODO] : Delete exam cleanly

const DetailForm = ({examId, handleClose}) => {
    const [inputData, setInputData] = useState({
        title: '',
        status: '',
        start: new Date(),
        end: new Date()
    })
    const { setGlobalAlert } = useLayout()
    const { user } = useAuth()

    const mutateInputData = ({target: { name, value }}) => {
        setInputData((prevState) => ({
            ...prevState,
            [name]: name === 'start' || name === 'end' ? new Date(value).toISOString() : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        axios.post('/api/private/exams/edit', {
            ...inputData,
            authToken: await user.getIdToken(),
            examId: examId
        }).then(res => {
            setGlobalAlert({error: false, body: res.data.message})
            handleClose()
        }).catch(err => setGlobalAlert({error: true, body: err.response.data.message}))
    }

    useEffect(() => {
        
        axios.post('/api/public/exams/get-exam-data', {
            examId: examId
        }).then(res => res.data.body)
        .then(data => {
            setInputData({
                title: data.title,
                status: data.status,
                start: data.availability.start,
                end: data.availability.end
            })
        })
        .catch(err => setGlobalAlert({error: true, body: err.response.data.message}))

    }, [examId])

    return (
        <>
        {Object.keys(inputData).length !== 0 &&
            <form css={style} onSubmit={handleSubmit} className="full-w flex-cc col">
                <p className="header">Edit data</p>
                <p className="header">{examId}</p>
                <div className="input-group flex-cs col full-w">
                    <label htmlFor="title">Judul Ujian</label>
                    <input value={inputData.title} onChange={mutateInputData} type="text" id="title" name="title"/>
                </div>
                <div className="input-group flex-cs col full-w">
                    <label htmlFor="status">Status</label>
                    <select value={inputData.status} onChange={mutateInputData} name="status" id="status">
                        <option value="limited">Limited - Mengkuti waktu ketersediaan</option>
                        <option value="open">Open - Terbuka tanpa batas waktu</option>
                        <option value="closed">Closed - Tidak diedarkan</option>
                        <option value="public">Public - Terbuka untuk publik (termasuk non-user)</option>
                    </select>
                </div>
                <div className="input-group flex-cs col full-w">
                    <label htmlFor="start">Pembukaan</label>
                    <input value={convert.viewLocal(inputData.start)} onChange={mutateInputData} type="datetime-local" id="start" name="start"/>
                </div>
                <div className="input-group flex-cs col full-w">
                    <label htmlFor="end">Penutupan</label>
                    <input value={convert.viewLocal(inputData.end)} onChange={mutateInputData} type="datetime-local" id="end" name="end"/>
                </div>
                <button type="submit">SUBMIT</button>
                <div className="flex-cc">
                    <Link href={to._404}><a className="action">Manage Peserta</a></Link>
                    <Link href={to._404}><a className="action">Manage Soal</a></Link>
                </div>
            </form>
        }
        </>
    )
}

const style = css`

    .header {
        text-align: center;    
    }

    .input-group {
        margin: 6px 0;
    }

    input, select {
        width: calc(100% - 20px);
    }

    select {
        height: 40px;
        padding: 0 10px;
        border-radius: 8px;
    }

    button {
        margin: 4px 0 12px 0;
    }

    a.action {
        margin: 0 4px;
    }
`

export default DetailForm