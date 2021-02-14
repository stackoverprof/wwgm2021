import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { CgCloseR } from 'react-icons/cg'
import { FiEdit3 } from 'react-icons/fi'

import UserOnlyRoute from '@core/routeblocks/UserOnlyRoute'
import { useAuth } from '@core/contexts/AuthContext'
import to from '@core/routepath'
import MainLayout from '@comps-layouts/MainLayout'
import DashContent from '@comps-molecular/Dashboard/DashContent'
import UserCard from '@components/atomic/UserCard'

// [TODO] : Change profile pict
// [TODO] : Responsive belum bener
// [TODO] : kelebihan nambah : Pake sistem bobot IRT
// [TODO] : illus, kelengkapan data harus dipennuhi sebelum menjalani try out
// [TODO] : Yeay, datamu sudah lengkap. Jangan lupa untuk mengisi nomor peserta disini
// [TODO] : Nomor peserta didapat pada saat melakukan pembayaran dengan panitia, 

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Try Out')
    const [editSwitch, setEditSwitch] = useState(false)
    const { query: { action } } = useRouter()
    
    const { authState, dataCompleted } = useAuth()

    const openEdit = () => {
        setActiveTab('Biodata')
        setEditSwitch(true)
    }

    useEffect(() => {
        if (action === 'edit') openEdit()
    }, [action])

    return (
        <UserOnlyRoute redirect={to.home}>
            { authState === 'user' && (    
                <MainLayout css={style.page} title="Dashboard" className="flex-s`c col">

                    <section css={style.userCard}>
                        <UserCard />
                    </section>

                    <section css={style.header}>
                        <div className="inner contain-size-s flex-bc">
                            <h1>Dashboard</h1>
                            {!editSwitch && <button onClick={openEdit} className="bordered"><FiEdit3 /><p>{dataCompleted ? 'Ubah' : 'Lengkapi'} Biodata</p></button>}
                            {editSwitch && <button onClick={() => setEditSwitch(false)} className="bordered cancel"><CgCloseR /><p>Batal mengubah</p></button>}
                        </div>
                    </section>

                    <hr className="fade contain-size-sm"/>

                    <section css={style.content}>
                        <DashContent openEdit={openEdit} activeTab={activeTab} setActiveTab={setActiveTab} editSwitch={editSwitch} setEditSwitch={setEditSwitch}/>
                    </section>

                </MainLayout>
            )}
        </UserOnlyRoute>
    )
}

const style = {
    page: css`
        padding: 32px 0;
    `,


    header: css`
        .inner{
            padding: 48px 0;
            
            @media (max-width: 600px) {
                padding: 32px 0;
                /* flex-direction: column; */
            }
        }

        h1 {
            font-family: Poppins;
            font-weight: 600;
            font-size: 40px;
            color: #1A2C1E;

            
            @media (max-width: 780px) {
                margin-left: 24px;
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
            
            @media (max-width: 780px) {
                margin-right: 24px;
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
                /* margin-top: 12px; */
                p {
                    display: none;
                }

                svg {
                    margin: 0;
                }
            }
        }
    `,

    content: css`
        
    `,

    userCard: css`

    `
}

export default Dashboard