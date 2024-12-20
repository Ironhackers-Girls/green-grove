import FiltersSideBar from "../components/filters/filters-sidebar/filters-sidebar";
import ProductList from "../components/products/product-list/product-list";
import { useEffect, useState } from "react";

function ProductsPage() {
  const [filters, setFilters] = useState({});

  const handleFilters = (filters) => {
    setFilters(filters);
  };

  return (
    <>
      <h3 className="fs-1">List Products</h3>
      <div className="container text-center">
        <div className="row">
          <div className="col-2">
            <FiltersSideBar onFilters={handleFilters} />
          </div>
          <div className="col-10">
            <ProductList filters={filters} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
