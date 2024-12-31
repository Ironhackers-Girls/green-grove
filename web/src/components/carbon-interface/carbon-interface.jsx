import { useEffect, useState } from "react";
import * as CarbonApi from "../../services/carbon-services";
import trainCarbon from "../../assets/train-carbon.svg";
import planeCarbon from "../../assets/plane-carbon.svg";
import shipCarbon from "../../assets/ship-carbon.svg";
import truckCarbon from "../../assets/truck-carbon.svg";
import carbonLogo from "../../assets/carbon-logo.svg";

function CarbonInterface({ productsCartToCarbon }) {
  const [estimate, setEstimate] = useState([]);
  const [storesArray, setStoresArray] = useState([]);
  const [totalEstimate, setTotalEstimate] = useState(0);
  const [weightProducts, setWeightProducts] = useState(0);
  const [transportData, setTransportData] = useState({
    truck: { km: 0, g: 0 },
    train: { km: 0, g: 0 },
    plane: { km: 0, g: 0 },
    ship: { km: 0, g: 0 },
  });

  useEffect(() => {
    const newStoresArray = [];
    let totalWeight = 0;

    // Agrupamos productos por tienda
    productsCartToCarbon.forEach((product) => {
      let storeFound = false;

      newStoresArray.forEach((store) => {
        if (product.store.name === store.name) {
          storeFound = true;
          store.totalWeight += product.weight * product.quantity;
          store.totalQuantity += product.quantity;
          store.products.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
          });
        }
      });

      if (!storeFound) {
        newStoresArray.push({
          name: product.store.name,
          location: product.store.location,
          transportMethod: product.store.location.transport_method,
          totalWeight: product.weight * product.quantity,
          weightUnit: product.weight_unit,
          totalQuantity: product.quantity,
          distanceToMadrid: product.store.location.distance_to_madrid,
          distanceUnit: product.store.location.distance_unit,
          products: [
            {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: product.quantity,
            },
          ],
        });
      }

      // Acumulamos el peso total de los productos
      totalWeight += product.weight * product.quantity;
    });

    // Convertimos el peso total de gramos a kilos (dividiendo entre 1000)
    const totalWeightInKilos = totalWeight / 1000;

    setStoresArray(newStoresArray);
    setWeightProducts(totalWeightInKilos);
  }, [productsCartToCarbon]);

  // useEffect(() => {
  //   if (storesArray.length > 0) {
  //     Promise.all(
  //       storesArray.map((store) =>
  //         CarbonApi.getEstimate(store).then((response) => ({
  //           storeName: store.name,
  //           estimateData: response.data,
  //           transportMethod: store.transportMethod,
  //         }))
  //       )
  //     )
  //       .then((responses) => {
  //         setEstimate(responses);
  //         console.log("Listo:", responses);
  //       })
  //       .catch((error) => {
  //         console.error("Error al obtener las estimaciones:", error);
  //       });
  //   }
  // }, [storesArray]);

  useEffect(() => {
    let totalEstimates = 0;
    let updatedTransportData = { ...transportData };

    estimate.forEach((estimate) => {
      totalEstimates += estimate.estimateData.data.attributes.carbon_g;
      switch (estimate.transportMethod) {
        case "train":
          updatedTransportData.train.g +=
            estimate.estimateData.data.attributes.carbon_g;
          updatedTransportData.train.km +=
            estimate.estimateData.data.attributes.distance_value;
          break;

        case "truck":
          updatedTransportData.truck.g +=
            estimate.estimateData.data.attributes.carbon_g;
          updatedTransportData.truck.km +=
            estimate.estimateData.data.attributes.distance_value;
          break;
        case "ship":
          updatedTransportData.ship.g +=
            estimate.estimateData.data.attributes.carbon_g;
          updatedTransportData.ship.km +=
            estimate.estimateData.data.attributes.distance_value;
          break;
        case "plane":
          updatedTransportData.plane.g +=
            estimate.estimateData.data.attributes.carbon_g;
          updatedTransportData.plane.km +=
            estimate.estimateData.data.attributes.distance_value;
          break;
      }
    });

    setTransportData(updatedTransportData);

    setTotalEstimate(totalEstimates);
  }, [estimate]);

  return (
    <div className="container carbon-interface bg-light-green">
      {/* Header */}
      <div className="flex justify-between items-center p-10 rounded bg-lime-green  mb-4">
        <div className="text-left">
          <h2 className="text-dark font-bold text-xl ">Carbon Interface</h2>
          <p className="text-dark">Calcula las emisiones de tu compra</p>
        </div>
        <div className="text-right flex items-center">
          <img
            src={carbonLogo}
            alt="Tren"
            className="mb-2"
            style={{ width: "80px" }}
          />
          <h2 className="text-dark font-bold text-4xl">{totalEstimate}g</h2>
        </div>
      </div>

      {/* Description */}
      <div className="grid grid-cols-sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="p-4 rounded  bg-lime-green flex justify-between items-center overflow-hidden">
          <h5 className="text-dark font-medium text-sm sm:text-base">
            Paquetes a Enviar
          </h5>
          <div className="flex items-center space-x-2">
            <p className="text-2xl font-bold text-dark">
              {productsCartToCarbon.length}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-package text-success"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 3l8 4l-8 4l-8 -4z" />
              <path d="M4 7v10l8 4l8 -4v-10" />
              <line x1="12" y1="7" x2="12" y2="21" />
            </svg>
          </div>
        </div>

        <div className="p-4 rounded  bg-lime-green flex justify-between items-center overflow-hidden">
          <h5 className="text-dark font-medium text-sm sm:text-base">
            Tiendas
          </h5>
          <div className="flex items-center space-x-2">
            <p className="text-2xl font-bold text-dark">{storesArray.length}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-building-store text-success"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 21l18 0" />
              <path d="M4 21v-10l-1 -2v-1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v1l-1 2v10h-4v-6a1 1 0 0 0 -1 -1h-6a1 1 0 0 0 -1 1v6h-4z" />
              <path d="M10 21l0 -9h4l0 9" />
            </svg>
          </div>
        </div>

        <div className="p-4 rounded  bg-lime-green flex justify-between items-center overflow-hidden">
          <h5 className="text-dark font-medium text-sm sm:text-base">
            Media de Kilómetros a Realizar
          </h5>
          <div className="flex items-center space-x-2">
            <p className="text-2xl font-bold text-dark">
              {(
                storesArray.reduce(
                  (acc, store) => acc + store.distanceToMadrid,
                  0
                ) / storesArray.length || 0
              ).toFixed(2)}{" "}
              Km
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-ruler-2 text-success"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 21l18 -18" />
              <path d="M12 10l-2 -2" />
              <path d="M10 12l-2 -2" />
              <path d="M16 6l-2 -2" />
              <path d="M14 8l-2 -2" />
              <path d="M20 4l-2 -2" />
              <path d="M18 6l-2 -2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Transport */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded  bg-lime-green flex flex-col items-center">
          <img
            src={trainCarbon}
            alt="Tren"
            className="mb-2"
            style={{ width: "200px" }}
          />
          <h6 className="text-dark">Tren</h6>
          <p className="text-dark">00 Km | 00 G</p>
        </div>
        <div className="p-4 rounded bg-lime-green flex flex-col items-center">
          <img
            src={planeCarbon}
            alt="Avión"
            className="mb-2"
            style={{ width: "200px" }}
          />
          <h6 className="text-dark">Avión</h6>
          <p className="text-dark">00 Km | 00 G</p>
        </div>
        <div className="p-4 rounded  bg-lime-green flex flex-col items-center">
          <img
            src={shipCarbon}
            alt="Barco"
            className="mb-2"
            style={{ width: "200px" }}
          />
          <h6 className="text-dark">Barco</h6>
          <p className="text-dark">00 Km | 00 G</p>
        </div>
        <div className="p-4 rounded  bg-lime-green flex flex-col items-center">
          <img
            src={truckCarbon}
            alt="Camión"
            className="mb-2"
            style={{ width: "200px" }}
          />
          <h6 className="text-dark">Camión</h6>
          <p className="text-dark">
            {transportData.truck.km} Km | {transportData.truck.g}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CarbonInterface;
