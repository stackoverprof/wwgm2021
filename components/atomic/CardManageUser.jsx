import React, { useState } from 'react'
import { css } from '@emotion/react'
import axios from 'axios'
import { MdVerifiedUser } from 'react-icons/md'
import { RiFileShield2Line } from 'react-icons/ri'

import { useLayout } from '@core/contexts/LayoutContext'
import { useAuth } from '@core/contexts/AuthContext'
import InitialAva from '@components/atomic/InitialAva'

const CardManageUser = ({item}) => {
    const [openDetail, setOpenDetail] = useState(false)

    const { user } = useAuth()
    const { setGlobalAlert } = useLayout()

    const handleApproval = async (item, value) => {
        if (!item.noPeserta) {
            setGlobalAlert({error: true, body: 'User belum mengaaisi no peserta'})
            return
        }

        axios.post('/api/private/users/approval', {
            authToken: await user.getIdToken(),
            issuedEmail: item.email,
            value: value
        })
        .then(res => {
            setGlobalAlert({error: false, body: res.data.message})
        })
        .catch(err => setGlobalAlert({error: true, body: err.response.data.message}))
    }

    return (
        <div css={style} className="full-w flex-cc col">
            <div className="inner full flex-bc">
                <div className="left flex-sc">
                    <InitialAva size={54} src={item.photoURL} displayName={item.displayName} className="ava"/>
                    <div>
                        <p className="name">{item.fullName}</p>
                        <p className="email">{item.email}</p>
                    </div>
                </div>
                <div className="middle">
                    <p className="no-peserta">{item.noPeserta ? item.noPeserta : '—'}</p>
                </div>
                <div className="right flex-bc">
                    <button onClick={() => handleApproval(item, !item.approved)} className={`approval btn-icon ${item.approved ? 'green' : 'gray'}`}>
                        <MdVerifiedUser className="icon"/> 
                    </button>
                    <button onClick={() => setOpenDetail(!openDetail)} className="edit-nopes btn-icon orange">
                        <RiFileShield2Line className="icon"/> 
                    </button>
                </div>
            </div>

            {openDetail && 
            <>
                <hr className="fade"/>

                <div className="inner detail full flex-bs">
                    <table>
                        <tbody>
                            <tr>
                                <td><strong>UID</strong></td>
                                <td className="data">&nbsp; : &nbsp; {item.uid}</td>
                            </tr>
                            <tr>
                                <td><strong>Display Name</strong></td>
                                <td className="data">&nbsp; : &nbsp; {item.displayName}</td>
                            </tr>
                            <tr>
                                <td><strong>Kontak</strong></td>
                                <td className="data">&nbsp; : &nbsp; {item.contact}</td>
                            </tr>
                            <tr>
                                <td><strong>Provinsi</strong></td>
                                <td className="data">&nbsp; : &nbsp; {item.province}</td>
                            </tr>
                            <tr>
                                <td><strong>Kota/Kab</strong></td>
                                <td className="data">&nbsp; : &nbsp; {item.city}</td>
                            </tr>
                            <tr>
                                <td><strong>Sekolah</strong></td>
                                <td className="data">&nbsp; : &nbsp; {item.school}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="bottom">
                        <p><strong>Akses Try Out :</strong></p>
                        {item.examsAccess.map((examId, i) => (
                            <p key={i}>{examId}</p>
                            ))}
                        {item.examsAccess.length === 0 && 
                            <p>—</p>
                        }
                    </div>
                </div>
            </>
            }
        </div>
    )
}

const style = css`
    background: #FFFFFF;
    box-shadow: 0px 15px 24px -18px rgba(0, 0, 0, 0.25), inset 0 0 0 1px #AFAFAF;
    border-radius: 12px;
    margin: 12px 0;

    .inner {
        margin: 24px 0;
        width: calc(100% - 48px);

        @media (max-width: 950px) {
            flex-direction: column;
        }
    }
    
    .right {
        width: 84px;
        
        @media (max-width: 950px) {
            margin-top: 6px;
        }
    }

    .ava {
        margin-right: 16px;
    }

    .btn-icon {
        padding: 8px;
        border-radius: 6px;

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

    .detail {
        margin-top: 0;
        padding-top: 24px;
    }

    .bottom {
        width: 45%;
    }

    table {
        td.data {
            word-break: break-all;
        }
    }
`

export default CardManageUser