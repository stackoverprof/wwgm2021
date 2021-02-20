import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import axios from 'axios'
import { FaPlus } from 'react-icons/fa'

import AdminOnlyRoute from '@core/routeblocks/AdminOnlyRoute'
import AdminLayout from '@components/layouts/AdminLayout'
import { useAuth } from '@core/contexts/AuthContext'
import FireFetcher from '@core/services/FireFetcher'
import CardDisplayWide from '@components/atomic/CardDisplayWide'
import initialFormat from '@core/utils/makeExam'
import { useLayout } from '@core/contexts/LayoutContext'
import convert from '@core/utils/convertExamData'

const ManageExams = () => {
    const [examIdList, setExamIdList] = useState([])
    const [active, setActive] = useState('')
    const { authState, access } = useAuth()

    useEffect(() => {
        const unlisten = FireFetcher.listen.allExams({
            attach: async (docs) => { 
                let filler = []
                docs.forEach(doc => filler.push(doc.id))
                setExamIdList(filler)
            },
            detach: () => {
                setExamIdList([])
            }
        })
        
        return () => unlisten()
    }, [])
    
    return (
        <AdminOnlyRoute>
            { authState === 'user' && access.admin && (
                <AdminLayout css={style.page} title="Dashboard" className="flex-sc col">

                    <section css={style.header}>
                        <div className="inner contain-size-s flex-cc">
                            <h1>Manage All Exams</h1>
                        </div>
                    </section>

                    <section css={style.cards}>
                        <div className="inner contain-size-m flex-cc col">
                            {examIdList.map((item, i) => (
                                <CardDisplayWide showId examId={item} key={i} onButton={() => setActive(item)}/>
                            ))}
                            <MakeExams />
                        </div>
                    </section>

                    <section css={style.form}>
                        <div className="inner contain-size-s flex-cc">
                            {active && <DetailForm examId={active}/>}
                        </div>
                    </section>

                </AdminLayout>
            )}
        </AdminOnlyRoute>
    )
}

const MakeExams = () => {
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
    <>
        <p className="label">Buat TryOut baru</p>
        <div className="buttons flex-cc">                                
            <button className="add" onClick={() => newExam('SAINTEK')}><FaPlus />SAINTEK</button>
            <button className="add" onClick={() => newExam('SOSHUM')}><FaPlus />SOSHUM</button>
        </div>
    </>
    )
}

const DetailForm = ({examId}) => {
    const [inputData, setInputData] = useState({
        title: '',
        status: '',
        start: '',
        end: ''
    })
    const { setGlobalAlert } = useLayout()

    const mutateInputData = (e) => {
        setInputData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const mutateTimestamp = (e) => {
        setInputData((prevState) => ({
            ...prevState,
            [e.target.name]: {
                ...prevState[e.target.name], 
                _seconds: (new Date(e.target.value)).getTime()}
        }))
    }

    useEffect(() => {
        axios.post('/api/public/exams/get-exam-data', {
            examId: examId
        }).then(res => res.data.body)
        .then(data => {
            console.log(data)
            setInputData({
                title: data.title,
                status: data.status,
                start: data.availability.start,
                end: data.availability.start
            })
        })
        .catch(err => setGlobalAlert({error: true, body: err.response.data.message}))

    }, [examId])

    useEffect(() => {
        console.log(inputData)
    }, [inputData])

    return (
        <>
        {Object.keys(inputData).length !== 0 &&
            <form className="full-w flex-cc col">
                <p>Edit data {examId}</p>
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
                    <input value={convert.withPicker(inputData.start)} onChange={mutateTimestamp} type="datetime-local" id="start" name="start"/>
                </div>
                <div className="input-group flex-cs col full-w">
                    <label htmlFor="end">Penutupan</label>
                    <input value={convert.withPicker(inputData.end)} onChange={mutateTimestamp} type="datetime-local" id="end" name="end"/>
                </div>
            </form>
        }
        </>
    )
}

const style = {
    page: css`

    `,
    cards: css`
        .label {
            margin: 24px 0;   
        }

        button.add {
            margin: 0 6px;

            svg {
                margin-right: 8px;
            }
        }
    `,
    header: css`
        .inner{
            padding: 48px 0;
            
            @media (max-width: 600px) {
                padding: 32px 0;
            }
        }

        .content {
            @media (max-width: 780px) {
                width: 90%;
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
        
        button {
            border-color: #0005;
            color: #0007;
            font-size: 18px;
            
            svg {
                margin-right: 12px;
            }
            
            &:hover {    
                box-shadow: inset 0 0 0 1px #0005;
                background: #00000008;
            }

            &.cancel {
                border-color: #c72121;
                color: #c72121;

                &:hover {
                    background: #c721210c;
                    box-shadow: inset 0 0 0 1px #c72121;
                }
            }

            @media (max-width: 600px) {

                p {
                    display: none;
                }

                svg {
                    margin: 0;
                }
            }
        }
    `,

    form: css`
        margin: 32px 0;

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
    `

}
export default ManageExams