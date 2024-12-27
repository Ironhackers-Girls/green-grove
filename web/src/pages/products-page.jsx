import FiltersSideBar from "../components/filters/filters-sidebar/filters-sidebar";
import ProductList from "../components/products/product-list/product-list";
import { useState } from "react";

function ProductsPage() {
  const [filters, setFilters] = useState({});

  const handleFilters = (filters) => {
    setFilters(filters);
    //comentario
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
