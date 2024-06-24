import { useState, useCallback, ChangeEvent } from "react";
import { api } from "../../../../shared/clients/APIClient";
import { useFileContext } from "../../context/FileProvider";
import { debounce } from "lodash";

const SearchFile = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { dispatch } = useFileContext();

  const handleInputChange = useCallback(
    debounce(async (value: string) => {
      try {
        const response = await api.get(`/file?term=${value}`);
        if (response.status === 200) {
          dispatch({ type: "SET_FILES", payload: response.data });
        }
      } catch (error) {
        console.error(error);
      }
    }, 300),
    []
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
    handleInputChange(value);
  };

  return (
    <div className=" bg-white  shadow-md w-full rounded-lg relative">
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="w-full ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none w-full">
          <svg
            className="w-4 h-4 text-gray-500 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="table-search"
          className="block w-full h-10 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for items"
          value={searchQuery}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchFile;
