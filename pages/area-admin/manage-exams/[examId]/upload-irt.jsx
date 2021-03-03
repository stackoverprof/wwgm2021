import React from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'

import AdminOnlyRoute from '@core/routeblocks/AdminOnlyRoute'
import { useAuth } from '@core/contexts/AuthContext'
import AdminLayout from '@components/layouts/AdminLayout'

const UploadIRT = () => {
    const { authState, access } = useAuth()
    const { query: { examId } } = useRouter()

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
    `
}
export default UploadIRT