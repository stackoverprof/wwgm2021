import React, { useEffect } from 'react'
import { css } from '@emotion/react'
// import Link from 'next/link'
// import to from '@core/routepath'
import { useRouter } from 'next/router'

import MainLayout from '@components/layouts/MainLayout'
import Advantages from '@components/atomic/Advantages'
import CardDisplay from '@components/atomic/CardDisplay'
    
const Home = () => {
    const { query : { action }} = useRouter()

    useEffect(() => {
        console.log(action)
    }, [])

    return (
        <MainLayout style={style.page} className="flex-sc col" directLogin={action === 'login'} noClearance>
            
            <section css={style.hero}>
                <div className="background">
                    <div className="contain-size-s flex-cc col">
                        <img src="/img/logo-wwgm-full.webp" alt="logo wwgm 2021"/>
                        <button className="bordered-bold orange">Daftar Sekarang!</button>
                    </div>
                </div>
            </section>

            <section css={style.displayer}>
                <div className="contain-size-l flex-bs">
                    <div className="left">
                        <h1>TRY OUT NASIONAL UTBK 2021</h1>
                        <hr/>
                        <Advantages />
                    </div>
                    <div className="right flex-bc">
                        <CardDisplay />
                        <CardDisplay />
                    </div>
                </div>
            </section>

        </MainLayout>
    )
}

const style = {
    page: css`
        section{
            width: 100%;
        }
    `,

    displayer: css`
        padding: 48px 0;

        .left{
            padding-top: 14px;
        }
        .right{
        }

        h1{
            width: 360px;
            font-family: Poppins;
            font-weight: 800;
            font-size: 34px;
            color: #0B4D29;
            margin-bottom: 24px;
        }

        hr{
            width: 300px;
            border: 1px solid #0003;
        }
    `,

    hero: css`
        .background{
            width: 100%;
            height: 100%;
            padding: 76px 0 42px 0;
            background: url('/img/home/hero-left.webp'), url('/img/home/hero-right.webp'), #0F1A12;
            background-position: left, right, center;
            background-size: contain;
            background-repeat: no-repeat;
            
            @media (max-width: 1060px){
                background-size: cover;
            }
            @media (max-width: 720px){
                background-position: center;
            }
        }

        img{
            height: 210px;
            margin-bottom: 24px;
            object-fit: contain;
        }

        button{
            position: relative;

            @media (max-width: 720px){
                top: -20px;
                font-size: 16px;
            }
        }
    `
}

    
export default Home