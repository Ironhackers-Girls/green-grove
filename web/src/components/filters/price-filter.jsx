import Slider from '@mui/material/Slider';

function PriceFilter({ onFilter, selected }) {

    const handleChange = (_, newValue) => {
        onFilter(newValue);
    };

    return (
        <div className="border-t border-gray-200 px-4 py-6">
            <h3 className="-mx-2 -my-3 px-2 py-3 flow-root font-medium text-gray-900">
                Price Range
            </h3>
            <div className="mt-3 px-2">
                <Slider
                    getAriaLabel={() => 'Price range'}
                    value={selected}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `$${value}`}
                    min={0}
                    max={200}
                    sx={{
                        color: "#125548",  
                        '& .MuiSlider-thumb': {
                            height: 20,
                            width: 20,
                            boxShadow: '0 0 2px 0px rgba(0, 0, 0, 0.1)',

                            backgroundColor: '#125548',  
                        },
                        '& .MuiSlider-rail': {
                            backgroundColor: '#e0e0e0',  
                        },
                        '& .MuiSlider-track': {
                            backgroundColor: '#125548', 
                        }
                    }}
                />
                <div className="slider-values font-montserrat flex flex-grow justify-between">
                    <span>Min: ${selected[0]}</span>
                    <span>Max: ${selected[1]}</span>
                </div>
            </div>
        </div>

    );
}

export default PriceFilter;
