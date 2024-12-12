import { useEffect, useState } from "react"
import * as ProductsApi from '../../services/api-service'


function ProductDetail ({id}) {
    const [product, setProduct] = useState();

    useEffect(() => {
        ProductsApi.getProduct(id)
            .then((product) => setProduct(product))  
            .catch((error) => console.log(error));
    }, [id]);


    if(!product) {
        return null;
    } else {
        return (
            product.name
        )
    }
   
}

export default ProductDetail