import React from 'react';
import PropTypes from 'prop-types';

function SelectBox(props) {

    const { name, platformsArray, onChange } = props

    return (
        <div>
            <select name={name} onChange={onChange}>
                {platformsArray.map(platform => 
                    <option key={platform.id} value={platform.value}>{platform.value}</option>
                )}
            </select>
        </div>
    )
}

SelectBox.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    platformsArray: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.any.isRequired,
            value: PropTypes.any.isRequired
        }).isRequired
    ).isRequired
    // All the isRequired is actually required for the full validation to work
}

export default SelectBox