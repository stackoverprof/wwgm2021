import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import OutsideClickHandler from 'react-outside-click-handler'
import { BiCloudUpload } from 'react-icons/bi'

import { useLayout } from '@core/contexts/LayoutContext'
import Spinner from '@components/atomic/spinner/Circle'

const SubmissionPopUp = ({handleSubmission, emptyAnswers, loading, handleClose}) => {
    const [done, setDone] = useState(false)

    const { setDimm } = useLayout()

    const submitActions = () => {
        handleSubmission()
        setDone(true)
    }

    useEffect(() => {
        setDimm(true)

        return () => setDimm(false)
    }, [])

    return (
        <div css={style} className="fixed fullscreen flex-cs">
            <OutsideClickHandler onOutsideClick={handleClose} display="flex">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -10}} 
                    animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, delay: 0.1}}} 
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 }}} 
                    className="pop-up flex-bc col"
                >
                    <p className="title">{!done ? 'Konfirmasi Pengumpulan' : 'Berhasil Terkumpul'}</p>
                    {emptyAnswers > 0 && !done && <p className="message">{emptyAnswers} soal belum terjawab</p>}
                    <div className="buttons-container full-w flex-cc col">
                        {!done &&
                            <button onClick={submitActions}>
                                {!loading ? <>KUMPULKAN &nbsp; <BiCloudUpload /></> : <Spinner />}
                            </button>
                        }
                        <button onClick={handleClose} className="bordered tutup">Tutup</button>
                    </div>
                </motion.div>
            </OutsideClickHandler>
        </div>    
    )
}

const style = css`
    padding-top: 100px;
    z-index: 99;
    pointer-events: none;
    
    > div {
        pointer-events: all;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pop-up {
        background: #fff;
        width: 272px;
        padding: 24px;
        border-radius: 8px;

        img {
            height: 200px;
            margin-bottom: 24px;
        }
    }

    p.title {
        font-family: Poppins;
        font-weight: 800;
        color: var(--army);
        font-size: 24px;
        text-align: center;
    }
    
    p.message {
        font-family: Poppins;
        font-weight: 600;
        color: var(--army);
        font-size: 16px;
        text-align: center;
        margin-top: 24px;
        margin-bottom: 6px;
    }

    .buttons-container {
        margin-top: 24px;
        button, .btn {
            width: 90%;
            max-height: 48px;
            height: 48px;
            min-height: 48px;
            padding: 0 18px !important;
            margin: 6px 0;
        }

        @media (max-width: 720px) {
            flex-direction: column;
        }
    }
`

export default SubmissionPopUp