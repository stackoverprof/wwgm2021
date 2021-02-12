import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import axios from 'axios'
import { DB } from '@core/services/firebase'
import { useAuth } from '@core/contexts/AuthContext'
import { useLayout } from '@core/contexts/LayoutContext'

import { BiIdCard, BiUserPin, BiPhone, BiBuildings } from 'react-icons/bi'
import { GiRank1, GiRank2 } from 'react-icons/gi'
import Spinner from '@components/atomic/spinner/Circle'
    
const BioEdit = () => {
    const [provinceList, setProvinceList] = useState([])
    const [cityList, setCityList] = useState([])
    const [selectedProvinceId, setSelectedProvinceId] = useState('')
    const [loading, setLoading] = useState(false)
    const [inputData, setInputData] = useState({
        fullName: '',
        displayName: '',
        contact: '',
        province: '',
        city: '',
        school: ''
    })
    
    const { user, userData } = useAuth()
    const { setGlobalAlert } = useLayout()

    const mutateInputData = (e) => {
        setInputData((prevState) => ({
           ...prevState,
           [e.target.name]: e.target.value
        }))

        if (e.target.name === 'province') {
            handleProvinceChange(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        await DB.collection('Users').doc(user.uid).update({
            fullName: inputData.fullName,
            displayName: inputData.displayName,
            contact: inputData.contact,
            province: inputData.province,
            city: inputData.city,
            school: inputData.school
        }).then(() => setGlobalAlert({error: false, body: 'Berhasil mengubah data!'}))
        .catch(() => setGlobalAlert({error: true, body: 'Gagal mengupdate data'}))
        
        setLoading(false)
    }

    const handleProvinceChange = (name) => {
        if (name === '') return

        const provinceItem = provinceList.filter((item) => {
            return item.nama === name
        })[0]
        console.log(name)
        console.log(provinceItem)
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

    const fetchInitial = async () => {
        await fetchProvince().then(() => {
            if (Object.keys(userData).length !== 0) {
                handleProvinceChange(userData.province)
                setInputData({
                    fullName: userData.fullName,
                    displayName: userData.displayName,
                    contact: userData.contact,
                    province: userData.province,
                    city: userData.city,
                    school: userData.school
                })
            }
        })
    }
    
    useEffect(() => { 
        fetchCity() 
    }, [selectedProvinceId])

    useEffect(() => {
        fetchInitial()
    }, [userData])

    return (
        <div css={style({inputData})} className="contain-size-s">
            <form onSubmit={handleSubmit} className="flex-cc col">
                <div className="form-item full-w flex-cs col">
                    <label htmlFor="fullName">NAMA LENGKAP</label>
                    <div className="input-box flex-sc">
                        <div className="icon flex-cc"><BiIdCard /></div>
                        <input type="text" value={inputData.fullName} onChange={mutateInputData} name="fullName" id="fullName" placeholder="Nama lengkap sesuai KTP"/>
                    </div>
                </div>
                <div className="form-item full-w flex-cs col">
                    <label htmlFor="displayName">DISPLAY NAME</label>
                    <div className="input-box flex-sc">
                        <div className="icon flex-cc"><BiUserPin /></div>
                        <input type="text" value={inputData.displayName} onChange={mutateInputData} name="displayName" id="displayName" placeholder="Nama panggilan"/>
                    </div>
                </div>
                <div className="form-item full-w flex-cs col">
                    <label htmlFor="contact">KONTAK</label>
                    <div className="input-box flex-sc">
                        <div className="icon flex-cc"><BiPhone /></div>
                        <input type="text" value={inputData.contact} onChange={mutateInputData} name="contact" id="contact" placeholder="Id Line / nomor WA yang aktif"/>
                    </div>
                </div>
                <div className="form-item full-w flex-cs col">
                    <label htmlFor="province">PROVINSI</label>
                    <div className="input-box flex-sc">
                        <div className="icon flex-cc"><GiRank2 /></div>
                        <select value={inputData.province} onChange={mutateInputData} name="province" id="province">
                            <option value="" disabled>Pilih provinsi</option>
                            {provinceList.map((item, i) => (
                                <option value={item.nama} key={i}>{item.nama}</option>
                                ))}
                        </select>
                    </div>
                </div>
                <div className="form-item full-w flex-cs col">
                    <label htmlFor="city">KOTA / KAB</label>
                    <div className="input-box flex-sc">
                        <div className="icon flex-cc"><GiRank1 /></div>
                        <select value={inputData.city} onChange={mutateInputData} name="city" id="city">
                            <option value="" disabled>{cityList.length === 0 ? 'Pilih provinsi terlebih dahulu' : 'Pilih kota'}</option>
                            {cityList.map((item, i) => (
                                <option value={item.nama} key={i}>{item.nama}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-item full-w flex-cs col">
                    <label htmlFor="school">SEKOLAH</label>
                    <div className="input-box flex-sc">
                        <div className="icon flex-cc"><BiBuildings /></div>
                        <input type="text" value={inputData.school} onChange={mutateInputData} name="school" id="school" placeholder="Asal sekolah"/>
                    </div>
                </div>
                <button type="submit" className="submit">
                    {loading ? <Spinner w={160} h={26}/> : 'UPDATE DATA'}
                </button>
            </form>
        </div>
    )
}
const style = ({inputData}) => css`

    button.submit {
        margin-top: 24px;
        padding: 12px 42px;
    }

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
    
export default BioEdit