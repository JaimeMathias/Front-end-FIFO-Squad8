import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SelectBox from "../selectbox/SelectBox";
import { enterPlatformQueue, getPlatforms, getPlatformsQueue } from "./EntryPoint"

function EntryPoint(props) {
    
    const [platformsOptions, setPlatformsOptions] = useState([
        { id: 'unique', value: "Select platform" }  
        // Using a 'unique' id because if i use '0', it could cause conflicts. e.g.: 
        // React sees that the key (id) is the same on both the VDOM and the DOM, so interprets that it didnt changed.
        // In this specific case, i'm only using it for safety purposes
    ])

    const [selectedPlatform, setSelectedPlatform] = useState('')

    const userNameInput = useRef()

    // An array that keeps the queue count on each Platform
    const [platformsQueue, setPlatformsQueue] = useState('')

    // Mantains the selected platform queue count
    const [selectedPlatformQueue, setSelectedPlatformQueue] = useState(0)

    const { onUserIdChange } = props


    /* Functions */
    
    function handleSelectBoxChange(e) {
        setSelectedPlatform(platformsOptions.find(platform => platform.value === e.target.value))
    }

    function handleUserCheckin(e) {
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
            (userInfo) => {  
                //console.log(userInfo);
                onUserIdChange(userInfo)
            }
        )
    }


    /* Lifecycle Hooks */

    useEffect(() => {
        /*
            Function that only runs when the component is mounted,
            it gets the queue count on each Platform and sets an
            interval of 5 minutes to update the queue's as well
            the cleanup function to clear it.
            It also gets the list of platforms
        */
        const auxfuncGetPlatformQueue = () => {
            getPlatformsQueue(

                // Http Request
                'https://www.fakeapi.online/api/apis/jaimemathias/api/plataforma/queue-count',

                // Callback Function
                (platformQueueCount) => { 
                    //console.log(platformQueueCount);
                    setPlatformsQueue(platformQueueCount);
                }
            )
        }

        auxfuncGetPlatformQueue()
        const queueInterval = setInterval(auxfuncGetPlatformQueue, 300000) // 300000 ms = 5 minutes

        /* Get the list of platforms */
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
        if (selectedPlatform) {    // Prevent selectedPlatform being undefined
            if (platformsQueue) {
                // Condition to prevent the possible conflict of either selectedPlatform or
                // platformsQueue being still undefined
                setSelectedPlatformQueue(platformsQueue.find(platform => platform.id === selectedPlatform.id).queueCount)
            }
        }
    }, [selectedPlatform, platformsQueue])
    // Little "bug": with platformQueueCount in the array, it will update everytime the interval runs
    // but it only runs at 5 in 5 minutes, so it's just a little overhead

    useEffect(() => {
        if (platformsOptions[0].id !== 'unique') {  
            // Condition made to prevent the selectedPlatform to be setted to 
            // "Select a platform" and cause errors on the other useEffect.
            // A possible solution could be to make the platformOptions undefined and in the SelectBox put a propDefault
            setSelectedPlatform(platformsOptions[0])
        }
    }, [platformsOptions])

    return (
        <div>
            <form onSubmit={handleUserCheckin}>
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
                <p>Fila {selectedPlatformQueue} pessoas</p>
                <input type="submit" value="Entrar na fila"/>
            </form>
        </div>
    )
}

EntryPoint.propTypes = {
    onUserIdChange: PropTypes.func
}

export default EntryPoint