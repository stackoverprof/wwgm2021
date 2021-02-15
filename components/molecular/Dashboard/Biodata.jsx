import React, { useEffect } from 'react'
import { css } from '@emotion/react'

import { useLayout } from '@core/contexts/LayoutContext'
import BioOverview from '@components/molecular/Dashboard/BioOverview'
import BioEdit from '@components/molecular/Dashboard/BioEdit'

const Biodata = ({openEdit, editSwitch, setEditSwitch}) => {

    const { setGlobalAlert } = useLayout()

    useEffect(() => {

        return () => setGlobalAlert('')
    }, [])

    return (
        <div css={style} className="full-w flex-cc">
            {editSwitch ?
                <BioEdit setEditSwitch={setEditSwitch}/>
            :
                <BioOverview openEdit={openEdit}/>
            }
        </div>
    )
}

const style = css`
    
`

export default Biodata