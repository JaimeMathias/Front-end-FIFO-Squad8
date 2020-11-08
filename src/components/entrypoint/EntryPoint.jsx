import React, { useState, useEffect, useRef } from 'react';
import SelectBox from "../selectbox/SelectBox";
import { enterPlatformQueue, getPlatforms } from "./EntryPoint"

function EntryPoint() {
    
    const [platformsOptions, setPlatformsOptions] = useState([
        { id: 0, value: "Select platform" }
    ])

    const [selectedPlatform, setSelectedPlatform] = useState(platformsOptions[0].value)

    const userNameInput = useRef()

    /* Functions */
    function handleSelectBoxChange(e) {
        setSelectedPlatform(e.target.value)
    }

    function handlePlatformQueue() {
        console.log(userNameInput.current.value);
        console.log(selectedPlatform);

        enterPlatformQueue(
        'https://www.fakeapi.online/api/apis/jaimemathias/api/fila/checkin', 
        {
            userName: userNameInput.current.value,
            platform: selectedPlatform
        }, 
        (userId) => {  // Callback Function
            console.log(userId);
            // probably stores it to some local variable, discuss about it with a dev
            //localStorage.setItem("user_id", 'id')
        })
    }

    /* Lifecycle Hooks */
    useEffect(() => {
        getPlatforms('https://www.fakeapi.online/api/apis/jaimemathias/api/platform', 
        (platforms) => {
            setPlatformsOptions(platforms)
            setSelectedPlatform(platforms[0].value)
        })
    }, []) // Only runs when the component is mounted

    useEffect(() => {
        console.log('Rendered: ', selectedPlatform);
    }, [selectedPlatform])

    return (
        <div>
            <label name='userNameInput'>Nome</label>
            <br/>
            <input autoFocus type="text" name="userNameInput" id="userNameInput" ref={userNameInput}/>
            <br/>
            <label name='platformSelectBox'>Plataforma</label>
            <SelectBox
                name={'platformSelectBox'}
                value={selectedPlatform}
                platformsOptions={platformsOptions}
                onSelectBoxChange={handleSelectBoxChange}
            />
            <p>Fila {'x'} pessoas</p>
            <input type="submit" value="Entrar na fila" onClick={handlePlatformQueue}/>
        </div>
    )
}

export default EntryPoint