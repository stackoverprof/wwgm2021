import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import axios from 'axios'

import { useLayout } from '@core/contexts/LayoutContext'
import { useAuth } from '@core/contexts/AuthContext'
import convert from '@core/utils/convertExamData'
import { set } from '@core/routepath'

const DetailForm = ({examId, handleClose}) => {
    const [inputData, setInputData] = useState({
        status: '',
        start: new Date(),
        end: new Date(),
        duration: 0,
        predecessor: '',
        successor: ''
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
                status: data.status,
                start: data.availability.start,
                end: data.availability.end,
                duration: data.duration,
                predecessor: data.predecessor,
                successor: data.successor
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
                    <label htmlFor="status">Status</label>
                    <select value={inputData.status} onChange={mutateInputData} name="status" id="status">
                        <option value="limited">Limited - Mengkuti waktu ketersediaan</option>
                        <option value="open">Open - Terbuka tanpa batas waktu</option>
                        <option value="closed">Closed - Tidak diedarkan</option>
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
                <div className="input-group flex-cs col full-w">
                    <label htmlFor="duration">Duration</label>
                    <input value={inputData.duration} onChange={mutateInputData} type="number" id="duration" name="duration"/>
                </div>
                <div className="input-group flex-cs col full-w">
                    <label htmlFor="predecessor">Predecessor</label>
                    <input value={inputData.predecessor} onChange={mutateInputData} type="text" id="predecessor" name="predecessor"/>
                </div>
                <div className="input-group flex-cs col full-w">
                    <label htmlFor="successor">Successor</label>
                    <input value={inputData.successor} onChange={mutateInputData} type="text" id="successor" name="successor"/>
                </div>
                <button type="submit">SUBMIT</button>
                <div className="flex-cc col">
                    <Link href={set.examParticipants({examId: examId})}><a className="action">Manage Peserta</a></Link>
                    <Link href={set.examEdit({examId: examId})}><a className="action">Manage Soal</a></Link>
                    <Link href={set.examUploadIRT({examId: examId})}><a className="action">Upload file IRT</a></Link>
                </div>
            </form>
        }
        </>
    )
}

const style = css`
    padding-top: 80px;

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