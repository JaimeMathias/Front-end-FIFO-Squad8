import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import UserPosition from '../userposition/UserPosition'
import Button from '../button/Button'
import { getUserQueuePosition, leavePlatformQueue, leavePlatformGame } from '../useronqueue/UserOnQueue'

function UserOnQueue(props) {

    const { userId, userInitialQueuePosition } = props
    
    const [userQueuePosition, setUserQueuePosition] = useState(0)

    const [buttonText, setButtonText] = useState('Sair')

    const intervalRef = useRef()
    
    /* Functions */
    function handleUserCheckout() {
        /* 
            If the the userQueuePosition is greater than 1
            so it means that he's still on the queue.
            Therefore, if his position is 1, then
            then it means that the user is playing.
        */
        if (userQueuePosition > 1) {
            leavePlatformQueue(

                // Url
                "https://www.fakeapi.online/api/apis/jaimemathias/api/usuario/queue-checkout",

                // UserId Info
                userId,

                // Callback Function
                () => {
                    console.log("Sucesso ao sair da fila!");
                    setUserQueuePosition(0)
                    clearInterval(intervalRef.current)
                } 
            )
        } 
        else if (userQueuePosition === 1) {
            leavePlatformGame(

                // Url
                "https://www.fakeapi.online/api/apis/jaimemathias/api/usuario/game-checkout",

                // UserId Info
                userId,

                // Callback Function
                () => {
                    console.log("Sucesso ao sair do jogo!");
                    setUserQueuePosition(0)
                    clearInterval(intervalRef.current)
                } 
            )
        }
    }
    
    /* Lifecycle Hooks */
    useEffect(() => {
        /*
            When the user check-ins, then the if condition is true,
            so it sets an interval of 1 minute to check if
            the queuePosition of the user has changed, as
            well the cleanup function to clear it
        */
        if (userId) {
            //console.log('userId changed: ', userId);
            const getPositionInterval = 
            setInterval(() => {
                // Http Request
                getUserQueuePosition(

                    // Url
                    "https://www.fakeapi.online/api/apis/jaimemathias/api/usuario",

                    // UserId Info
                    userId,

                    // Callback Function
                    (userPosition) => {
                        //console.log(userPosition);
                        setUserQueuePosition(userPosition.position)
                    } 

                )
            }, 60000); // 60000 ms = 1 minute
            intervalRef.current = getPositionInterval
        }

        return () => clearInterval(intervalRef.current)
    }, [userId])

    useEffect(() => {
        setUserQueuePosition(userInitialQueuePosition)
    }, [userInitialQueuePosition])

    useEffect(() => {
        if (userQueuePosition > 1) {
            setButtonText('Sair da fila')
        }
        else if (userQueuePosition === 1) {
            // Some warning to the user that is his turn
            alert("É sua vez!");
            setButtonText("Sair do jogo")
        }

    }, [userQueuePosition]);
    
    return (
        <div>
            <p style={{margin: "5em 0 0.8em", fontWeight: "bold"}}>User-On-Queue Component:</p>
            <p>Sua posição:&nbsp; 
            <UserPosition
                userPosition={userQueuePosition}
            />
            </p>
            <Button
                buttonText={buttonText}
                onButtonClick={handleUserCheckout}
            />
        </div>
    )
}
// Is it worth to have a Button component, that is literal the same as the html tag?
// For the User Position component, idk either, but its good to think in a scenario
// of the Context API, but idk if it's worth either way

UserOnQueue.propTypes = {
    userId: PropTypes.number,
    userInitialQueuePosition: PropTypes.number
}

export default UserOnQueue