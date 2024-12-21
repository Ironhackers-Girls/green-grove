import { useEffect, useState } from "react";
import Slider from '@mui/material/Slider';

function PriceFilter({ onFilter, reset }) {
    const [value, setValue] = useState([0, 100]);

    useEffect(() => {
        if (reset) {
            setValue([0, 100]); 
        }
    }, [reset]);

    const handleChange = (_, newValue) => {
      setValue(newValue); 
      onFilter(newValue); 
    };

    return (
        <div>
            <h6>Price Range</h6>
            <Slider
                getAriaLabel={() => 'Price range'}
                value={value} 
                onChange={handleChange} 
                valueLabelDisplay="auto" 
                valueLabelFormat={(value) => `$${value}`} 
                min={0} 
                max={100}
            />
            <div className="slider-values">
                <span>Min: ${value[0]}</span> 
                <span>Max: ${value[1]}</span>
            </div>
        </div>
    );
}

export default PriceFilter;
