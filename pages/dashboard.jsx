import React, { useState } from 'react'
import { css } from '@emotion/react'
import UserOnlyRoute from '@core/routeblocks/UserOnlyRoute'
import to from '@core/routepath'
import { useAuth } from '@core/contexts/AuthContext'

import { FiEdit3 } from 'react-icons/fi'
import { CgCloseR } from 'react-icons/cg'
import MainLayout from '@components/layouts/MainLayout'
import DashContent from '@components/molecular/Dashboard/DashContent'

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Try Out')
    const [editSwitch, setEditSwitch] = useState(false)
    
    const { userData, authState, dataCompleted } = useAuth()

    const openEdit = () => {
        setActiveTab('Biodata')
        setEditSwitch(true)
    }

    return (
        <UserOnlyRoute redirect={to.home}>
            { authState === 'user' && (    
                <MainLayout css={style.page} title="Dashboard" className="flex-s`c col">

                    <section css={style.userCard}>
                        <div className="card contain-size-sm flex-sc">
                            <img src={userData.photoURL} alt=""/>
                            <div>
                                <p className="display-name">{userData.displayName}</p>
                                <p className="email">{userData.email}</p>
                            </div>
                        </div>
                    </section>

                    <section css={style.header}>
                        <div className="inner contain-size-s flex-bc">
                            <h1>Dashboard</h1>
                            {!editSwitch && <button onClick={openEdit} className="bordered"><FiEdit3 />{dataCompleted ? 'Ubah' : 'Lengkapi'} Biodata</button>}
                            {editSwitch && <button onClick={() => setEditSwitch(false)} className="bordered cancel"><CgCloseR />Batal mengubah</button>}
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

    content: css`
        
    `,

    header: css`
        .inner{
            padding: 48px 50px;
        }

        h1 {
            font-family: Poppins;
            font-weight: 600;
            font-size: 40px;
            color: #1A2C1E;
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
        }
    `,

    userCard: css`
        .card {
            background: #FFFFFF;
            border: 1px solid #AFAFAF;
            box-sizing: border-box;
            box-shadow: 0px 15px 24px -18px rgba(0, 0, 0, 0.25);
            border-radius: 12px;

            img {
                height: 84px;
                width: 84px;
                border-radius: 50%;
                margin: 20px;
            }

            p.display-name {
                font-family: Poppins;
                font-weight: 600;
                font-size: 24px;
                color: #1A2C1E;
            }

            p.email{
                font-family: Poppins;
                font-size: 20px;
                color: #6C6C6C;
            }
        }
    
    `
}

export default Dashboard