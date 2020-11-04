import React, { useState, useEffect } from 'react';

function SelectBox(props) {
    /*const [initialValue, setinitialValue] = useState({
        id: 0,
        value: "PS4"
    })*/

    const { value, plataformsOptions, onSelectBoxChange } = props

    useEffect(() => {
        console.log(value); // Only shows the real setted value after updating the component, because the setValue is async
        // Dont forget that this shows when the component is first rendered too
    }) 

    return (
        <div>
            <select name="Plataformas" onChange={onSelectBoxChange}>
                {plataformsOptions.map(plataform => 
                    <option key={plataform.id} value={plataform.value}>{plataform.value}</option>
                )}
            </select>
        </div>
    )
}

export { SelectBox }