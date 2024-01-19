import FooterPage from "@/components/Footer";
import Header from "@/components/Header";
import OrderList from "@/components/OrderList";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function Account() {
  const { data: session } = useSession();
  const [personalInfo, setPersonalInfo] = useState("");

  useEffect(() => {
    axios
      .get("/api/personalinfo?userid=" + session?.user?.id)
      .then((response) => {
        setPersonalInfo(response.data);
      });
  }, [session?.user?.id]);

  const handleProfileEdit = () => {
    // Implement profile editing functionality
  };

  if (session) {
    return (
      <>
        <Header />
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">My Profile</h1>

          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-6 ">
            {/* Profile Information */}
            <div className="border p-4 rounded w-full h-fit">
              <h2 className="text-xl font-semibold mb-2">
                Profile Information
              </h2>
              <div className="flex items-center gap-4 flex-wrap">
                <img
                  className="rounded-full shadow-sm border"
                  src={session?.user.image}
                  alt={session?.user.name}
                />
                <div className="flex flex-col">
                  <p>Name: {session?.user.name}</p>
                  <p>Email: {session?.user.email}</p>
                </div>

                <div className="flex flex-col justify-center items-center ml-20">
                  <div>
                    <button
                      onClick={handleProfileEdit}
                      className="text-blue-600"
                    >
                      Edit Profile
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={handleProfileEdit}
                      className="text-blue-600"
                    >
                      Delete Account{" "}
                    </button>
                  </div>

                  <div>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-lg"
                      onClick={() => signOut()}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="border p-4 rounded break-words">
              <h2 className="text-xl font-semibold mb-2">
                Address Information
              </h2>
              <p>
                <strong>Address:</strong> {personalInfo?.streetaddress} &nbsp;
                {personalInfo?.landmark}&nbsp;
                {personalInfo?.village}&nbsp; {personalInfo?.district}
                &nbsp; {personalInfo?.postalcode}&nbsp;
                {personalInfo?.state}&nbsp; {personalInfo?.country}
              </p>
              <div className="mb-2 mt-3">
                <strong> Shipping Address:</strong>
                <ul>
                  <li>
                    Customer Name: {personalInfo?.shipingaddress?.customername}
                  </li>
                  <li>
                    Customer Email:{" "}
                    {personalInfo?.shipingaddress?.customeremail}
                  </li>
                  <li>
                    Customer Mobile:{" "}
                    {personalInfo?.shipingaddress?.customermobile}
                  </li>
                  <li>
                    Customer Street Address:{" "}
                    {personalInfo?.shipingaddress?.customerstreetaddress}
                  </li>
                  <li>
                    Customer State:{" "}
                    {personalInfo?.shipingaddress?.customerstate}
                  </li>
                  <li>
                    Customer Country:{" "}
                    {personalInfo?.shipingaddress?.customercountry}
                  </li>
                  <li>
                    Customer Postal Code:{" "}
                    {personalInfo?.shipingaddress?.customerpostalcode}
                  </li>
                  <li>
                    Customer Landmark:{" "}
                    {personalInfo?.shipingaddress?.customerlandmark}
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-3 justify-center items-center">
                <Link
                  href={`/account/new`}
                  className="mt-2 text-blue-600 hover:underline"
                >
                  Add Address
                </Link>
                <Link
                  href={`/account/edit/${session?.user?.id}`}
                  className="mt-2 text-blue-600 hover:underline"
                >
                  Edit Addresses
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full mx-auto">
            <h2 className="text-xl font-semibold mb-2">Orders</h2>
            <OrderList userid={session?.user?.id} />
          </div>
        </div>

        <br />

        <FooterPage />
      </>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative bg-white p-8 rounded shadow-md w-72 h-96">
        <div className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full z-10">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-xl font-normal">Hey, Welcome Back</h2>
        <div className="flex flex-col justify-center items-center mt-3 mb-5">
          <img
            src="https://cdn-icons-png.flaticon.com/512/869/869432.png"
            className="h-20 w-20 flex"
            alt="Welcome"
          />
          <p className="text-gray-400 font-normal mt-3">
            For shopping you need have an account.
          </p>
        </div>

        <div className="flex justify-center items-center">
          <div className="bottom-5 absolute">
            <button
              onClick={() => signIn("google")}
              className="bg-white shadow-md p-2 hover:bg-indigo-500 hover:text-white border flex justify-center items-center gap-2 text-gray-700 rounded w-full py-2"
            >
              <img
                className="w-8 h-8 object-center object-contain"
                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                alt="Sign In With Google"
              />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
