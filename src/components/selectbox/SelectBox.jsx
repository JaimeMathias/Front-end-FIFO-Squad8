import React, { useState, useEffect } from 'react';

function SelectBox(props) {
    /*const [initialValue, setinitialValue] = useState({
        id: 0,
        value: "PS4"
    })*/

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

    useEffect(() => {
        console.log(value); // Only shows the real setted value after updating the component, because the setValue is async
        // Dont forget that this shows when the component is first rendered too
    }) 

    return (
        <div>
            <select name="Plataformas" onChange={handleSelectBoxChange}>
                {plataformsOptions.map(plataform => 
                    <option key={plataform.id} value={plataform.value}>{plataform.value}</option>
                )}
            </select>
        </div>
    )
}

export { SelectBox }