import { useState } from "react";
import * as GeoApi from "../../services/geo-services";

function DistanceInput({ onGeoUser }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const geo = await GeoApi.getGeo(inputValue);
      console.log("Datos recibidos de la API:", geo);
      onGeoUser(geo);
    } catch (error) {
      console.log("Error en la solicitud HTTP:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group flex-nowrap">
        <span className="input-group-text" id="addon-wrapping">
          Address
        </span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="addon-wrapping"
        />
        <button type="submit">Send</button>
      </div>
    </form>
  );
}

export default DistanceInput;
