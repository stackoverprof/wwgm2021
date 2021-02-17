import React, { useEffect } from 'react'

import { useLayout } from '@core/contexts/LayoutContext'
import BioOverview from '@components/molecular/Dashboard/BioOverview'
import BioEdit from '@components/molecular/Dashboard/BioEdit'

const Biodata = ({openEdit, editSwitch, setEditSwitch, setActiveTab}) => {
    const { setGlobalAlert } = useLayout()

    useEffect(() => {

        return () => setGlobalAlert('')
    }, [])

    return (
        <div className="full-w flex-cc">
            {editSwitch ?
                <BioEdit setEditSwitch={setEditSwitch}/>
            :
                <BioOverview openEdit={openEdit} setActiveTab={setActiveTab}/>
            }
        </div>
    )
}

export default Biodata