import React, { useState, useEffect } from 'react';
import UserPosition from '../userposition/UserPosition'
import { getUserQueuePosition } from '../useronqueue/UserOnQueue'

function UserOnQueue(props) {

    const [userQueuePosition, setUserQueuePosition] = useState(0)

    const [classUserPositionNames] = useState('userPosition')
    // Temporary style for better visualization

    const { userId } = props

    useEffect(() => {
        if (userId) {
            console.log('oi');
            console.log('userId changed: ', userId);
            const auxfuncGetUserQueuePosition = () => {
                getUserQueuePosition(
                    "https://www.fakeapi.online/api/apis/jaimemathias/api/usuario",
                    userId,
                    (userPosition) => {
                        console.log(userPosition);
                        setUserQueuePosition(userPosition.position)
                    } 
                )
            }

            auxfuncGetUserQueuePosition()
        }
    }, [userId])

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