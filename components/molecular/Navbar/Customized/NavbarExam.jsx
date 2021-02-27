import React from 'react'
import { css } from '@emotion/react'
import Countdown from 'react-countdown'

const Navbar = ({countdown, onTimeUp}) => {
    
    return (
        <nav css={style.main} className="flex-cc">
            <div className="contain-size-xl flex-bc inner">
                <div className="brand flex-cc">
                    <img src="/img/sgm-icon.png" className="no-pointer" alt=""/>
                    <p>WWGM 2021</p>
                </div>
                <Countdown date={countdown} renderer={renderer} onComplete={onTimeUp}/>
            </div> 
        </nav>
    )
}

const renderer = ({ minutes, seconds, completed}) => {
    if (completed) {
      return <div className="bordered">Time is up!</div>
    } else {
      return (
        <div css={style.timer} className="flex-cc">
            <div className="box flex-cc">
                <p>{('0' + minutes).slice(-2)}</p>
            </div>
            <div className="separator flex-ec col">
                <div></div>
                <div></div>
            </div>
            <div className="box flex-cc">
                <p>{('0' + seconds).slice(-2)}</p>
            </div>
        </div>
      )
    }
}

const style = {
    main: () => css` 
        //Nav tag core style is in globals.scss
        width: 100%;
        height: 64px;
        z-index: 100;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);

        .inner{
            height: 100%;
        }
        
        .brand{
            img {
                height: 45px;
                margin-right: 12px;
            }
            
            p {
                font-family: Poppins;
                font-weight: bold;
                font-size: 27px;
                text-align: center;
                
                padding-top: 2px;

                color: var(--army);
            }

            @media (max-width: 400px) {
                img {
                    height: 40px;
                }
                p {
                    font-size: 20px;
                }
            }
        }
    `,

    timer: css`
        
        .box{
            width: 46px;
            height: 46px;
            background: var(--army);
            border-radius: 8px;
            margin: 0 2px;

            p {
                font-family: Poppins;
                font-size: 20px;
                font-weight: 700;
                color: white;
            }
        }

        .separator {
            margin: 0 1px;
            div {
                margin: 3px 0;
                height: 8px;
                width: 3.5px;
                background: #0C3B2288;
            }
        }
    `
}

export default Navbar