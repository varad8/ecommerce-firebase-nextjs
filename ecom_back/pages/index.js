import Layout from "@/components/Layout";
import OrderGraph from "@/components/OrderGraph";
import RevenueLine from "@/components/RevenueLine";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react"; // Import useRef
import { Bar } from "react-chartjs-2"; // Import Bar chart from react-chartjs-2

export default function Home() {
  const { data: session } = useSession();
  const [orderData, setOrderData] = useState([0, 0, 0]);
  const [revenuedata, setRevenueData] = useState([]);
  const chartRef = useRef(null); // Create a ref for the chart

  useEffect(() => {
    // Fetch order data for today, weekly, and monthly
    const fetchData = async () => {
      try {
        const response = await fetch("/api/twm");
        if (response.ok) {
          const data = await response.json();
          setOrderData(data);
          console.log(data);

          // Check if the chart instance exists and destroy it
          if (chartRef.current) {
            chartRef.current.destroy();
          }
        } else {
          console.error("Error fetching order data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRevenue = async () => {
      try {
        const response = await fetch("/api/revenue");
        if (response.ok) {
          const data = await response.json();
          setRevenueData(data);
          console.log(data);
        } else {
          console.error("Error Fetching Revenue data");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRevenue();
    fetchData();
  }, []);

  // Define data and options for the Bar chart
  const data = {
    labels: ["Today", "Weekly", "Monthly"],
    datasets: [
      {
        label: "Orders",
        data: orderData,
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: "line", // Specify the x-axis scale type as 'category'
        labels: ["Today", "Weekly", "Monthly"], // Provide the labels for the x-axis
      },
    },
  };

  return (
    <Layout>
      <div>
        <div className="text-blue-900 flex justify-between">
          <h2>Hello, {session?.user?.name}</h2>
          <div className="flex bg-gray-300 text-black gap-1 rounded-lg overflow-hidden">
            <img
              src={session?.user?.image}
              alt={session?.user?.name}
              className="h-6 w-6"
            />
            <span className="px-2">{session?.user?.name}</span>
          </div>
        </div>
        {/* Order Data Graphical Representation */}
        <div className="overflow-auto">
          <OrderGraph data={orderData} />
        </div>
        {/* Revenue */}
        <div className="overflow-auto"></div>
        <RevenueLine data={revenuedata} />
      </div>
    </Layout>
  );
}
