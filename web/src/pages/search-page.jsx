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
      <h3 className="fs-1">Resultados para "{query}"</h3>
      <div className="container text-center">
        <div className="row">
          <div className="col-12">
            <SearchList filters={search} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
