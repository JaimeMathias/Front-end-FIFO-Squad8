import React, { useState, useEffect, useRef } from 'react';
import { SelectBox } from "../selectbox/SelectBox";
import { enterPlatformQueue, getPlatforms } from "./EntryPoint"

function EntryPoint() {
    
    const [platformsOptions, setPlatformsOptions] = useState([  // Não tem o set pq n to usando ainda mesmo
        { id: 0, value: "Select platform" }
    ])

    const [selectedPlatform, setSelectedPlatform] = useState('PS4')

    const nameInput = useRef()

    function handleSelectBoxChange(e) {
        setSelectedPlatform(e.target.value)
    }

    useEffect(() => {
        getPlatforms((platforms) => {
            console.log(platforms)
            setPlatformsOptions(platforms)
        })
    }, []) // Essa forma faz com que ele só rode o algoritmo quando o componente é montado
           // Mas vai ter que ver outra forma pelo oq eu entendi, seria melhor pelo menos

    function handlePlatformQueue() {
        console.log(nameInput.current.value);
        console.log(selectedPlatform);

        enterPlatformQueue({
            name: nameInput.current.value,
            platform: selectedPlatform
        }, (id) => {  // Callback Function
            console.log(id);
            // probably stores it to some local variable, discuss about it with a dev
            //localStorage.setItem("user_id", 'id')
        })
    }

    return (
        <div>
            <label name='Nome'>Nome</label>
            <br/>
            <input autoFocus type="text" name="Oi" id="inputname" ref={nameInput}/>
            <br/>
            <label name='Plataforma'>Plataforma</label>
            <SelectBox
                name={'Plataforma'}
                value={selectedPlatform}
                platformsOptions={platformsOptions}
                onSelectBoxChange={handleSelectBoxChange}
            />
            <p>Fila {'x'} pessoas</p>
            <input type="submit" value="Submit" onClick={handlePlatformQueue}/>
        </div>
    )
}

export default EntryPoint