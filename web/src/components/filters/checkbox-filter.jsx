import { useEffect, useState } from "react";

function CheckBoxFilter({ filters, onFilter, reset, children }) {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (reset) {
      setSelected([]);
    }
  }, [reset]);

  const handleCheckboxChange = (element) => {
    if (selected.includes(element)) {
      setSelected(selected.filter((item) => item !== element));
    } else {
      setSelected([...selected, element]);
    }
  };

  useEffect(() => {
    onFilter(selected);
  }, [selected]);

  return (
    <div>
      <h6>{children}</h6>
      {filters.map((filter) => (
        <div className="form-check" key={filter}>
          <input
            className="form-check-input"
            type="checkbox"
            value={filter}
            id={filter}
            checked={selected.includes(filter)}
            onChange={() => handleCheckboxChange(filter)}
          />
          <label className="form-check-label" htmlFor={filter}>
            {filter}
          </label>
        </div>
      ))}
    </div>
  );
}

export default CheckBoxFilter;
