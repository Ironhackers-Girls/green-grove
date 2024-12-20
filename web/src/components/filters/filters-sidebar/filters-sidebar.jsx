import { useEffect, useState } from "react";
import CheckBoxFilter from "../checkbox-filter";

function FiltersSideBar({ onFilters }) {
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState({ min: null, max: null });
  const [size, setSize] = useState([]);
  const [style, setStyle] = useState([]);
  const [store, setStore] = useState([]);
  const [material, setMaterial] = useState([]);
  const [stock, setStock] = useState(true);
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
  }, [category, price, size, style, store, material, stock, rating]);

  const handleCategoryFilter = (category) => {
    setCategory(category);
  };

  const handleMaterialFilter = (material) => {
    setMaterial(material);
  };

  const handleSizeFilter = (size) => {
    setSize(size);
  };

  const handleStoreFilter = (store) => {
    setStore(store);
  };

  const handleStyleFilter = (style) => {
    setStyle(style);
  };


  const handleResetFilters = () => {
    setCategory([]);
    setStore([]);
    setMaterial([]);
    setSize([]);
    setStyle([]);
  };

  return (
    <div className="d-flex flex-column">
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
          filters={["XS", "S", "L", "M", "X", "XXL","One Size"]}
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
        <button className="btn btn-primary" onClick={handleResetFilters}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default FiltersSideBar;
