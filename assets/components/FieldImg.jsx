import React from 'react';

const FieldImg = ({name, label, onChange, placeholder= "", error=""}) => {
    return ( 
        <div className="my-3">
            <label htmlFor={name}>{label}</label>
            <input 
                type="file"
                onChange={onChange}
                placeholder={placeholder || label}
                name={name}
                id={name}
                className={"form-control"+ (error && " is-invalid")}
            />
            {error && (
                <p className='invalid-feedback'>{error}</p>
            )}
        </div>
     );
}
 
export default FieldImg;