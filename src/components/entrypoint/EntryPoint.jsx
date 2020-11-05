import React, { useState, useEffect } from 'react';
import { SelectBox } from "../selectbox/SelectBox";
import { getPlatforms } from "./EntryPoint"

function EntryPoint() {
    
    const [platformsOptions, setPlatformsOptions] = useState([  // Não tem o set pq n to usando ainda mesmo
        { id: 0, value: "Select platform" }
    ])

    const [value, setValue] = useState('PS4')

    function handleSelectBoxChange(e) {
        setValue(e.target.value)
    }

    useEffect(() => {
        getPlatforms((platforms) => {
            console.log(platforms)
            setPlatformsOptions(platforms)
        })
    }, []) // Essa forma faz com que ele só rode o algoritmo quando o componente é montado
           // Mas vai ter que ver outra forma pelo oq eu entendi, seria melhor pelo menos

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