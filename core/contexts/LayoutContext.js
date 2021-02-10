import React, { useContext, useState } from 'react'

const LayoutContext = React.createContext()

const LayoutProvider = ({children}) => {
    const [dimm, setDimm] = useState(false)
    const [globalAlert, setGlobalAlert] = useState('')

    return (
        <LayoutContext.Provider value={{
            dimm,
            globalAlert,
            setDimm,
            setGlobalAlert
        }}>
            { children }
        </LayoutContext.Provider>
    )
}

export default LayoutProvider
export const useLayout = () => useContext(LayoutContext)