import React, { useState } from 'react'
import { css } from '@emotion/react'
import axios from 'axios'
import { RiShieldFlashLine } from 'react-icons/ri'
import { MdSettings } from 'react-icons/md'

import { useAuth } from '@core/contexts/AuthContext'
import { useLayout } from '@core/contexts/LayoutContext'
import Spinner from '@comps-atomic/spinner/Circle'

const EditDisplayExams = ({i, refreshData}) => {
    const [show, setShow] = useState(false)
    const [examId, setExamId] = useState('')
    const [loading, setLoading] = useState(false)

    const { user } = useAuth()
    const { setGlobalAlert } = useLayout()

    const handleClose = () => {
        setExamId('')
        setShow(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        await axios.post('/api/private/exams/edit-displayed-exams', {
            position: i,
            examId: examId,
            token: await user.getIdToken()
        })
        .then(res => {
            setGlobalAlert({error: false, body: res.data.message})
            setExamId('')
            setShow(false)
            refreshData()
        })
        .catch(err => setGlobalAlert({error: true, body: err.response.data.message}))
        setLoading(false)
    }

    return (
        <div css={style} className="flex-cc col">
            <button onClick={() => setShow(!show)} className={`edit no-btn flex-bc mx-auto ${show ? 'active' : ''}`}>
                Ganti display <span className="flex-cc"><MdSettings /><RiShieldFlashLine color="orange" /></span>
            </button>
            {show &&
                <form onSubmit={handleSubmit} className="flex-cc col">
                    <input type="text" placeholder="Exam ID" required value={examId} onChange={e => setExamId(e.target.value)}/>
                    <div className="flex-bc full-w">
                        <button type="submit">{loading ? <Spinner w={64.5} h={26}/> : 'UBAH'}</button>
                        <button type="button" onClick={handleClose} className="bordered">BATAL</button>
                    </div>
                </form>
            }
        </div>
    )
}

const style = css`

    form{
        margin-top: 4px;
        width: 100%;
        max-width: 222px;
    }
    input{
        margin-bottom: 12px;
        width: calc(100% - 20px);
    }

    button.edit{
        padding: 12px;
        width: calc(100% - 24px);
        border-radius: 10px;
        margin-top: 6px;
        color: #0004;
        
        &:hover{            
            color: #000a;
            box-shadow: inset 0 0 0 1px #0004;

        }

        &.active{
            color: #000a;

            &:hover{
                box-shadow: none;
            }
        }
    }
`

export default EditDisplayExams