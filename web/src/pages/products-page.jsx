import { useState } from "react";
import FiltersSideBar from "../components/filters/filters-sidebar/filters-sidebar";
import ProductList from "../components/products/product-list/product-list";
import { Dialog, DialogTitle, DialogActions, DialogContent, Menu, MenuItem, IconButton, Button } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

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
          maxWidth="sm"
          fullWidth
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 1300, 
          }}
        >
          <DialogTitle>Filters</DialogTitle>
          <DialogContent>
            <FiltersSideBar onFilters={handleFilters} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFiltersOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        <main className="mx-auto sm:px-4 lg:px-7">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
            <h1 className="text-4xl font-bold font-montserrat tracking-tight text-gray-900">PRODUCTS</h1>

            <div className="flex items-center">
              <IconButton
                className="ml-4 p-2 text-gray-400 hover:text-gray-500"
                onClick={() => setFiltersOpen(true)}
              >
                <FilterAltIcon />
              </IconButton>
            </div>
          </div>

          {/* Product List Section */}
          <section className="pb-6 pt-6">
            <ProductList filters={filters} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default ProductsPage;
