import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import axios from 'axios'
import { MdVerifiedUser } from 'react-icons/md'
import { RiFileShield2Line } from 'react-icons/ri'

import { useLayout } from '@core/contexts/LayoutContext'
import { useAuth } from '@core/contexts/AuthContext'
import InitialAva from '@components/atomic/InitialAva'
import AdminBadge from '@components/atomic/AdminBadge'
import UserDetail from '@components/atomic/UserDetail'
import FireFetcher from '@core/services/FireFetcher'

const CardManageUser = ({itemId, adminLabeled, i}) => {
    const [itemData, setItemData] = useState({})
    const [openDetail, setOpenDetail] = useState(false) 

    const { user } = useAuth()
    const { setGlobalAlert } = useLayout()

    const handleApproval = async (itemData, value) => {
        if (!itemData.noPeserta) {
            setGlobalAlert({error: true, body: 'User belum mengisi no peserta'})
            return
        }

        axios.post('/api/private/users/approval', {
            authToken: await user.getIdToken(),
            issuedEmail: itemData.email,
            value: value
        })
        .then(res => {
            setGlobalAlert({error: false, body: res.data.message})
        })
        .catch(err => setGlobalAlert({error: true, body: err.response.data.message}))
    }

    useEffect(() => {
        FireFetcher.listen.userData(itemId, {
            attach: (doc) => {
                setItemData(doc.data())
            },
            detach: () => {
                setItemData({})
            }
        })
    }, [])

    return (
        <div css={style} className="full-w flex-cc col">
           {itemData &&
                <div className="inner full flex-bc">
                    <div className="left flex-sc">
                        <InitialAva size={54} src={itemData.photoURL} displayName={itemData.displayName} className="ava"/>
                        <div>
                            <p className="name">{i + 1}. {itemData.fullName}</p>
                            <p className="email">{itemData.email}</p>
                        </div>
                    </div>
                    <div className="middle">
                        <p className="no-peserta">{itemData.noPeserta ? itemData.noPeserta : '—'}</p>
                    </div>
                    <div className="right flex-bc">
                        {adminLabeled && (
                            <div className="admin-badge flex-cc">
                                <AdminBadge />
                            </div>
                        )}
                        <button onClick={() => handleApproval(itemData, !itemData.approved)} className={`approval btn-icon ${itemData.approved ? 'green' : 'gray'}`}>
                            <MdVerifiedUser className="icon"/> 
                        </button>
                        <button onClick={() => setOpenDetail(!openDetail)} className="edit-nopes btn-icon orange">
                            <RiFileShield2Line className="icon"/> 
                        </button>
                    </div>
                </div>
            }
            {openDetail &&  <UserDetail item={itemData} />}
        </div>
    )
}

const style = css`
    background: #FFFFFF;
    box-shadow: 0px 15px 24px -18px rgba(0, 0, 0, 0.25), inset 0 0 0 1px #AFAFAF;
    border-radius: 12px;
    margin: 12px 0;
    
    .right {        
        @media (min-width: 950px) {
            justify-content: flex-end;
            min-width: 124px;
        }
        @media (max-width: 950px) {
            margin-top: 6px;
        }
    }

    .ava {
        margin-right: 16px;
    }

    .admin-badge {
        width: 24px;
        margin: 0 4px;
        font-size: 24px;
    }
    
    .inner {
        margin: 24px 0;
        width: calc(100% - 48px);

        @media (max-width: 950px) {
            flex-direction: column;
        }
    }

    .btn-icon {
        padding: 8px;
        border-radius: 6px;
        margin: 0 4px;

        box-shadow: 0 6px 8px -8px #000a;

        .icon {
            margin: 0;
        }

        &.orange {
            background: #fa903a;

            &:hover{
                box-shadow: 0 6px 8px -8px #000a, 0 0 0 2px white, 0 0 0 2.8px #fa903a;
            }
        }
        
        &.red {
            background: #da4342;

            &:hover{
                box-shadow: 0 6px 8px -8px #000a, 0 0 0 2px white, 0 0 0 2.8px #da4342;
            }
        }

        &.gray {
            background: #0005;

            &:hover{
                box-shadow: 0 6px 8px -8px #000a, 0 0 0 2px white, 0 0 0 2.8px #0005;
            }
        }

        &.green {
            background: #37a558;

            &:hover{
                box-shadow: 0 6px 8px -8px #000a, 0 0 0 2px white, 0 0 0 2.8px #37a558;
            }
        }

    }

    .left {
        
        p {
            width: 300px;
            font-family: Poppins;
            font-weight: normal;
            font-size: 16px;
            color: #1A2C1E;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            
            &.name {
                font-weight: 600;
            }
        }

        @media (max-width: 950px) {
            flex-direction: column;

            p {
                text-align: center;
                margin: 6px 0;
            }
        }
    }

    .middle {
        width: 150px;

        p {
            font-family: Poppins;
            font-weight: 700;
            font-size: 24px;
            color: #0005;
        }
    }

`

export default CardManageUser