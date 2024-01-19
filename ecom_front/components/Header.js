import Link from "next/link";
import { useContext, useState } from "react";
import CategorySlider from "./CategorySlider";
import { CartContext } from "./CartContext";
import SearchBar from "./SearchBar";

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  return (
    <>
      {/*<!-- Header --> */}
      <header className="border-b-1 h-full relative z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[3.3rem] items-stretch justify-between font-medium text-slate-700"
            role="navigation"
          >
            {/*<!-- Brand logo --> */}
            <Link
              id="WindUI"
              aria-label="WindUI logo"
              aria-current="page"
              className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
              href={"/"}
            >
              <img
                className="w-6 h-6"
                src="/assets/shoplogo.png"
                alt="Ecomm Logo"
              />
              Ecommerce
            </Link>
            {/*      <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 block h-8 w-8 self-center lg:hidden ${
                isToggleOpen ? "visible opacity-100 transition-all" : ""
              }`}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <svg
                className="h-full w-full"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isToggleOpen ? (
                  // Close icon (X shape)
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  // Hamburger icon
                  <path
                    d="M4 6H20M4 12H20M4 18H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </button>

            {/*      <!-- Navigation links --> */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute top-0 left-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
              <li role="none" className="flex items-stretch">
                <Link
                  role="menuitem"
                  aria-haspopup="false"
                  tabIndex="0"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:bg-emerald-50 focus:outline-none focus-visible:outline-none lg:px-8"
                  href={"/"}
                >
                  <span>Home</span>
                </Link>
              </li>
              <li role="none" className="flex items-stretch">
                <Link
                  role="menuitem"
                  aria-current="page"
                  aria-haspopup="false"
                  tabIndex="0"
                  className="flex items-center gap-2 py-4  transition-colors duration-300 hover:text-emerald-600 focus:bg-emerald-50 focus:outline-none focus-visible:outline-none lg:px-8"
                  href={"/products"}
                >
                  <span>Products</span>
                </Link>
              </li>
              <li role="none" className="flex items-stretch">
                <Link
                  role="menuitem"
                  aria-haspopup="false"
                  tabIndex="0"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:bg-emerald-50 focus:outline-none focus-visible:outline-none lg:px-8"
                  href={"/categories"}
                >
                  <span>Categories</span>
                </Link>
              </li>
              <li role="none" className="flex items-stretch">
                <Link
                  role="menuitem"
                  aria-haspopup="false"
                  tabIndex="0"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:bg-emerald-50 focus:outline-none focus-visible:outline-none lg:px-8"
                  href={"/account"}
                >
                  <span>Account</span>
                </Link>
              </li>
            </ul>
            {/*      <!-- Actions --> */}
            <div className="ml-auto flex items-center justify-end px-6 lg:ml-0 lg:flex-1 lg:p-0">
              <Link
                href={"/cart"}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-lg text-emerald-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-labelledby="title description"
                  role="graphics-symbol"
                >
                  <title id="title">Cart Icon</title>
                  <desc id="description">Cart icon with items</desc>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 px-1.5 text-sm text-white">
                  {cartProducts?.length}
                </span>
              </Link>

              <button
                onClick={() => setIsSearchBarVisible(!isSearchBarVisible)}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-lg text-emerald-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Category */}

      <CategorySlider />
      {isSearchBarVisible && <SearchBar show={true} />}
    </>
  );
}
