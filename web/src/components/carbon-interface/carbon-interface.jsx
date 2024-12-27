import { useEffect, useState } from "react";
import * as CarbonApi from "../../services/carbon-services";

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
    <div className="container carbon-interface">
      {/* Header */}
      <div className="flex flex-wrap mb-4 bg-light border rounded shadow-sm p-3">
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-success mb-1">Carbon Interface</h2>
          <p className="text-muted mb-0">Calcula las emisiones de tu compra</p>
        </div>
        <div className="w-full md:w-1/2 flex justify-end items-center">
          <img
            src="/path/to/logo.png"
            alt="Logo"
            className="mr-2"
            style={{ width: "50px" }}
          />
          <h2 className="text-dark mb-0">{totalEstimate}00 g</h2>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-wrap text-center mb-4">
        <div className="w-full md:w-1/3 flex">
          <div className="border rounded shadow-sm p-3 bg-light w-full flex items-center justify-between">
            <h5 className="mb-0">Paquetes a Enviar</h5>
            <div className="flex items-center">
              <p className="display-6 mb-0 mr-2">
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
        </div>
        <div className="w-full md:w-1/3 flex">
          <div className="border rounded shadow-sm p-3 bg-light w-full flex items-center justify-between">
            <h5 className="mb-0">Weight</h5>
            <div className="flex items-center">
              <p className="display-6 mb-0 mr-2">{weightProducts}</p>
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
        </div>
        <div className="w-full md:w-1/3 flex">
          <div className="border rounded shadow-sm p-3 bg-light w-full flex items-center justify-between">
            <h5 className="mb-0">Media de Kilómetros a Realizar</h5>
            <div className="flex items-center">
              <p className="display-6 mb-0 mr-2">
                {(
                  storesArray.reduce(
                    (acc, store) => acc + store.distanceToMadrid,
                    0
                  ) / storesArray.length || 0
                ).toFixed(2)}
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
      </div>

      {/* Transport */}
      <div className="flex flex-wrap text-center">
        <div className="w-1/2 md:w-1/4 flex">
          <div className="border rounded shadow-sm p-3 bg-light w-full flex flex-col items-center justify-center">
            <img
              src="/path/to/image"
              alt="Tren"
              className="mb-2"
              style={{ width: "50px" }}
            />
            <h6>Tren</h6>
            <p>00 Km | 00 G</p>
          </div>
        </div>
        <div className="w-1/2 md:w-1/4 flex">
          <div className="border rounded shadow-sm p-3 bg-light w-full flex flex-col items-center justify-center">
            <img
              src="/path/to/image"
              alt="Avión"
              className="mb-2"
              style={{ width: "50px" }}
            />
            <h6>Avión</h6>
            <p>00 Km | 00 G</p>
          </div>
        </div>
        <div className="w-1/2 md:w-1/4 flex">
          <div className="border rounded shadow-sm p-3 bg-light w-full flex flex-col items-center justify-center">
            <img
              src="/path/to/image"
              alt="Barco"
              className="mb-2"
              style={{ width: "50px" }}
            />
            <h6>Barco</h6>
            <p>00 Km | 00 G</p>
          </div>
        </div>
        <div className="w-1/2 md:w-1/4 flex">
          <div className="border rounded shadow-sm p-3 bg-light w-full flex flex-col items-center justify-center">
            <img
              src="/path/to/image"
              alt="Camión"
              className="mb-2"
              style={{ width: "50px" }}
            />
            <h6>Camión</h6>
            <p>
              {transportData.truck.km} Km | {transportData.truck.g}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarbonInterface;
