
import { useState } from "react";
import FiltersSideBar from "../components/filters/filters-sidebar/filters-sidebar";
import ProductList from "../components/products/product-list/product-list";
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
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
              className="relative ml-auto flex size-full max-w-xl transform flex-col overflow-y-auto bg-white  shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4 py-4 sticky top-0 z-10 bg-my-white border-b border-my-gray">
                <h2 className="text-lg font-medium text-dark-green">Filters</h2>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md text-dark-green"
                >
                  <span className="sr-only">Close menu</span>
                  <CloseIcon />
                </button>
              </div>
              <FiltersSideBar initialFilters={filters} onFilters={handleFilters} />
              <div className="flex flex-row items-center px-4 py-4 sticky bottom-0 z-10 bg-my-white border-t border-my-gray">
                <button
                  className="ml-auto px-6 py-3 my-0 bg-lime-green text-dark-green text-xs sm:text-sm font-semibold rounded-full hover:bg-dark-green hover:text-white transition-all"
                  onClick={() => {
                    setFilters([]);
                    setFiltersOpen(false);
                  }}
                >
                  Reset
                </button>
              </div>

            </DialogPanel>
          </div>
        </Dialog>
      </div>

      <div className="flex items-baseline justify-between py-4">
        <h1>PRODUCTS</h1>
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="flex flex-row gap-1 items-center text-dark-green px-4 py-2 rounded-full hover:bg-lime-green transition"
        >
          <FilterAltIcon />
          <span>Filters</span>
        </button>
      </div>


      {/* Product List Section */}
      <section>
        <ProductList filters={filters} />
      </section>
    </div>
  );
}

export default ProductsPage;
