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
    <div className="container carbon-interface">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-6 sm:p-10 rounded-3xl bg-lime-green mb-4 overflow-hidden">
        <div className="text-left mb-4 sm:mb-0">
          <h2 className="text-my-black font-semibold text-2xl sm:text-4xl lg:text-5xl mb-7">
            Carbon Interface
          </h2>
          <p className="text-my-black font-bold text-sm sm:text-base lg:text-lg">
            Calculate the emissions of your purchase
          </p>
          <p className="text-my-black text-sm">
            The Carbon Interface calculates and visualizes carbon<br></br>{" "}
            emissions, helping users make more sustainable choices.
          </p>
        </div>
        <div className="text-right flex flex-wrap items-center justify-center ">
          <img
            src={carbonLogo}
            alt="carbonLogo"
            className="mb-2"
            style={{ width: "80px", maxWidth: "80px" }}
          />
          <h2 className="text-my-black font-semibold text-3xl sm:text-5xl lg:text-7xl">
            {totalEstimate}g
          </h2>
        </div>
      </div>

      {/* Description */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
        <div className="p-6 sm:p-8 lg:p-9 rounded-3xl bg-lime-green flex justify-between items-center overflow-hidden sm:flex-wrap">
          <h5 className="text-dark-green font-semibold text-sm sm:text-base truncate">
            PACKAGES KILOS
          </h5>
          <div className="flex items-center space-x-2">
            <p className="text-dark-green sm:text-2xl font-semibold truncate">
              {weightProducts.toFixed(2)}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-package text-dark-green"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="40"
              height="40"
              strokeWidth="1"
            >
              <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"></path>
              <path d="M12 12l8 -4.5"></path> <path d="M12 12l0 9"></path>
              <path d="M12 12l-8 -4.5"></path> <path d="M16 5.25l-8 4.5"></path>
            </svg>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-9 rounded-3xl bg-lime-green flex justify-between items-center overflow-hidden sm:flex-wrap">
          <h5 className="text-dark-green font-semibold text-sm sm:text-base truncate">
            STORES
          </h5>
          <div className="flex items-center space-x-2">
            <p className="text-xl sm:text-2xl font-semibold text-dark-green truncate">
              {storesArray.length}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-building-store text-dark-green"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="40"
              height="40"
              strokeWidth="1"
            >
              <path d="M3 21l18 0"></path>
              <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4"></path>
              <path d="M5 21l0 -10.15"></path> <path d="M19 21l0 -10.15"></path>
              <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4"></path>
            </svg>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-9 rounded-3xl bg-lime-green flex justify-between items-center overflow-hidden sm:flex-wrap">
          <h5 className="text-dark-green text-sm font-semibold truncate">
            AVERAGE KM
          </h5>
          <div className="flex items-center space-x-2">
            <p className="text-xl sm:text-2xl font-semibold text-dark-green truncate">
              {Math.round(
                storesArray.reduce(
                  (acc, store) => acc + store.distanceToMadrid,
                  0
                ) / storesArray.length || 0
              )}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-ruler-2 text-dark-green"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19.875 12c.621 0 1.125 .512 1.125 1.143v5.714c0 .631 -.504 1.143 -1.125 1.143h-15.875a1 1 0 0 1 -1 -1v-5.857c0 -.631 .504 -1.143 1.125 -1.143h15.75z" />
              <path d="M9 12v2" />
              <path d="M6 12v3" />
              <path d="M12 12v3" />
              <path d="M18 12v3" />
              <path d="M15 12v2" />
              <path d="M3 3v4" />
              <path d="M3 5h18" />
              <path d="M21 3v4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Transport */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="p-6 sm:p-8 rounded-3xl bg-lime-green flex flex-col items-center">
          <img
            src={trainCarbon}
            alt="Train"
            className="mb-5 w-[150px] h-[150px] object-contain"
            style={{ flexShrink: 0 }}
          />
          <p className="text-my-black font-semibold">
            {transportData.train.km} Km | {transportData.train.g}
          </p>
        </div>
        <div className="p-6 sm:p-8 rounded-3xl bg-lime-green flex flex-col items-center">
          <img
            src={planeCarbon}
            alt="Plane"
            className="mb-5 w-[150px] h-[150px] object-contain"
            style={{ flexShrink: 0 }}
          />
          <p className="text-my-black font-semibold">
            {transportData.plane.km} Km | {transportData.plane.g}
          </p>
        </div>
        <div className="p-6 sm:p-8 rounded-3xl bg-lime-green flex flex-col items-center">
          <img
            src={shipCarbon}
            alt="Ship"
            className="mb-5 w-[150px] h-[150px] object-contain"
            style={{ flexShrink: 0 }}
          />
          <p className="text-my-black font-semibold">
            {transportData.ship.km} Km | {transportData.ship.g}
          </p>
        </div>
        <div className="p-6 sm:p-8 rounded-3xl bg-lime-green flex flex-col items-center">
          <img
            src={truckCarbon}
            alt="Truck"
            className="mb-5 w-[150px] h-[150px] object-contain"
            style={{ flexShrink: 0 }}
          />
          <p className="text-my-black font-semibold">
            {transportData.truck.km} Km | {transportData.truck.g}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CarbonInterface;
