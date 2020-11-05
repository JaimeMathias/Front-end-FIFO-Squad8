import React, { useEffect } from 'react';

function SelectBox(props) {
    /*const [initialValue, setinitialValue] = useState({
        id: 0,
        value: "PS4"
    })*/

    const { value, platformsOptions, onSelectBoxChange, name } = props

    useEffect(() => {
        console.log(value); // Only shows the real setted value after updating the component, because the setValue is async
        // Dont forget that this shows when the component is first rendered too
    }) 

    return (
        <div>
            <select name={name} onChange={onSelectBoxChange}>
                {platformsOptions.map(platform => 
                    <option key={platform.id} value={platform.value}>{platform.value}</option>
                )}
            </select>
        </div>
    )
}

export { SelectBox }