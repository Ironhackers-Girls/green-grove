import { useState } from "react";
import FiltersSideBar from "../components/filters/filters-sidebar/filters-sidebar";
import ProductList from "../components/products/product-list/product-list";
import {   Dialog,  DialogBackdrop,  DialogPanel } from '@headlessui/react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';

function ProductsPage() {
  const [filters, setFilters] = useState({});
  const [FiltersOpen, setFiltersOpen] = useState(false);

  const handleFilters = (filters) => {
    setFilters(filters);
  };

  return (
    <div className="bg-white">
      <div>
        <Dialog
          open={FiltersOpen}
          onClose={() => setFiltersOpen(false)}
          className="relative z-40"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <CloseIcon />
                </button>
              </div>
              <FiltersSideBar onFilters={handleFilters} />
            </DialogPanel>
          </div>
        </Dialog>
      </div>

      <main className="mx-auto">
        <div className="flex sm:px-4 lg:px-7 items-baseline justify-between pt-6">
          <h1 className="text-4xl font-bold font-montserrat tracking-tight text-gray-900">PRODUCTS</h1>

          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="ml-4 p-2 text-gray-400 hover:text-gray-500"
            >
              <span >Filters</span>
              <FilterAltIcon />
            </button>
          </div>
        </div>

        {/* Product List Section */}
        <section className="pb-6 pt-6">
          <ProductList filters={filters} />
        </section>
      </main>
    </div>
  );
}

export default ProductsPage;
