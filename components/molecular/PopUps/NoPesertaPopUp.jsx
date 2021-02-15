import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { RiArrowDropDownLine } from 'react-icons/ri'
import OutsideClickHandler from 'react-outside-click-handler'

import { useLayout } from '@core/contexts/LayoutContext'

const NoPesertaPopUp = ({handleClose}) => {
    const [inputData, setInputData] = useState({
        year0: 2,
        year1: 1,
        classification: '',
        number: ''
    })

    const { setDimm } = useLayout()

    const mutateInputData = (e) => {
        setInputData((prevState) => ({
           ...prevState,
           [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        setDimm(true)
        return () => {
            setDimm(false)
        }
    }, [])

    useEffect(() => {
        console.log(inputData)
    }, [inputData]) 

    return (
        <div css={style} className="fixed fullscreen flex-cs">
            <OutsideClickHandler onOutsideClick={handleClose} display="flex">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -10}} 
                    animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, delay: 0.1}}} 
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 }}} 
                    className="pop-up contain-size-s flex-ec col"
                >
                    <form className="flex-cc">
                        <div className="input-group flex-cc">
                            <input value={inputData.year0} className="square" type="text" disabled/>
                            <input value={inputData.year1} className="square" type="text" disabled/>
                        </div>
                        <hr/>
                        <div className="input-group flex-cc select-container">
                            <select 
                                value={inputData.classification} 
                                onChange={mutateInputData} 
                                name="classification" 
                                id="classification" 
                                className="no-arrow" 
                                required
                            >
                                <option disabled value="">-</option>
                                <option value="ST">ST</option>
                                <option value="CH">CH</option>
                                <option value="CP">CP</option>
                            </select>
                            <div className="icon-drop flex-cc">
                                <RiArrowDropDownLine />
                            </div>
                        </div>
                        <hr/>
                        <div className="input-group flex-cc">
                            <input 
                                value={inputData.number} 
                                onChange={mutateInputData} 
                                name="number" 
                                className="longer" 
                                type="text" 
                                required
                            />
                        </div>
                    </form>
                </motion.div>
            </OutsideClickHandler>
        </div>    
    )
}

const style = css`
    padding-top: 100px;
    z-index: 99;
    pointer-events: none;
    
    > div {
        pointer-events: all;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    form {

        input, select {
            padding: 0;
            height: 54px;
            margin: 0 4px;
            font-family: Poppins;
            font-size: 24px;
            font-weight: 800;
            color: #1A2C1E;
            text-align: center;
        }

        hr {
            border: none;
            height: 4px;
            width: 8px;
            background: var(--army);
        }

        select {
            font-weight: 700;
            width: 60px;
            padding: 0 12px;
            border-radius: 6px;
            margin: 0;
        }

        .select-container {
            position: relative;
            margin: 0 4px;
        }
        
        .icon-drop {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: 32px;
            pointer-events: none;
            font-size: 24px;
        }
        
        .square {
            width: 42px;
        }
        
        .longer {
            width: 100px;
            letter-spacing: 4px;         
        }
    }

    .pop-up{
        background: #fff;
        padding: 24px;
        border-radius: 8px;

        img{
            height: 200px;
            margin-bottom: 24px;
        }
    }
`

export default NoPesertaPopUp