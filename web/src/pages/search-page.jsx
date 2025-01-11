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
    <div>
    <div className="flex items-center py-4">
        <h1>Resultados para "{query}"</h1>
      </div>

      <section>
        <SearchList filters={search} />
      </section>
    </div>
  );
}

export default SearchPage;
