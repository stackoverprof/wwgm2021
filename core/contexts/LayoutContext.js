import React, { useContext, useState } from 'react'

const LayoutContext = React.createContext()

const LayoutProvider = ({children}) => {
    const [dimm, setDimm] = useState(true)

    return (
        <LayoutContext.Provider value={{
            dimm,
            setDimm
        }}>
            { children }
        </LayoutContext.Provider>
    )
}

export default LayoutProvider
export const useLayout = () => useContext(LayoutContext)