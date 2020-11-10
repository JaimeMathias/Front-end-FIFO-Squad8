import React from 'react';
import PropTypes from 'prop-types';

function UserPosition(props) {
    
    const { userPosition, classNames } = props

    return (
        <span className={classNames}>{userPosition}</span>
    )
}

UserPosition.propTypes = {
    userPosition: PropTypes.number.isRequired,
    classNames: PropTypes.string
}

export default UserPosition