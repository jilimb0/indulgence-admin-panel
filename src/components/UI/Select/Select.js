import React from 'react'
import './select.scss'

const Select = ({title, name, labelImg, activeValue, options = [], handleChange}) => {
    const renderOption = options.map(item => <option key={item.name} value={item.name}>{item.title}</option>);
    return (
        <label className="label-select">
            {labelImg && <img src={labelImg} alt="Label"/>}
            <span className="label-text label-text-active">{title.charAt(0).toUpperCase()}{title.substr(1)}</span>
            <select name={name} className="select-style" value={activeValue} onChange={(e) => handleChange(e)}>
                {renderOption}
            </select>
        </label>
    )
};

export default Select;
