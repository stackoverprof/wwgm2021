import React from 'react'
import { css } from '@emotion/react'
import GoogleAuth from '@components/atomic/GoogleAuth'

const LoginPopUp = () => {

    return (
        <div css={style} className="fixed fullscreen flex-cs">
            <div className="pop-up contain-size-l flex-bc">
                <div className="partition flex-cc">
                    <img src="/img/illus/login.svg" alt=""/>
                </div>
                <div className="partition flex-cs col">
                    <p className="instruction">Hai, mohon gunakan email yang sama dengan yang digunakan saat mengisi gform</p>
                    <div className="flex-cc">
                        <GoogleAuth />
                        <button className="btn bordered tutup">Tutup</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const style = css`
    background:  #000c;
    padding-top: 100px;
    
    .pop-up{
        background: #fff;
        height: 456px;
        border-radius: 12px;
    }

    .partition{
        width: 50%;
        height: 100%;
    }

    button.tutup{
        padding: 12px 16px;
    }

    p.instruction{
        max-width: 440px;
        font-family: Poppins;
        font-style: normal;
        font-weight: 800;
        font-size: 34px;
        line-height: 51px;
        padding-bottom: 32px;
    }
`

export default LoginPopUp