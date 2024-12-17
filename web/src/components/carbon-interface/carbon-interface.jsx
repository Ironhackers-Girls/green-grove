import { useEffect, useState } from "react";
import * as CarbonApi from "../../services/carbon-services"; 

function CarbonInterface({ productsCartToCarbon }) {
  const [estimate, setEstimate] = useState([]);
  const [storesArray, setStoresArray] = useState([]);
  const [totalEstimate, setTotalEstimate] = useState(0); 


  useEffect(() => {
    const newStoresArray = [];

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
          transportMethod: product.store.transport_method,
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
    });
    setStoresArray(newStoresArray);
  }, [productsCartToCarbon]); 

  // useEffect(() => {
  //   if (storesArray.length > 0) {
  //     Promise.all(
  //       storesArray.map((store) =>
  //         CarbonApi.getEstimate(store)
  //           .then((response) => ({
  //             storeName: store.name,
  //             estimateData: response.data,
  //           }))
  //       )
  //     )
  //       .then((responses) => {
  //         setEstimate(responses); 
  //       })
  //       .catch((error) => {
  //         console.error("Error al obtener las estimaciones:", error);
  //       });
  //   }
  // }, [storesArray]); 

  useEffect(() => {
    let totalEstimates = 0;

    estimate.forEach((estimate) => {
      totalEstimates += estimate.estimateData.data.attributes.carbon_g
    });

    setTotalEstimate(totalEstimates);

  }, [estimate])
  


  return (
    <div>
      <h2>Estimaciones de Carbono</h2>
      <p>estimaciones en g {totalEstimate}</p>
      <pre>{JSON.stringify(estimate, null, 2)}</pre> 
    </div>
  );
}

export default CarbonInterface;



