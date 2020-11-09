import React, { useState, useEffect } from 'react';
import UserPosition from '../userposition/UserPosition'
import { getUserQueuePosition, leavePlatformQueue, leavePlatformGame } from '../useronqueue/UserOnQueue'
import Button from '../button/Button'

function UserOnQueue(props) {

    const { userId, userInitialQueuePosition } = props
    
    const [userQueuePosition, setUserQueuePosition] = useState(0)

    const [classUserPositionNames] = useState('user-position')
    // Temporary style for better visualization

    const [buttonText, setButtonText] = useState('Sair')
    
    /* Functions */
    function handleUserLeave() {
        if (userQueuePosition > 1) {
            leavePlatformQueue(

                // Url
                "https://www.fakeapi.online/api/apis/jaimemathias/api/usuario/queue-checkout",

                // UserId Info
                userId,

                // Callback Function
                () => {
                    console.log("Sucesso ao sair da fila!");
                } 

            )
        } 
    }
    
    /* Lifecycle Hooks */
    useEffect(() => {
        if (userId) {
            console.log('userId changed: ', userId);
            const auxfuncGetUserQueuePosition = () => {
                getUserQueuePosition(

                    // Url
                    "https://www.fakeapi.online/api/apis/jaimemathias/api/usuario",

                    // UserId Info
                    userId,

                    // Callback Function
                    (userPosition) => {
                        console.log(userPosition);
                        setUserQueuePosition(userPosition.position)
                    } 
                )
            }

            var getPositionInterval = setInterval(auxfuncGetUserQueuePosition, 60000); // 60000 ms = 1 minute
        }

        // generally the getPositionInterval should be in the local scope
        // but as it's right now, doesnt need because this useEffect only updates 1 time
        return () => clearInterval(getPositionInterval)
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
            console.log("É sua vez!");
            setButtonText("Sair do jogo")
        }

    }, [userQueuePosition]);
    
    return (
        <div>
            <p className={classUserPositionNames}>Sua posição: </p>
            <UserPosition
                userPosition={userQueuePosition}
                classNames={classUserPositionNames}
            />
            <Button
                buttonText={buttonText}
                onButtonClick={handleUserLeave}
                classNames={'leave-button'}
            />
        </div>
    )
}

export default UserOnQueue