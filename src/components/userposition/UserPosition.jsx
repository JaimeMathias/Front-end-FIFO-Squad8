import React from 'react';
import PropTypes from 'prop-types';

function UserPosition(props) {
    
    const { userPosition, classNames } = props

    return (
        <p className={classNames}>{userPosition}</p>
    )
}

UserPosition.propTypes = {
    userPosition: PropTypes.number.isRequired,
    classNames: PropTypes.string
}

export default UserPosition