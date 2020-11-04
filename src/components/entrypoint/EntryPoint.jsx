import React, { useState, useEffect } from 'react';
import { SelectBox } from "../selectbox/SelectBox";

function EntryPoint() {
    
    const [plataformsOptions] = useState([  // Não tem o set pq n to usando ainda mesmo
        { id: 0, value: "PS4" },
        { id: 1, value: "Sinuca/PingPong" },
        { id: 2, value: "Monopoly" },
        { id: 3, value: "War" }
    ])

    const [value, setValue] = useState('PS4')

    function handleSelectBoxChange(e) {
        setValue(e.target.value)
    }

    return (
        <div>
            <SelectBox
                value={value}
                plataformsOptions={plataformsOptions}
                onSelectBoxChange={handleSelectBoxChange}
            />
        </div>
    )
}

export default EntryPoint