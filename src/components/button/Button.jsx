import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
    
    const { buttonText, onButtonClick, classNames } = props
    
    return (
        <input type="button" value={buttonText} onClick={onButtonClick} className={classNames} />
    )
}

Button.propTypes = {
    buttonText: PropTypes.string,
    onButtonClick: PropTypes.func,
    className: PropTypes.string
}

export default Button