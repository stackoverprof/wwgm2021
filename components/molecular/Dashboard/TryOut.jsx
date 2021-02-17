import React from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'

import { useAuth } from '@core/contexts/AuthContext'
import to from '@core/routepath'
import CardNoPeserta from '@components/atomic/CardNoPeserta'
import CardDisplayWide from '@components/atomic/CardDisplayWide'

const TryOut = () => {
    const { userData } = useAuth()

    const message = () => {
        if (!userData.noPeserta) return 'Input dahulu nomor pesertamu dan tunggu approval dari panitia'
        else if (!userData.approved) return 'Status akunmu menunggu approval dari panitia'
        else if (userData.examsAccess?.length === 0) return <>Kamu sudah di approve, hubungi <Link href={to.contact}>panitia</Link> untuk meminta akses ke tryoutmu</>
        else return 'Informasi mengenai try out yang kamu ikuti ada di bawah sini'
    }

    return (
        <div css={style.main} className="full-w">
            <div css={style.noPeserta} className="full-w">
                <p className="label">NO PESERTA</p>
                <CardNoPeserta />
            </div>

            <div css={style.illus} className="flex-cc mx-auto">
                <p>{message()}</p>
                <img src="/img/illus/dash-tryout.svg" alt=""/>
            </div>

            <div css={style.access} className="full-w">
                <p className="label">AKSES TRYOUT</p>
                <div className="full-w flex-cc">
                    {(!userData.approved || userData.examsAccess.length === 0) && 
                        <div className="information-access full-w flex-cc col">
                            <p>Akses TryOut akan muncul setelah Anda di-approve oleh panitia</p>
                            <p>Hubungi <Link href={to.contact}>panitia</Link> bila terdapat kesalahan</p>
                        </div>
                    }
                    {userData.approved && userData.examsAccess?.map((exam, i) => (
                        <CardDisplayWide examId={exam} key={i} />
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
        .information-access {
            padding: 24px 0;
            border: 1px solid #0005;
            border-radius: 8px;

            p {
                font-family: Poppins;
                font-size: 14px;
                color: #0007;
                text-align: center;

                a {
                    color: var(--army);

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    `,

    illus: css`
        width: 90%;
        margin-bottom: 32px;
        
        p {
            margin-right: 24px;
            font-family: Poppins;
            font-weight: 700;
            font-size: 20px;
            color: #75AA87;

            a {
                text-decoration: underline;
            }
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