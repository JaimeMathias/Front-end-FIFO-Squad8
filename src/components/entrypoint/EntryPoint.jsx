import React, { useState, useEffect, useRef } from 'react';
import SelectBox from "../selectbox/SelectBox";
import { enterPlatformQueue, getPlatforms, getPlatformsQueueCount } from "./EntryPoint"

function EntryPoint() {
    
    const [platformsOptions, setPlatformsOptions] = useState([
        { id: 'unique', value: "Select platform" }  
        // Using a 'unique' id because if i use '0', it could cause conflicts. e.g.: 
        // React sees that the key (id) is the same on both the VDOM and the DOM, so interprets that it didnt changed.
        // In this specific case, i'm only using it for safety purposes
    ])

    const [selectedPlatform, setSelectedPlatform] = useState('')

    const userNameInput = useRef()

    const [platformsQueue, setPlatformsQueue] = useState('')

    const [selectedPlatformQueueCount, setSelectedPlatformQueueCount] = useState('')

    /* Functions */
    function handleSelectBoxChange(e) {
        setSelectedPlatform(platformsOptions.find(platform => platform.value === e.target.value))
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
        const auxfuncGetPlatformQueueCount = () => {
            getPlatformsQueueCount(
                'https://www.fakeapi.online/api/apis/jaimemathias/api/plataforma/queue-count',
                (platformQueueCount) => { 
                    //console.log(platformQueueCount);
                    setPlatformsQueue(platformQueueCount);
                }
            )
        }

        auxfuncGetPlatformQueueCount()
        const queueInterval = setInterval(auxfuncGetPlatformQueueCount, 10000) // 300000 ms = 5 minutes

        // Http Request
        getPlatforms('https://www.fakeapi.online/api/apis/jaimemathias/api/platform',

            // Callback Function
            (platforms) => {
                setPlatformsOptions(platforms)
                //console.log(platforms);
            }
        )

        return () => clearInterval(queueInterval)
    }, []) // Only runs when the component is mounted

    useEffect(() => {
        if (selectedPlatform) {     // Only works when the value changes from the initial value ('')
            //console.log('Rendered: ', selectedPlatform.value);
            if (platformsQueue) {
                setSelectedPlatformQueueCount(platformsQueue.find(platform => platform.id === selectedPlatform.id).queueCount)
            }
        }
    }, [selectedPlatform, platformsQueue])
    // try to fix this, if i put platformQueueCount in the array, it will update everytime the interval runs

    useEffect(() => {
        if (platformsOptions[0].id !== 'unique') {  
            // To prevent the selectedPlatform to be setted to "Select a platform" and cause errors on the other useEffect
            // a solution could be make the platformOptions undefined and in the SelectBox put a propDefault
            setSelectedPlatform(platformsOptions[0])
        }
    }, [platformsOptions])

    return (
        <div>
            <form onSubmit={handlePlatformQueue}>
                <label name='userNameInput'>Nome</label>
                <br/>
                <input autoFocus type="text" name="userNameInput" id="userNameInput" ref={userNameInput} required/>
                <br/>
                <label name='platformSelectBox'>Plataforma</label>
                <SelectBox
                    name={'platformSelectBox'}
                    platformsOptions={platformsOptions}
                    onChange={handleSelectBoxChange}
                />
                <p>Fila {selectedPlatformQueueCount} pessoas</p>
                <input type="submit" value="Entrar na fila"/>
            </form>
        </div>
    )
}

export default EntryPoint