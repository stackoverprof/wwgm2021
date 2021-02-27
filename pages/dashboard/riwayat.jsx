import React from 'react'
import { css } from '@emotion/react'

import UserOnlyRoute from '@core/routeblocks/UserOnlyRoute'
import { useAuth } from '@core/contexts/AuthContext'
import { to } from '@core/routepath'
import MainLayout from '@components/layouts/MainLayout'
import CardRiwayat from '@components/atomic/CardRiwayat'

const Hasil = () => {
    const { userData, authState } = useAuth()

    return (
        <UserOnlyRoute redirect={to.home}>
            { authState === 'user' && (    
                <MainLayout css={style.page} title="Dashboard" className="flex-sc col">
                    
                    <section css={style.list}>
                        <div className="inner contain-size-sm flex-cc col">
                            <p className="label">RIWAYAT TRYOUT</p>
                            <div className="full-w flex-cc col">
                                {(!userData.approved || userData.examsHistory.length === 0) && 
                                    <div className="information-access full-w flex-cc col">
                                        <p>Akses TryOut akan muncul setelah Anda di-approve oleh panitia</p>
                                        {userData.approved && <p>Hubungi <Link href={to._404}>panitia</Link> bila terdapat kesalahan</p>}
                                    </div>
                                }
                                {userData.approved && userData.examsHistory?.map((exam, i) => (
                                    <CardRiwayat examId={exam} key={i} />
                                ))}
                            </div>
                        </div>
                    </section>

                </MainLayout>
            )}
        </UserOnlyRoute>
    )
}

const style = {
    page: css`
        padding-top: 54px;
    `,

    list: css`
        

        p.label {
            font-family: Poppins;
            font-weight: 600;
            font-size: 26px;
            color: var(--army);
            
            margin-bottom: 4px;

            @media (max-width: 600px) {
                font-size: 16px;
            }
        }
    `

}

export default Hasil