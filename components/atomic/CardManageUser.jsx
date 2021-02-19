import React from 'react'
import { css } from '@emotion/react'
import axios from 'axios'

import { MdVerifiedUser } from 'react-icons/md'
import { useLayout } from '@core/contexts/LayoutContext'
import { useAuth } from '@core/contexts/AuthContext'

const CardManageUser = ({item}) => {
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
        <div css={style} className="full-w flex-cc">
            <div className="inner full flex-bc">
                <div className="left">
                    <p className="name">{item.fullName}</p>
                    <p className="email">{item.email}</p>
                </div>
                <div className="middle">
                    <p className="no-peserta">{item.noPeserta ? item.noPeserta : '—'}</p>
                </div>
                <div className="right flex-cc">
                    <button onClick={() => handleApproval(item, !item.approved)} className={`approval btn-icon ${item.approved ? 'green' : 'gray'}`}>
                        <MdVerifiedUser className="icon"/> 
                    </button>
                    <button className="edit-nopes btn-icon">
                        
                    </button>
                    <button className="access-exams btn-icon">
                        
                    </button>
                </div>
            </div>
        </div>
    )
}

const style = css`
    background: #FFFFFF;
    box-shadow: 0px 15px 24px -18px rgba(0, 0, 0, 0.25), inset 0 0 0 1px #AFAFAF;
    border-radius: 12px;
    margin: 12px 0;

    .inner {
        margin: 24px;
    }

    .btn-icon {
        padding: 8px;
        border-radius: 6px;

        .icon {
            margin: 0;
        }

        &.orange {
            background: #fa903a;

            &:hover{
                box-shadow: 0 8px 12px -8px #000a, 0 0 0 2px white, 0 0 0 2.8px #fa903a;
            }
        }
        
        &.red {
            background: #da4342;

            &:hover{
                box-shadow: 0 8px 12px -8px #000a, 0 0 0 2px white, 0 0 0 2.8px #da4342;
            }
        }

        &.gray {
            background: #0005;

            &:hover{
                box-shadow: 0 8px 12px -8px #000a, 0 0 0 2px white, 0 0 0 2.8px #0005;
            }
        }

        &.green {
            background: #37a558;

            &:hover{
                box-shadow: 0 8px 12px -8px #000a, 0 0 0 2px white, 0 0 0 2.8px #37a558;
            }
        }

    }

    .left {
        width: 300px;

        p {
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