import React from 'react'
import { css } from '@emotion/react'

import { useAuth } from '@core/contexts/AuthContext'
import CardNoPeserta from '@components/atomic/CardNoPeserta'

const TryOut = () => {
    const { userData } = useAuth()

    return (
        <div css={style.main} className="full-w">
            <div css={style.noPeserta} className="full-w">
                <p className="label">NO PESERTA</p>
                <CardNoPeserta />
            </div>

            <div css={style.illus} className="flex-cc mx-auto">
                <img src="/img/illus/dash-tryout.svg" alt=""/>
                <p>Informasi mengenai try out yang kamu ikuti ada disini</p>
            </div>

            <div css={style.access} className="full-w">
                <p className="label">AKSES TRYOUT</p>
                <div className="full-w flex-cc">
                    {userData.examsAccess?.map((exam, i) => (
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

    `,    
}
export default TryOut