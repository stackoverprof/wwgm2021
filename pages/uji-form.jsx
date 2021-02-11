import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import axios from 'axios'
import to from '@core/routepath'
import { useAuth } from '@core/contexts/AuthContext'
import UserOnlyRoute from '@core/routeblocks/UserOnlyRoute'
import { useLayout } from '@core/contexts/LayoutContext'

import { BiIdCard, BiUserPin, BiPhone, BiBuildings } from 'react-icons/bi'
import { GiRank1, GiRank2 } from 'react-icons/gi'
import MainLayout from '@components/layouts/MainLayout'
    
const Dashboard = () => {
    const [provinceList, setProvinceList] = useState([])
    const [cityList, setCityList] = useState([])
    const [selectedProvinceId, setSelectedProvinceId] = useState('')
    const [inputData, setInputData] = useState({
        fullname: '',
        displayname: '',
        contact: '',
        province: '',
        city: '',
        school: ''
    })
    
    const { user, userData } = useAuth()
    const { setGlobalAlert } = useLayout()

    const mutateInput = (e) => {
        setInputData((prevState) => ({
           ...prevState,
           [e.target.id]: e.target.value
        }))

        if (e.target.id === 'province') {
            handleProvinceChange(e.target.value)
        }
    }

    const handleProvinceChange = (name) => {
        if (name === '') return

        const provinceItem = provinceList.filter((item) => {
            return item.nama === name
        })[0]
        setSelectedProvinceId(provinceItem.id)
    }

    const fetchProvince = () => {
        return axios.get('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
        .then(res => setProvinceList(res.data.provinsi))
        .catch(err => setGlobalAlert({body: err.message, error: true}))
    }

    const fetchCity = async () => {
        await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${selectedProvinceId}`)
        .then(res => setCityList(res.data.kota_kabupaten))
        .catch(err => setGlobalAlert({body: err.message, error: true}))
    }
    
    
    useEffect(() => { fetchCity() }, [selectedProvinceId])

    useEffect(() => {
        const initialFetch = async () => {
            await fetchProvince().then(() => {
                if (Object.keys(userData).length !== 0) {
                    handleProvinceChange(userData.province)
                    setInputData({
                        fullname: userData.fullName,
                        displayname: userData.displayName,
                        contact: userData.contact,
                        province: userData.province,
                        city: userData.city,
                        school: userData.school
                    })
                }
            })
        }

        initialFetch()
    }, [userData])

    return (
        <UserOnlyRoute redirect={to.home}>
            {user && (
                <MainLayout css={style({inputData})} className="flex-sc col">
                    <div className="form-container contain-size-s">
                        <form>
                            <div className="form-item flex-cs col">
                                <label htmlFor="full-name">NAMA LENGKAP</label>
                                <div className="input-box flex-sc">
                                    <div className="icon flex-cc"><BiIdCard /></div>
                                    <input type="text" value={inputData.fullname} onChange={mutateInput} name="full-name" id="fullname" placeholder="Nama lengkap sesuai KTP"/>
                                </div>
                            </div>
                            <div className="form-item flex-cs col">
                                <label htmlFor="display-name">DISPLAY NAME</label>
                                <div className="input-box flex-sc">
                                    <div className="icon flex-cc"><BiUserPin /></div>
                                    <input type="text" value={inputData.displayname} onChange={mutateInput} name="display-name" id="displayname" placeholder="Nama panggilan"/>
                                </div>
                            </div>
                            <div className="form-item flex-cs col">
                                <label htmlFor="contact">KONTAK</label>
                                <div className="input-box flex-sc">
                                    <div className="icon flex-cc"><BiPhone /></div>
                                    <input type="text" value={inputData.contact} onChange={mutateInput} name="contact" id="contact" placeholder="Id Line / nomor WA yang aktif"/>
                                </div>
                            </div>
                            <div className="form-item flex-cs col">
                                <label htmlFor="province">PROVINSI</label>
                                <div className="input-box flex-sc">
                                    <div className="icon flex-cc"><GiRank2 /></div>
                                    <select value={inputData.province} onChange={mutateInput} name="province" id="province">
                                        <option value="" disabled>Pilih provinsi</option>
                                        {provinceList.map((item, i) => (
                                            <option value={item.nama} key={i}>{item.nama}</option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-item flex-cs col">
                                <label htmlFor="city">KOTA / KAB</label>
                                <div className="input-box flex-sc">
                                    <div className="icon flex-cc"><GiRank1 /></div>
                                    <select value={inputData.city} onChange={mutateInput} name="city" id="city">
                                        <option value="" disabled>{cityList.length === 0 ? 'Pilih provinsi terlebih dahulu' : 'Pilih kota'}</option>
                                        {cityList.map((item, i) => (
                                            <option value={item.nama} key={i}>{item.nama}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-item flex-cs col">
                                <label htmlFor="school">SEKOLAH</label>
                                <div className="input-box flex-sc">
                                    <div className="icon flex-cc"><BiBuildings /></div>
                                    <input type="text" value={inputData.school} onChange={mutateInput} name="school" id="school" placeholder="Asal sekolah"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </MainLayout>
            )}
        </UserOnlyRoute>
    )
}
const style = ({inputData}) => css`
    padding: 64px 0;

    .form-item {
        margin: 16px 0;
        
        label {
            font-family: Poppins;
            font-weight: 700;
            font-size: 18px;
            color: #0008;

            margin-bottom: 4px;
        }

        .input-box {
            width: 100%;
            height: 52px;

            background: #FFFFFF;
            border: 1px solid #AFAFAF;
            box-sizing: border-box;
            box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.25);
            border-radius: 8px;
            overflow: hidden;

            .icon{
                height: 100%;
                padding: 0 6px 0 12px;
                
                font-size: 28px;
                color: #0008;
            }

            input, select {
                border-radius: 0;
                padding: 12px 16px 12px 6px;
                width: 100%;
                height: 100%;
                border: none;
                background: none;

                font-family: Poppins;
                font-size: 16px;
                line-height: 37px;

                &:focus{
                    outline: none;
                }

                &::placeholder{
                    color: #0005;
                }
            }

            select{
                margin-right: 12px;

                &:focus{
                    color: var(--army) !important;
                }
                
                &:nth-of-type(1){
                    ${inputData.province ? '' : 'color: #0005;'}
                }
                &:nth-of-type(2){
                    ${inputData.city ? '' : 'color: #0005;'}
                }
            }
        }
    }

`
    
export default Dashboard