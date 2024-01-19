export default function ({ productInfo, orderTrackData }) {
  return (
    <div className="p-6 border rounded-md ">
      <div className="grid grid-cols-2 gap-4">
        {productInfo.map((product) => (
          <div
            key={product._id}
            className="flex flex-col shadow-md justify-center items-center border px-3 py-3"
          >
            <h2 className="text-md font-bold">{product.title}</h2>
            <img
              src={product.images[0]}
              alt={`Image of ${product.title}`}
              className="w-24 h-24 object-cover mt-2"
            />
            <div className="mt-2">
              {Object.entries(product.properties).map(([field, value]) => (
                <p className="text-gray-700" key={field}>
                  {field}: {value}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {orderTrackData && (
        <ul className="grid-cols-1 lg:grid-cols-2 gap-4 mt-4 mb-3 grid w-full">
          {orderTrackData?.line_items?.map((item, index) => (
            <li
              key={index}
              className="flex flex-col shadow-md justify-center items-center border px-3 py-3"
            >
              <p>
                <strong>Product Name:</strong>
                {item.price_data.product_data.name}
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <p>
                <strong>Unit Price:</strong> {item.price_data.unit_amount / 100}{" "}
                {item.price_data.currency}
              </p>
              <div className="border-b w-full mt-2 mb-2"></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
