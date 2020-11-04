import React, { useState, useEffect } from 'react';

function SelectBox(props) {
    /*const [initialValue, setinitialValue] = useState({
        id: 0,
        value: "PS4"
    })*/

    const [plataformsOptions, setplataformOptions] = useState([
        { id: 0, value: "PS4" },
        { id: 1, value: "Sinuca/PingPong" },
        { id: 2, value: "Monopoly" },
        { id: 3, value: "War" }
    ])

    return (
        <div>
            <select name="Plataformas">
                {plataformsOptions.map(plataform => 
                    <option value={plataform.value}>{plataform.value}</option>
                )}
            </select>
        </div>
    )
}

/*
<option value={plataformsOptions[0].value}>{plataformsOptions[0].value}</option>
                <option value={plataformsOptions[1].value}>{plataformsOptions[1].value}</option>
                <option value={plataformsOptions[2].value}>{plataformsOptions[0].value}</option>
                <option value={plataformsOptions[3].value}>{plataformsOptions[0].value}</option>
                */

export { SelectBox }