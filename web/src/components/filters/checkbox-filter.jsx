import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function CheckBoxFilter({ filters, onFilter, reset, children }) {
  const [selected, setSelected] = useState([]);

  // Efecto para reiniciar el estado cuando se recibe un 'reset' a true
  useEffect(() => {
    if (reset) {
      setSelected([]); // Resetea los checkboxes seleccionados
    }
  }, [reset]);

  // Maneja los cambios en los checkboxes
  const handleCheckboxChange = (filter) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(filter)) {
        return prevSelected.filter((item) => item !== filter); // Desmarca el checkbox
      } else {
        return [...prevSelected, filter]; // Marca el checkbox
      }
    });
  };

  // Pasar los filtros seleccionados a la función onFilter
  useEffect(() => {
    onFilter(selected);
  }, [selected, onFilter]);

  return (
    <Disclosure key={children} as="div" className="border-t border-gray-200 px-4 py-6">
      <h3 className="-mx-2 -my-3 flow-root">
        <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
          <span className="font-medium text-gray-900">{children}</span>
          <span className="ml-6 flex items-center">
            <AddIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
            <RemoveIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />
          </span>
        </DisclosureButton>
      </h3>
      <DisclosurePanel className="pt-6">
        <div className="space-y-6">
          {filters.map((filter) => (
            <div key={filter} className="flex gap-3">
              <div className="flex h-5 shrink-0 items-center">
                <div className="group grid size-4 grid-cols-1">
                  <input
                    id={filter}
                    name={filter}
                    type="checkbox"
                    checked={selected.includes(filter)} // Checkbox controlado
                    onChange={() => handleCheckboxChange(filter)} // Maneja el cambio
                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                  />
                  <svg
                    fill="none"
                    viewBox="0 0 14 14"
                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                  >
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 group-has-[:checked]:opacity-100"
                    />
                    <path
                      d="M3 7H11"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 group-has-[:indeterminate]:opacity-100"
                    />
                  </svg>
                </div>
              </div>
              <label
                htmlFor={filter}
                className="min-w-0 flex-1 text-gray-500"
              >
                {filter}
              </label>
            </div>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export default CheckBoxFilter;
