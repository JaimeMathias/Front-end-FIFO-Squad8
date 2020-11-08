import React, { useState, useEffect, useRef } from 'react';
import SelectBox from "../selectbox/SelectBox";
import { enterPlatformQueue, getPlatforms } from "./EntryPoint"

function EntryPoint() {
    
    const [platformsOptions, setPlatformsOptions] = useState([
        { id: 'unique', value: "Select platform" }  
        // Using a 'unique' id because if i use '0', it could cause conflicts. e.g.: 
        // React sees that the key (id) is the same on both the VDOM and the DOM, so interprets that it didnt changed.
        // In this specific case, i'm only using it for safety purposes
    ])

    const [selectedPlatform, setSelectedPlatform] = useState('')

    const userNameInput = useRef()

    /* Functions */
    function handleSelectBoxChange(e) {
        setSelectedPlatform(e.target.value)
    }

    function handlePlatformQueue(e) {
        e.preventDefault() // Prevents the page from refreshing automatically 
        
        //console.log(userNameInput.current.value);
        //console.log(selectedPlatform);

        // Http Request
        enterPlatformQueue(
            'https://www.fakeapi.online/api/apis/jaimemathias/api/fila/checkin', 

            // User info
            {   
                userName: userNameInput.current.value,
                platform: selectedPlatform
            }, 

            // Callback Function
            (userId) => {  
                //console.log(userId);
                // probably stores it to some local variable, discuss about it with a dev
            }
        )
    }

    /* Lifecycle Hooks */
    useEffect(() => {

        // Http Request
        getPlatforms('https://www.fakeapi.online/api/apis/jaimemathias/api/platform',

            // Callback Function
            (platforms) => {
                setPlatformsOptions(platforms)
                setSelectedPlatform(platforms[0].value)
            }
        )
    }, []) // Only runs when the component is mounted

    useEffect(() => {
        if (selectedPlatform) {     // Only works when the value changes from the initial value ('')
            //console.log('Rendered: ', selectedPlatform);
        }
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
                onChange={handleSelectBoxChange}
            />
            <p>Fila {'x'} pessoas</p>
            <input type="submit" value="Entrar na fila" onClick={handlePlatformQueue}/>
        </div>
    )
}

export default EntryPoint