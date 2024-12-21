import React, { useState, useEffect } from 'react';

function StockFilter({ onFilter, reset }) {
    const [isChecked, setIsChecked] = useState(false);


    useEffect(() => {
        if (!reset) {
            setIsChecked(false); 
        }
    }, [reset]);

    const handleChange = (event) => {
        const newChecked = event.target.checked;
        setIsChecked(newChecked); 
        onFilter(newChecked);  
    };

    return (
        <div className="form-check form-switch">
            <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={isChecked}
                onChange={handleChange}  
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                Fuera de stock
            </label>
        </div>
    );
}

export default StockFilter;
