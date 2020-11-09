import React, { useState, useEffect } from 'react';
import UserPosition from '../userposition/UserPosition'
import { getUserQueuePosition, leavePlatformQueue } from '../useronqueue/UserOnQueue'
import Button from '../button/Button'

function UserOnQueue(props) {

    const { userId, userInitialQueuePosition } = props
    
    const [userQueuePosition, setUserQueuePosition] = useState(0)

    const [classUserPositionNames] = useState('userPosition')
    // Temporary style for better visualization

    const [buttonText, setButtonText] = useState('Sair')

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

        return () => clearInterval(getPositionInterval)
        // generally the getPositionInterval should be in the local scope
        // but as it's right now, doesnt need because this useEffect only updates 1 time
    }, [userId])

    useEffect(() => {
        setUserQueuePosition(userInitialQueuePosition)
    }, [userInitialQueuePosition])

    useEffect(() => {
        if (userQueuePosition === 1) {
            // Some warning to the user that is his turn
            console.log("É sua vez!");
        }
    }, [userQueuePosition]);

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