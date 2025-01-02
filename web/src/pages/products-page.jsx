import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FiltersSideBar from "../components/filters/filters-sidebar/filters-sidebar";
import ProductList from "../components/products/product-list/product-list";

function ProductsPage() {
  const [filters, setFilters] = useState({});
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");

    if (category) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        category: [category], 
      }));
    }
  }, [location]);

  const handleFilters = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <>
      <h3 className="text-3xl font-bold text-center mb-6">List Products</h3>
      <div className="max-w-screen mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/5 p-4">
            <FiltersSideBar onFilters={handleFilters} />
          </div>
          <div className="w-full md:w-4/5 p-4">
            <ProductList filters={filters} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
