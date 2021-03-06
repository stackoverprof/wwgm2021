import React from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'

import { useAuth } from '@core/contexts/AuthContext'
import { to, out } from '@core/routepath'
import CardNoPeserta from '@components/atomic/CardNoPeserta'
import CardDisplayWide2 from '@components/atomic/CardDisplayWide2'

const TryOut = () => {
    const { userData } = useAuth()

    const message = () => {
        // if (!userData.noPeserta) return 'Input dahulu nomor pesertamu dan tunggu approval dari panitia'
        // else if (!userData.approved) return 'Status akunmu menunggu approval dari panitia'
        // else if (userData.examsAccess?.length === 0) return <>Kamu sudah di approve, hubungi <a href={out.waTech} target="_blank" rel="noopener noreferrer">panitia</a> untuk meminta akses ke tryoutmu</>
        // else if (userData.examsHistory?.length === userData.examsAccess?.length) return <>Lihat hasil TryOutmu disini<Link href={to.history}><button>Riwayat</button></Link></>
        // else return 'Informasi mengenai try out yang kamu ikuti ada di bawah sini'
        return <>Lihat hasil TryOutmu disini<Link href={to.history}><button>Riwayat</button></Link></>
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

            <div css={style.illus} className="flex-cc mx-auto">
                <p>Yeay hasil IRT sudah tersedia <a href="https://drive.google.com/file/d/1irJSPy4_M-QH6lpnKm0A9vh70v40c1hd/view?usp=sharing" className="btn no-u" target="_blank" rel="noopener noreferrer" download>Download</a></p>
            </div>
            
            <div css={style.access} className="full-w">
                <p className="label">AKSES TRYOUT</p>
                <div className="full-w flex-cc col">
                    {(!userData.approved || userData.examsAccess.length === 0) && 
                        <div className="information-access full-w flex-cc col">
                            <p>Akses TryOut akan muncul setelah Anda di-approve oleh panitia</p>
                            {userData.approved && <p>Hubungi <a href={out.waTech} target="_blank" rel="noopener noreferrer">panitia</a> bila terdapat kesalahan</p>}
                        </div>
                    }
                    {userData.approved && userData.examsAccess?.map((exam, i) => (
                        <CardDisplayWide2 examId={exam} key={i} />
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
            padding: 24px 12px;
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

            button {
                margin-top: 12px;
            }

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

    `
}

export default TryOut