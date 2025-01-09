import { useEffect, useState } from "react";
import CheckBoxFilter from "../checkbox-filter";
import StockFilter from "../stock-filter";
import PriceFilter from "../price-filter";
import RatingFilter from "../rating-filter";

function FiltersSideBar({ onFilters }) {
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState([0, 100]);
  const [size, setSize] = useState([]);
  const [style, setStyle] = useState([]);
  const [store, setStore] = useState([]);
  const [material, setMaterial] = useState([]);
  const [stock, setStock] = useState(false);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const filters = {
      category,
      price,
      size,
      style,
      store,
      material,
      stock,
      rating,
    };

    onFilters(filters);

      console.log("En filter side bar:", filters)

  }, [category, price, size, style, store, material, stock, rating]);
  


  
  const handleCategoryFilter = (category) => setCategory(category);
  const handleMaterialFilter = (material) => setMaterial(material);
  const handleSizeFilter = (size) => setSize(size);
  const handleStoreFilter = (store) => setStore(store);
  const handleStyleFilter = (style) => setStyle(style);
  const handleStockFilter = (stock) => setStock(stock);
  const handlePriceFilter = (price) => setPrice(price);
  const handleRatingFilter = (rating) => setRating(rating);

  const handleResetFilters = () => {
    setCategory([]);
    setStore([]);
    setMaterial([]);
    setSize([]);
    setStyle([]);
    setStock(false);
    setPrice([0, 100]);
    setRating(null);
  };

  return (
    <div className="flex flex-col">
      <div className="p-2">Filters side bar</div>
      <div className="p-2">
        <CheckBoxFilter
          onFilter={handleMaterialFilter}
          reset={material.length === 0}
          filters={[
            "Organic Cotton",
            "Plant-Based Dyes",
            "Recycled Denim",
            "Natural Indigo Dye",
            "Organic Hemp",
            "Recycled Polyester",
          ]}
        >
          Materials
        </CheckBoxFilter>
      </div>
      <div className="p-2">
        <CheckBoxFilter
          onFilter={handleCategoryFilter}
          reset={category.length === 0}
          filters={[
            "T-shirt",
            "Shirt",
            "Pants",
            "Shoes",
            "Dress",
            "Accessories",
          ]}
        >
          Category
        </CheckBoxFilter>
      </div>
      <div className="p-2">
        <CheckBoxFilter
          onFilter={handleSizeFilter}
          reset={size.length === 0}
          filters={["XS", "S", "L", "M", "X", "XXL", "One Size"]}
        >
          Sizes
        </CheckBoxFilter>
      </div>
      <div className="p-2">
        <CheckBoxFilter
          onFilter={handleStoreFilter}
          reset={store.length === 0}
          filters={[
            "EcoChic Boutique",
            "GreenThread Apparel",
            "Conscious Couture",
            "Revive Fashion",
            "PureStyle Collective",
            "EarthAura Designs",
          ]}
        >
          Stores
        </CheckBoxFilter>
      </div>
      <div className="p-2">
        <CheckBoxFilter
          onFilter={handleStyleFilter}
          reset={style.length === 0}
          filters={["Night", "Office", "Casual", "Gym", "Formal"]}
        >
          Style
        </CheckBoxFilter>
      </div>
      <div className="p-2">
        <StockFilter onFilter={handleStockFilter} reset={stock}>
          Fuera de Stock
        </StockFilter>
      </div>
      <div className="p-2">
        <PriceFilter
          onFilter={handlePriceFilter}
          reset={price[0] === 0 || price[1] === 100}
        >
          Price
        </PriceFilter>
      </div>
      <div className="p-2">
        <RatingFilter onFilter={handleRatingFilter} reset={rating} />
      </div>
      <div className="p-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleResetFilters}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default FiltersSideBar;
