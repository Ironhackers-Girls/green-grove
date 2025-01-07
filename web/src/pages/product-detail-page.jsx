import { useState, useEffect } from 'react';
import StarIcon from "@mui/icons-material/Star";
import { Radio, RadioGroup } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import * as ProductsApi from '../services/products-services';

function ProductDetailPage({ onAddCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    ProductsApi.getProduct(id)
      .then((productData) => setProduct(productData))
      .catch((error) => console.log(error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleProductAddCart = (product) => {
    ProductsApi.addCart(product.id)
      .then(() => console.log('Product added to cart'))
      .catch((error) => console.log(error));
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  const reviews = product.reviews || [];

  return (
    <div className="bg-white">
      {/* Contenedor general de la Galería y la Información */}
      <div className="mt-6 mx-auto px-6 lg:grid lg:grid-cols-3 lg:gap-x-8">

        {/* Galería de imágenes */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {/* Imagen principal */}
          <img
            alt={product.images[0].url}
            src={product.images[0].url}
            className="rounded-lg object-cover w-full h-full col-span-2 row-span-1"
          />

          {/* Otras imágenes */}
          <div className="col-span-2 grid grid-cols-2 gap-4 mt-4">
            {product.images.slice(1).map((image, index) => (
              <img
                key={index}
                alt={image.url}
                src={image.url}
                className="rounded-lg object-cover w-full h-full col-span-2 row-span-1"
              />
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div className="sticky top-24 max-h-screen overflow-y-auto">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>
          <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>

          {/* Reseñas */}
          <div className="mt-6">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    aria-hidden="true"
                    className={classNames(
                      product.rating > rating ? 'text-gray-900' : 'text-gray-200',
                      'size-5 shrink-0'
                    )}
                  />
                ))}
              </div>
              <p className="sr-only">{product.rating} out of 5 stars</p>
              <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {reviews.length} reviews
              </a>
            </div>
          </div>

          {/* Opciones */}
          <div className="mt-10">
            {/* Colores */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <fieldset aria-label="Choose a color" className="mt-4">
                <RadioGroup value={product.swatches[0]} onChange={() => { }} className="flex items-center gap-x-3">
                  {product.swatches.map((swatch) => (
                    <Radio
                      key={swatch.colorCode}
                      value={swatch}
                      aria-label={swatch.colorName}
                      className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                    >
                      <span
                        aria-hidden="true"
                        className={classNames('bg-' + swatch.colorCode, 'size-8 rounded-full border')}
                      />
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>

            {/* Tallas */}
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <fieldset aria-label="Choose a size" className="mt-4">
                <RadioGroup className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                  {product.available_sizes.map((size) => (
                    <Radio key={size} value={size} className="cursor-pointer bg-white text-gray-900">
                      <span>{size}</span>
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>

            {/* Añadir al carrito */}
            <button
              type="button"
              onClick={() => handleProductAddCart(product)}
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700"
            >
              Add to bag
            </button>
          </div>

          {/* Descripción y detalles */}
          <div className="py-10">
            <h3 className="sr-only">Description</h3>
            <p className="text-base text-gray-900">{product.description}</p>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Materials</h3>
              <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                {product.materials.map((material, index) => (
                  <li key={index} className="text-gray-400">
                    <span className="text-gray-600">{material}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
