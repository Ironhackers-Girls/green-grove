import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchList from "../components/search/search-list";

function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const [search, onSearch] = useState({})

  useEffect(() => {
    const filters = {
      name: [query],
      style: [query],
      category: [query],
    };

    onSearch(filters);
  }, [query]);

  return (
    <>
      <h3 className="text-3xl font-semibold text-center mb-6">Resultados para "{query}"</h3>
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full">
            <SearchList filters={search} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
