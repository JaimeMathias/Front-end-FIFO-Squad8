import React, { useState, useEffect } from 'react';
import { SelectBox } from "../selectbox/SelectBox";

function EntryPoint() {
    
    const [platformsOptions] = useState([  // Não tem o set pq n to usando ainda mesmo
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
            <form action="">
                <label name='Nome'>Nome</label>
                <br/>
                <input type="text" name="Oi" id=""/>
                <br/>
                <label name='Plataforma'>Plataforma</label>
                <SelectBox
                    name={'Plataforma'}
                    value={value}
                    platformsOptions={platformsOptions}
                    onSelectBoxChange={handleSelectBoxChange}
                />
                <p>Fila {'x'} pessoas</p>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default EntryPoint