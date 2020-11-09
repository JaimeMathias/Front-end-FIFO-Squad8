import React, { useState, useEffect } from 'react';
import UserPosition from '../userposition/UserPosition'
import { getUserQueuePosition } from '../useronqueue/UserOnQueue'

function UserOnQueue(props) {

    const { userId, userInitialQueuePosition } = props
    
    const [userQueuePosition, setUserQueuePosition] = useState(0)

    const [classUserPositionNames] = useState('userPosition')
    // Temporary style for better visualization

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
    
    return (
        <div>
            <p className={classUserPositionNames}>Sua posição: </p>
            <UserPosition
                userPosition={userQueuePosition}
                classNames={classUserPositionNames}
            />
        </div>
    )
}

export default UserOnQueue