import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'

import { useAuth } from '@core/contexts/AuthContext'
import NoPesertaPopUp from '@components/molecular/PopUps/NoPesertaPopUp'
import { useLayout } from '@core/contexts/LayoutContext'

const TryOut = () => {
    const [openPopUp, setOpenPopUp] = useState(false)
    const { userData } = useAuth()
    const { setDimm } = useLayout()

    const showPopUp = {
        open: () => {
            setOpenPopUp(true)
        },
        close: () => {
            setDimm(false)
            setOpenPopUp(false)
        }
    }

    useEffect(() => {
        console.log(userData)
    }, [userData])

    return (
        <div css={style.main} className="full-w">
            <div css={style.noPeserta} className="full-w">
                <p className="label">NO PESERTA</p>
                <div className="box full-w flex-cc">
                    {!userData.noPeserta ?(
                        <p>{userData.noPeserta}</p>
                    ):(
                        <div className="instruction flex-cc">
                            <p>Masukan no pesertamu</p>
                            <button className="bordered" onClick={showPopUp.open}>di sini</button>
                        </div>
                    )}
                    {openPopUp && <NoPesertaPopUp handleClose={showPopUp.close} />}
                </div>
            </div>

            <div css={style.illus} className="flex-cc mx-auto">
                <img src="/img/illus/dash-tryout.svg" alt=""/>
                <p>Informasi mengenai try out yang kamu ikuti ada disini</p>
            </div>

            <div css={style.access} className="full-w">
                <p className="label">AKSES TRYOUT</p>
                <div className="full-w flex-cc">
                    {userData.examsAccess.map((exam, i) => (
                        <p key={i}>{exam}</p>
                    ))}
                </div>
            </div>

        </div>
    )
}

const style = {
    main: css`
        padding: 12px 0;

        @media (max-width: 600px) {
            padding: 0;
        }
        
        @media (max-width: 780px) {
            width: 90%;
        }

        p.label {
            font-family: Poppins;
            font-weight: 700;
            font-size: 18px;
            color: #0005;
            
            margin-bottom: 4px;

            @media (max-width: 600px) {
                font-size: 16px;
            }
        }
    `,

    access: css`

    `,

    illus: css`
        width: 90%;
        margin-bottom: 32px;
        
        img {
            margin-right: 24px;
        }
        
        p {
            font-family: Poppins;
            font-weight: 800;
            font-size: 20px;
            color: #75AA87;
        }
        
        @media (max-width: 500px) {
            padding: 0;
            
            img {
                width: 88px;
            }
            
            p {
                line-height: 20px;
                font-size: 16px;
            }
        }
    `,

    noPeserta: css`
        margin-bottom: 32px;

        p.label {
            font-family: Poppins;
            font-weight: 700;
            font-size: 18px;
            color: #0005;
            
            margin-bottom: 4px;

            @media (max-width: 600px) {
                font-size: 16px;
            }
        }

        .box {
            border: 1px solid #0005;
            padding: 24px 0;
            border-radius: 8px;
            
            p {
                font-family: Poppins;
                font-weight: 600;
                font-size: 28px;
                text-align: center;
                letter-spacing: 0.01em;
                
                color: #0F1A12;
            }

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
    `,    
}
export default TryOut