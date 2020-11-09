import React, { useState, useEffect } from 'react';
import UserPosition from '../userposition/UserPosition'

function UserOnQueue(props) {

    const [userQueuePosition, setUserQueuePosition] = useState(0)

    const [classUserPositionNames] = useState('userPosition')

    useEffect(() => {
        console.log(userQueuePosition);
    }, [])

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