import React, { useRef } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'

import AdminOnlyRoute from '@core/routeblocks/AdminOnlyRoute'
import { useAuth } from '@core/contexts/AuthContext'
import { useLayout } from '@core/contexts/LayoutContext'
import AdminLayout from '@components/layouts/AdminLayout'

const UploadIRT = () => {
    const { query: { examId } } = useRouter()
    const { authState, access } = useAuth()
    const { setGlobalAlert } = useLayout()

    const fileInput = useRef({current: {file: [{name: ''}]}})

    const validateFile = (file) => {
        const validType = ['application/pdf']

        return file && validType.includes(file.type)
    }

    const handleSubmit = e => {
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

        console.log(fileIRT)
    }

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
    
    `
}
export default UploadIRT