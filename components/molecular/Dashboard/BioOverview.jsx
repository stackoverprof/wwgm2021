import React from 'react'
import { css } from '@emotion/react'
import { BiIdCard, BiUserPin, BiPhone, BiBuildings } from 'react-icons/bi'
import { GiRank1, GiRank2 } from 'react-icons/gi'
import { FiEdit3 } from 'react-icons/fi'

import { useAuth } from '@core/contexts/AuthContext'

const BioOverview = ({openEdit, setActiveTab}) => {
    const { userData, dataCompleted } = useAuth()

    const placehold = (text) => {
        if (!text) return <span className="placehold">Data belum diisi. <span onClick={openEdit}>Lengkapi data</span></span>
        else return text
    }

    return (
        <div css={style.main} className="full-w">
            <div css={style.illus} className="flex-cc">
                <div className="inner flex-cc">
                    {!dataCompleted ?
                        <p>Sebelum mengerjakan try out pastikan seluruh datamu telah dilengkapi</p>
                    : !userData.noPeserta ?
                        <p>Yeay! data sudah lengkap. Sekarang input nomor pesertamu <span onClick={() => setActiveTab('Try Out')}>di sini</span></p>
                    : !userData.approved ?
                        <p>Yeay! data sudah lengkap. Tunggu approval untuk mengikuti tryout. Semangat!</p>
                    :
                        <p>Yeay! data sudah lengkap. Bersiaplah untuk mengikuti tryout. Semangat!</p>
                    }
                    <img src="/img/illus/checkerboard.svg" alt=""/>
                </div>
            </div>
            <div css={style.item}>
                <p className="label">NAMA LENGKAP</p>
                <div className="flex-ss">
                    <div className="icon flex-cc">
                        <BiIdCard />
                    </div>
                    <p className="data flex-sc">{placehold(userData.fullName)}</p>
                </div>
            </div>
            <div css={style.item}>
                <p className="label">DISPLAY NAME</p>
                <div className="flex-ss">
                    <div className="icon flex-cc">
                        <BiUserPin />
                    </div>
                    <p className="data flex-sc">{placehold(userData.displayName)}</p>
                </div>
            </div>
            <div css={style.item}>
                <p className="label">KONTAK</p>
                <div className="flex-ss">
                    <div className="icon flex-cc">
                        <BiPhone />
                    </div>
                    <p className="data flex-sc">{placehold(userData.contact)}</p>
                </div>
            </div>
            <div css={style.item}>
                <p className="label">PROVINSI</p>
                <div className="flex-ss">
                    <div className="icon flex-cc">
                        <GiRank2 />
                    </div>
                    <p className="data flex-sc">{placehold(userData.province)}</p>
                </div>
            </div>
            <div css={style.item}>
                <p className="label">KOTA</p>
                <div className="flex-ss">
                    <div className="icon flex-cc">
                        <GiRank1 />
                    </div>
                    <p className="data flex-sc">{placehold(userData.city)}</p>
                </div>
            </div>
            <div css={style.item}>
                <p className="label">SEKOLAH</p>
                <div className="flex-ss">
                    <div className="icon flex-cc">
                        <BiBuildings />
                    </div>
                    <p className="data flex-sc">{placehold(userData.school)}</p>
                </div>
            </div>
            <button onClick={openEdit} className="edit mx-auto bordered"><FiEdit3 />{dataCompleted ? 'Ubah' : 'Lengkapi'} Biodata</button>
        </div>
    )
}

const style = {
    main: css`
        padding: 12px 0;
        
        @media (max-width: 780px) {
                width: 90%;
        }

        @media (max-width: 600px) {
            padding: 0;
        }

        button.edit {
            margin-top: 48px;
            border-color: #0005;
            color: #0007;
            font-size: 18px;
            
            svg {
                margin-right: 12px;
            }
            
            &:hover {    
                box-shadow: inset 0 0 0 1px #0005;
                background: #00000008;
            }

            &.cancel {
                border-color: #c72121;
                color: #c72121;

                &:hover {
                    background: #c721210c;
                    box-shadow: inset 0 0 0 1px #c72121;
                }
            }
        }
    `,
    item: css`
        margin: 24px 0;
        
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
        .icon{
            min-height: 35px;
            
            @media (max-width: 600px) {
                min-height: 27px;
            }
            svg {
                font-size: 22px;
                color: #0005;
                margin-right: 12px;
            }
        }

        p.data {
            font-family: Poppins;
            font-weight: 700;
            font-size: 24px;
            color: #1A2C1E;

            @media (max-width: 600px) {
                font-size: 18px;
            }
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
    `,

    illus: css`
        border: 1px solid #0005;
        border-radius: 12px;
        margin-bottom: 32px;

        .inner {
            margin: 32px;
        }
        
        img {
            width: 90px;
            height: 90px;
        }
        
        p {
            font-family: Poppins;
            font-weight: 700;
            font-size: 20px;
            color: #75AA87;
            margin-right: 24px;

            span {
                text-decoration: underline;
                cursor: pointer;
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
    `
}

export default BioOverview