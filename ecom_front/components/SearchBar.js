import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SearchBar({ show }) {
  const [title, setTitle] = useState("");
  const [searchdata, setSearchData] = useState([]);
  const router = useRouter();

  const handleInputChange = (ev) => {
    const inputValue = ev.target.value;
    setTitle(inputValue);
    if (inputValue) {
      console.log(inputValue);
      axios.get("/api/search?productname=" + inputValue).then((response) => {
        setSearchData(response.data);
        console.log(response.data);
      });
    }
  };

  function handleSearch(ev) {
    ev.preventDefault();
    if (title) {
      router.push("/search?productname=" + title);
    } else {
      return;
    }
  }

  return (
    <>
      {show && (
        <div className="container mx-auto">
          <div className="pt-2 absolute z-10 mx-auto left-2 transition-all top-16 shadow-sm text-gray-600">
            <div className="">
              <div className="inline-flex flex-col justify-center relative text-gray-500">
                <form className="relative" onSubmit={handleSearch}>
                  <input
                    type="search"
                    className="p-2 pl-8 w-60 rounded border border-gray-200 bg-white-200"
                    name="search"
                    placeholder="Search"
                    value={title}
                    onChange={handleInputChange}
                  />
                  <button
                    type="submit"
                    className="absolute py-2 bg-indigo-600 text-white  px-2 rounded"
                  >
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </form>
                {searchdata.length > 0 && (
                  <ul className="bg-white border border-gray-100 w-full mt-2">
                    {searchdata.length > 0 &&
                      searchdata.map((p) => (
                        <li
                          key={p._id}
                          className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900"
                          onClick={() => setTitle(p.title)}
                        >
                          <svg
                            className="absolute w-4 h-4 left-2 top-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <b>{p.title}</b>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
