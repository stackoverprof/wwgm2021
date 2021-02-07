import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
// import Link from 'next/link'
// import to from '@core/routepath'
import { useRouter } from 'next/router'
import { useLayout } from '@core/contexts/LayoutContext'

import MainLayout from '@components/layouts/MainLayout'
import Advantages from '@components/atomic/Advantages'
import CardDisplay from '@components/atomic/CardDisplay'
import LoginPopUp from '@components/molecular/LoginPopUp'
    
const Home = () => {
    const [openLoginPop, setOpenLoginPop] = useState(false)
    const { query : { action }} = useRouter()
    const { setDimm } = useLayout()

    const showLogin = (show) => {
        if (show && !openLoginPop) {
            setOpenLoginPop(true)
        }
        else if (!show) {
            setOpenLoginPop(false)
            setDimm(false)
        }
    }   

    useEffect(() => {
        console.log(action)
    }, [])

    return (
        <MainLayout style={style.page} className="flex-sc col" noClearance>
            
            <section css={style.hero}>
                <div className="background">
                    <div className="contain-size-s flex-cc col">
                        <img src="/img/logo-wwgm-full.webp" alt="logo wwgm 2021" className="hero-img"/>
                        <button onClick={() => showLogin(true)} className="hero-button bordered-bold orange">Daftar Sekarang!</button>
                        {openLoginPop && <LoginPopUp handleClose={() => showLogin(false)}/>}
                    </div>
                </div>
            </section>

            <section css={style.displayer}>
                <div className="contain-size-l flex-bs">
                    <div className="left flex-cs col">
                        <h1>TRY OUT NASIONAL UTBK 2021</h1>
                        <hr/>
                        <Advantages />
                    </div>
                    <div className="right flex-bc">
                        <CardDisplay examId={'SAINTEK-a10bd8a1-0c56-4a7f-a76e-3c1c4d65995d'} />
                        <CardDisplay examId={'SAINTEK-a10bd8a1-0c56-4a7f-a76e-3c1c4d65995d'} />
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
        
        > div{
            @media (max-width: 1000px) {
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }
        }

        .left {
            padding: 14px 20px 0 20px;

            @media (max-width: 1000px) {
                justify-content: center;
                align-items: center;
            }
        }
        
        .right {
            
            @media (max-width: 1000px) {
                flex-direction: column;
                justify-content: center;
            }
        }

        h1{
            max-width: 360px;
            font-family: Poppins;
            font-weight: 800;
            font-size: 34px;
            color: var(--army);
            margin-bottom: 24px;
            
            @media (max-width: 1000px) {
                text-align: center;
            }

            @media (max-width: 500px) {
                max-width: 320px;
                font-size: 28px;
            }
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

        .hero-img{
            height: 210px;
            margin-bottom: 24px;
            object-fit: contain;
        }

        .hero-button{
            position: relative;

            @media (max-width: 720px){
                top: -20px;
                font-size: 16px;
            }
        }
    `
}

    
export default Home