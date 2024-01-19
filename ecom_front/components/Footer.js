import Link from "next/link";

export default function FooterPage() {
  return (
    <>
      <footer className="text-gray-600 body-font  bg-slate-900 shadow-sm mt-5">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-indigo-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>

              <span className="ml-3 text-xl text-white">Ecommerce</span>
            </a>
            <p className="mt-2 text-sm text-gray-50">
              Ecommerce of buy anything that you want
            </p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            {/* Repeat this div for each category */}
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-50 tracking-widest text-sm mb-3">
                Main Links
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link
                    href="/policy"
                    className="text-gray-50 hover:text-blue-100"
                  >
                    Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-50 hover:text-blue-100"
                  >
                    T & C
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-gray-50 hover:text-blue-100"
                  >
                    Customer Support
                  </Link>
                </li>
              </nav>
            </div>

            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-50 tracking-widest text-sm mb-3">
                Return/Shipping
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link
                    href="/returnpolicy"
                    className="text-gray-50 hover:text-blue-100"
                  >
                    Return Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-50 hover:text-blue-100"
                  >
                    Change Shipping
                  </Link>
                </li>
              </nav>
            </div>

            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-50 tracking-widest text-sm mb-3">
                Branches
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link
                    href="/mumbai"
                    className="text-gray-50 hover:text-blue-100"
                  >
                    mumbai
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ratnagiri"
                    className="text-gray-50 hover:text-blue-100"
                  >
                    ratnagiri
                  </Link>
                </li>
                <li>
                  <Link
                    href="/delhi"
                    className="text-gray-50 hover:text-blue-100"
                  >
                    delhi
                  </Link>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-slate-700">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-100 text-sm text-center sm:text-left">
              &copy; 2022-23 vrnitsolution —
              <a
                href="https://vrnitsolution.tech"
                rel="noopener noreferrer"
                className="text-gray-100 ml-1"
                target="_blank"
              >
                vrnitsolution.tech
              </a>
            </p>
            <span className="inline-flex text-gray-100 sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              Helpline No +91 xxxxxxxxxx
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
