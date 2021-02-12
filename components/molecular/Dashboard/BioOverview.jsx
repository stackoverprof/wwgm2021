import React from 'react'
import { css } from '@emotion/react'

import { BiIdCard, BiUserPin, BiPhone, BiBuildings } from 'react-icons/bi'
import { GiRank1, GiRank2 } from 'react-icons/gi'
import { useAuth } from '@core/contexts/AuthContext'

const BioOverview = ({openEdit}) => {
    const { userData } = useAuth()

    const placehold = (text) => {
        if (!text) return <span className="placehold">Data belum diisi. <span onClick={openEdit}>Lengkapi data</span></span>
        else return text
    }

    return (
        <div css={style.main} className="contain-size-s full-w">
            <div css={style.item}>
                <p className="label">NAMA LENGKAP</p>
                <div className="flex-sc">
                    <BiIdCard />
                    <p className="data flex-sc">{placehold(userData.fullName)}</p>
                </div>
            </div>
            <div css={style.item}>
                <p className="label">DISPLAY NAME</p>
                <div className="flex-sc">
                    <BiUserPin />
                    <p className="data flex-sc">{placehold(userData.displayName)}</p>
                </div>
            </div>
            <div css={style.item}>
                <p className="label">KONTAK</p>
                <div className="flex-sc">
                    <BiPhone />
                    <p className="data flex-sc">{placehold(userData.contact)}</p>
                </div>
            </div>
            <div css={style.item}>
                <p className="label">PROVINSI</p>
                <div className="flex-sc">
                    <GiRank2 />
                    <p className="data flex-sc">{placehold(userData.province)}</p>
                </div>
            </div>
            <div css={style.item}>
                <p className="label">KOTA</p>
                <div className="flex-sc">
                    <GiRank1 />
                    <p className="data flex-sc">{placehold(userData.city)}</p>
                </div>
            </div>
            <div css={style.item}>
                <p className="label">SEKOLAH</p>
                <div className="flex-sc">
                    <BiBuildings />
                    <p className="data flex-sc">{placehold(userData.school)}</p>
                </div>
            </div>
        </div>
    )
}

const style = {
    main: css`
        padding: 20px 0;
    `,
    item: css`
        margin: 24px 0;

        p.label {
            font-family: Poppins;
            font-weight: 700;
            font-size: 18px;
            color: #0005;
            
            margin-bottom: 4px;
        }
        
        svg {
            font-size: 22px;
            color: #0005;
            margin-right: 12px;
        }

        p.data {
            font-family: Poppins;
            font-weight: 700;
            font-size: 24px;
            color: #1A2C1E;
        }

        .placehold {
            font-size: 16px;
            color: #0006;
            font-weight: 400;

            span {
                cursor: pointer;
            }

            &:hover span {
                color: var(--army);
                text-decoration: underline;
            }
        }
    `
}

export default BioOverview