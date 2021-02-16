import React, { useState } from 'react'
import { css } from '@emotion/react'
import { RiErrorWarningFill } from 'react-icons/ri'
import { MdVerifiedUser } from 'react-icons/md'

import { useLayout } from '@core/contexts/LayoutContext'
import { useAuth } from '@core/contexts/AuthContext'
import NoPesertaPopUp from '@components/molecular/PopUps/NoPesertaPopUp'

const CardNoPeserta = () => {
    const [openPopUp, setOpenPopUp] = useState(false)
    const { setDimm } = useLayout()
    const { userData } = useAuth()
    
    const showPopUp = {
        open: () => {
            setOpenPopUp(true)
        },
        close: () => {
            setDimm(false)
            setOpenPopUp(false)
        }
    }

    return (
        <div css={style} className="full-w flex-cc">
            {userData.noPeserta ? (
                <>
                    <p className="no-peserta">{userData.noPeserta}</p>
                    
                    <div className="status flex-sc">
                        {userData.approved ? 
                            <MdVerifiedUser color="#37a558" className="icon"/> 
                        : 
                            <RiErrorWarningFill color="#fa903a" className="icon"/>}
                        <p className={`badge ${userData.approved ? 'green' : ''}`}>
                            STATUS : {userData.approved ? 'APPROVED' : 'MENUNGGU APPROVAL'}
                        </p>
                    </div>
                    {!userData.approved && <button className="edit no-btn" onClick={showPopUp.open}>EDIT</button>}
                </>
            ):(
                <div className="instruction flex-cc">
                    <p>Masukan no pesertamu</p>
                    <button className="bordered" onClick={showPopUp.open}>di sini</button>
                </div>
            )}
            {openPopUp && <NoPesertaPopUp handleClose={showPopUp.close} />}
        </div>
    )
}

const style = css`
    position: relative;
    border: 1px solid #0005;
    padding: 40px 0;
    border-radius: 8px;
    
    button.edit {
        position: absolute;
        top: 8px;
        right: 8px;
        font-size: 12px !important;

        padding: 2px 4px;
        border-radius: 4px;
        
        color: #0005;

        &:hover {
            background: #0001;
        }
    }
        
    .status {
        position: absolute;
        top: 6px;
        left: 8px;
        font-size: 18px;

        &:hover {
            p.badge {
                width: 100%;
                padding: 2px 6px;
                opacity: 1;
            }
        }
    }
    
    .icon {
        min-width: 18px;
    }
    
    p.badge {
        width: 0;
        opacity: 0;
        font-family: Poppins;
        font-weight: 600;
        font-size: 12px;
        margin-left: 4px;
        padding: 2px 0;
        border-radius: 4px;
        transition: 0.5s;
        white-space: nowrap;
        overflow: hidden;
        
        color: #fa903a;
        background: #fa903a55;
        
        &.green {
            color: #37a558;
            background: #37a55855;
        }
    }
    
    p.no-peserta {
        font-family: Poppins;
        font-weight: 600;
        font-size: 28px;
        text-align: center;
        letter-spacing: 0.01em;
        margin-top: 4px;
        
        color: #0F1A12;
    }

    
    
    .instruction {
        @media (max-width: 480px) {
            flex-direction: column;
        }
        
        p {
            font-family: Poppins;
            font-size: 18px;
            color: #0006;
            margin-right: 12px;

            @media (max-width: 480px) {
                margin-right: 0;
                margin-bottom: 12px;
            }
        }

        button {
            font-size: 18px;
        }
    }
`

export default CardNoPeserta