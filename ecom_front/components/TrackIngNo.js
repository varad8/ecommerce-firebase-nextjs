const uuid = require("uuid");

function generateTrackingNumber() {
  const uniquePart = uuid.v4().replace(/-/g, "").substr(0, 10);
  const trackingNumber = `TN-${uniquePart}`;
  return trackingNumber;
}

export default generateTrackingNumber;
