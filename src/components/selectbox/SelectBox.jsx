import React from 'react';

function SelectBox(props) {
    /*const [initialValue, setinitialValue] = useState({
        id: 0,
        value: "PS4"
    })*/

    const { name, platformsOptions, onChange } = props

    return (
        <div>
            <select name={name} onChange={onChange}>
                {platformsOptions.map(platform => 
                    <option key={platform.id} value={platform.value}>{platform.value}</option>
                )}
            </select>
        </div>
    )
}

export default SelectBox