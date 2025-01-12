import { useEffect, useState } from "react";
import CheckBoxFilter from "../checkbox-filter";
import StockFilter from "../stock-filter";
import PriceFilter from "../price-filter";
import RatingFilter from "../rating-filter";

function FiltersSideBar({ initialFilters, onFilters }) {
  const [category, setCategory] = useState(initialFilters.category || []);
  const [price, setPrice] = useState(initialFilters.price || [0, 200]);
  const [size, setSize] = useState(initialFilters.size || []);
  const [style, setStyle] = useState(initialFilters.style || []);
  const [store, setStore] = useState(initialFilters.store || []);
  const [material, setMaterial] = useState(initialFilters.material || []);
  const [stock, setStock] = useState(initialFilters.stock || false);
  const [rating, setRating] = useState(initialFilters.rating || null);

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

  const handleCategoryFilter = (category) => setCategory(category);
  const handleMaterialFilter = (material) => setMaterial(material);
  const handleSizeFilter = (size) => setSize(size);
  const handleStoreFilter = (store) => setStore(store);
  const handleStyleFilter = (style) => setStyle(style);
  const handleStockFilter = (stock) => setStock(stock);
  const handlePriceFilter = (price) => setPrice(price);
  const handleRatingFilter = (rating) => setRating(rating);

  return (
    <div className="flex flex-col">
      <CheckBoxFilter
        onFilter={handleMaterialFilter}
        selected={material}
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
      <CheckBoxFilter
        onFilter={handleCategoryFilter}
        selected={category}
        filters={[
          "Shirt & Blouses",
          "Cardigans & Jumpers",
          "Dresses & Shirts",
          "Shoes",
          "Jackets & Coats",
          "Accessories",
        ]}
      >
        Category
      </CheckBoxFilter>

      <CheckBoxFilter
        onFilter={handleSizeFilter}
        selected={size}
        filters={["XS", "S", "L", "M", "X", "XXL"]}
      >
        Sizes
      </CheckBoxFilter>

      <CheckBoxFilter
        onFilter={handleStoreFilter}
        selected={store}
        filters={[
          "EcoDesign",
          "Green Style",
          "Nature Creations",
          "Chic Design",
          "Sustainable Design",
          "Creative Eco",
          "Sustained Innovations",
          "Green Craft",
          "Athenian Artistry",
          "Golden Touch Designs",
          "Timeless Creations",
          "Violet Creations"
        ]}
      >
        Stores
      </CheckBoxFilter>

      <CheckBoxFilter
        onFilter={handleStyleFilter}
        selected={style}
        filters={["Night", "Office", "Casual", "Gym", "Formal"]}
      >
        Style
      </CheckBoxFilter>
      <StockFilter onFilter={handleStockFilter} selected={stock}>
        Fuera de Stock
      </StockFilter>

      <PriceFilter
        onFilter={handlePriceFilter}
        selected={price}
      >
        Price
      </PriceFilter>

      <RatingFilter onFilter={handleRatingFilter} selected={rating} />

    </div>
  );
}

export default FiltersSideBar;
