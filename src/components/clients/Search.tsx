import "./Search.scss";
import { BsSearch } from "react-icons/bs";
import { fetchClientSearch } from "../../store/features/clientsSlice";
import { useRef } from "react";
import { useAppDispatch } from "../../store/store";

const Search = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    if (searchRef.current?.value.trim() === "") {
      return;
    } else {
      const searchValue = searchRef.current?.value || "";

      dispatch(fetchClientSearch(searchValue));
    }
  };

  return (
    <div className="search">
      <input ref={searchRef} placeholder="Hledat..." />
      <BsSearch onClick={handleSearch} />
    </div>
  );
};

export default Search;
