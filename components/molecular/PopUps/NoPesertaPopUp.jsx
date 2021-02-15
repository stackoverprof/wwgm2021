import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { RiArrowDropDownLine } from 'react-icons/ri'
import OutsideClickHandler from 'react-outside-click-handler'

import { useLayout } from '@core/contexts/LayoutContext'
import { useAuth } from '@core/contexts/AuthContext'
import { validateFormatNoPeserta, validateNumber } from '@core/utils/validator'

const NoPesertaPopUp = ({handleClose}) => {
    const [inputData, setInputData] = useState({
        year0: '2',
        year1: '1',
        classification: '',
        number: ''
    })

    const { user, userData, refreshUserData } = useAuth()
    const { setGlobalAlert, setDimm } = useLayout()

    const mutateInputData = (e) => {
        if (e.target.name === 'number' && !validateNumber(e.target.value, 0, 4)) return

        setInputData((prevState) => ({
           ...prevState,
           [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setGlobalAlert('')
        
        const { year0, year1, classification, number } = inputData
        const issuedNoPeserta = `${year0+year1}-${classification}-${number}`
        
        
        if (!validateFormatNoPeserta(issuedNoPeserta)) {
            setGlobalAlert({error: true, body: 'Format salah (4 digit), cek kembali nomor Anda'})
            return
        }
        console.log('format aman')

        axios.post('/api/user/user-data/edit-no-peserta', {
            authToken: await user.getIdToken(),
            issuedNoPeserta: issuedNoPeserta
        })
        .then(async res => {
            await refreshUserData()
            setGlobalAlert({error: false, body: res.data.message})
            handleClose()
        })
        .catch(err => setGlobalAlert({error: true, body: err.response.data.message}))

    }

    useEffect(() => {
        setDimm(true)
        return () => {
            setDimm(false)
        }
    }, [])

    useEffect(() => {
        const splits = userData.noPeserta.split('-')

        setInputData({
            year0: splits[0].charAt(0),
            year1: splits[0].charAt(1),
            classification: splits[1],
            number: splits[2]
        })
    }, [userData])

    return (
        <div css={style} className="fixed fullscreen flex-cs">
            <OutsideClickHandler onOutsideClick={handleClose} display="flex">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -10}} 
                    animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, delay: 0.1}}} 
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 }}} 
                    className="pop-up flex-ec col"
                >
                    <form onSubmit={handleSubmit} className="flex-cc col">
                        <div className="input-area flex-cc">
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
                                    <option value="SH">SH</option>
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
                        </div>
                        <button type="submit">Submit</button>
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

            @media (max-width: 440px) {
                height: 40px;
                font-size: 20px;
            }
        }

        .input-area {
            margin-bottom: 16px;
        }

        hr {
            border: none;
            height: 4px;
            width: 8px;
            background: var(--army);
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

        select {
            font-weight: 700;
            width: 60px;
            padding: 0 12px;
            border-radius: 6px;
            margin: 0;

            @media (max-width: 440px) {
                width: 50px;
                padding: 0 6px;
            }
        }
        
        .square {
            width: 42px;

            @media (max-width: 440px) {
                width: 32px;
            }
        }
        
        .longer {
            width: 100px;
            letter-spacing: 4px;         

            @media (max-width: 440px) {
                width: 90px;
            }
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