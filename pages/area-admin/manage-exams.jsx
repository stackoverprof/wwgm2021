import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'

import AdminOnlyRoute from '@core/routeblocks/AdminOnlyRoute'
import AdminLayout from '@components/layouts/AdminLayout'
import { useAuth } from '@core/contexts/AuthContext'
import FireFetcher from '@core/services/FireFetcher'
import CardDisplayWide from '@components/atomic/CardDisplayWide'
import MakeNewExams from '@components/molecular/AdminArea/MakeNewExams'
import DetailForm from '@components/molecular/AdminArea/DetailForm'

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
                    
                    <section css={style.form}>
                        <div className="inner contain-size-s flex-cc">
                            {active && <DetailForm examId={active} handleClose={() => setActive('')}/>}
                        </div>
                    </section>

                    <section css={style.cards}>
                        <div className="inner contain-size-m flex-cc col">
                            {examIdList.map((item, i) => (
                                <CardDisplayWide showId examId={item} key={i} onButton={() => setActive(item)}/>
                            ))}
                            <p className="label">Buat TryOut baru</p>
                            <MakeNewExams />
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
    cards: css`
        .label {
            margin: 24px 0;   
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
    `

}
export default ManageExams