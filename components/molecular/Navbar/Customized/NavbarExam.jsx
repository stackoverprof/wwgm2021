import React from 'react'
import { css } from '@emotion/react'
import Countdown from 'react-countdown'

const Navbar = ({countdown, onTimeUp}) => {
    
    return (
        <nav css={style} className="flex-cc">
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

const renderer = ({ hours, minutes, seconds, completed}) => {
    if (completed) {
      return <div className="bordered">Time is up!</div>
    } else {
      return (
        <div css={style.timer} className="flex-cc">
            <p>
                
            </p>
        </div>
      )
    }
}

// { hours ? <span className="timer">{('0' + hours).slice(-2)}</span> : '' } 
// {hours ? ':' : ''} <span  className="timer">{('0' + minutes).slice(-2)}</span>
// : <span className="timer">{('0' + seconds).slice(-2)}</span>

const style = () => css` 
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
    }
`

export default Navbar