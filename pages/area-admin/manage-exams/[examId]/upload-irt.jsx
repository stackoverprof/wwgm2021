import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'

import AdminOnlyRoute from '@core/routeblocks/AdminOnlyRoute'
import { useAuth } from '@core/contexts/AuthContext'
import { useLayout } from '@core/contexts/LayoutContext'
import AdminLayout from '@components/layouts/AdminLayout'
import { STORAGE } from '@core/services/firebase'
import axios from 'axios'
import FireFetcher from '@core/services/FireFetcher'

const UploadIRT = () => {
    const [currentLink, setCurrentLink] = useState('') 
    const { query: { examId } } = useRouter()
    const { user, authState, access } = useAuth()
    const { setGlobalAlert } = useLayout()

    const fileInput = useRef({current: {file: [{name: ''}]}})

    const validateFile = (file) => {
        const validType = ['application/pdf']

        return file && validType.includes(file.type)
    }

    const updateExam = async (url) => {
        await axios.post('/api/private/exams/edit-file-irt', {
                authToken: await user.getIdToken(),
                url: url,
                examId: examId
            })
            .then(() => {
                setGlobalAlert({error: false, body:'File hasil IRT telah dipublikasikan'})
            }).catch(err => {
                console.log(err)
                setGlobalAlert({error: true, body:'Gagal memperbarui DB. Refresh dan coba lagi'})
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const fileIRT = fileInput.current.files[0]

        if (!fileIRT) {
            setGlobalAlert({error: false, body:'Tidak ada file terdeteksi'})
            return
        }

        if (!validateFile(fileIRT)) {
            setGlobalAlert({error: true, body:'File tidak valid. Gunakan tipe .pdf'})
            return
        }

        const storageRef = STORAGE.ref('/FileIRT').child(fileIRT.name)
        await storageRef.put(fileIRT)
            .catch(() => {
                setGlobalAlert({error: true, body:'Gagal memperbarui put. Refresh dan coba lagi'})
                return
            })
        await storageRef.getDownloadURL()
            .then(res => {
                updateExam(res)
                return
            })
            .catch(() => {
                setGlobalAlert({error: true, body:'Gagal memperbarui link. Refresh dan coba lagi'})
                return
            })
    }

    useEffect(() => {
        if (examId) {
            const unlisten = FireFetcher.listen.examData(examId, {
                attach: doc => {
                    setCurrentLink(doc.data().fileIRT)
                },
                detach: () => {
                    setCurrentLink('')
                }
            })

            return () => unlisten()
        }
    }, [examId]) 

    return (
        <AdminOnlyRoute>
            { authState === 'user' && access.admin && (
                <AdminLayout css={style.page} title="Exam Control" className="flex-sc col">

                    <section css={style.header}>
                        <div className="inner contain-size-s flex-cc col">
                            <h1>Upload IRT</h1>
                            <p>{examId}</p>
                        </div>
                    </section>

                    <section css={style.form}>
                        <form onSubmit={handleSubmit} className="inner contain-size-s flex-cc col">
                            <p>current file : <a href={currentLink} download>download</a></p>
                            <input
                                ref={fileInput}
                                type="file"
                                name="irtfile"
                                id="irtfile"
                                accept="application/pdf"
                            />
                            <button type="submit">Upload</button>
                        </form>
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
        p {
            margin-bottom: 32px;
        }
        
        button {
            margin-top: 24px;
        }
    `
}
export default UploadIRT