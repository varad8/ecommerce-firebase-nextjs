import FooterPage from "@/components/Footer";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function TrackOrderPage() {
  const router = useRouter();
  const trackingno = router.query.id;
  const [orderTrackData, setOrderTrackData] = useState("");
  const [searchingData, setSearchingData] = useState(true);
  const [productInfo, setProductInfo] = useState([]);

  //Match option
  const optionsForDelivery = {
    pending: "/assets/order_pending.mp4",
    dispatched: "/assets/order_dispatched.mp4",
    shipped: "/assets/order_shipped.mp4",
    "on the way": "/assets/order_on_the_way.mp4",
    cancelled: "/assets/order_cancelled.mp4",
    "out for delivery": "/assets/out_for_delivery.mp4",
    delivered: "/assets/product_delivered.mp4",
  };

  useEffect(() => {
    if (!trackingno) {
      return;
    }

    setSearchingData(true); // Set searching state to true while fetching data

    axios.get("/api/orders?trackingno=" + trackingno).then((response) => {
      setOrderTrackData(response.data);
      console.log(response.data);

      if (response.data?._id) {
        const productids = response.data.productIds.map((item, index) => {
          return item; // Collect product ids
        });

        // Now you have an array of product ids
        console.log(productids);

        axios
          .get("/api/products?productids=" + productids.toString())
          .then((response) => {
            setProductInfo(response.data);
            console.log(response.data);
            setSearchingData(false);
          });
      } else {
        setSearchingData(false); // Set searching state back to false if no order data
        setOrderTrackData(0);
        setProductInfo(0);
      }
    });
  }, [trackingno]);

  return (
    <div>
      <Header />
      <div className="min-h-screen mx-auto">
        {/* When Loading Show Loading Video */}
        {searchingData && (
          <div className="flex justify-center items-center h-screen">
            <img className="h-28 w-28" src="/assets/trackorder.gif" />
          </div>
        )}

        {/* Tracking Data Not Found */}
        {orderTrackData.length < 0 && (
          <div className="flex justify-center items-center">
            <div className="p-3 bg-red-300 border border-red-500 text-red-700">
              Tracking Data Not Found
            </div>
          </div>
        )}

        {/* When got data then set */}
        {productInfo && orderTrackData && (
          <div className="container mx-auto">
            <h1 className="font-bold mt-2 mb-2 text-xl text-left ml-2">
              Tracking Order Status
            </h1>
            <div className="flex flex-wrap justify-center">
              {/* Product BOX Component */}
              <div className="w-full lg:w-1/2 p-4">
                <ProductBox
                  productInfo={productInfo}
                  orderTrackData={orderTrackData}
                />
              </div>

              <div className="w-full lg:w-1/2 p-4">
                {
                  <div className="border rounded p-4">
                    <h1 className="text-xl font-bold mt-2  mb-2">
                      Order Status
                    </h1>

                    {/* Show Video According to deliver_status */}

                    <ul className="w-full h-50 overflow-y-auto">
                      {orderTrackData.order_status.map((status, index) => (
                        <>
                          <li key={index}>
                            {status.date} | {status.status}
                          </li>
                          <div className="border-b mt-2 mb-2"></div>
                        </>
                      ))}
                    </ul>
                  </div>
                }
              </div>
            </div>
          </div>
        )}

        {/* Show Status and Video */}
        <div className="container mx-auto">
          <h1 className="font-bold mt-2 mb-2 text-xl text-left ml-2">
            Tracking Delivery Status
          </h1>
          {orderTrackData && (
            <div className="flex flex-wrap justify-center items-center">
              <div className="w-full lg:w-1/2 p-4">
                {/* {orderTrackData?.deliver_staus} */}
                <div className="flex justify-center">
                  <div className="p-4 border rounded-sm w-fit">
                    <video autoPlay loop muted className="w-48 h-48">
                      <source
                        src={optionsForDelivery[orderTrackData?.deliver_staus]}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-4">
                <h2 className="text-center lg:text-left text-green-900 rounded px-6 py-2 border border-green-900 bg-green-100">
                  {orderTrackData?.deliver_staus}
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>
      <FooterPage />
    </div>
  );
}
