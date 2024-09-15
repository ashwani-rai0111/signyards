import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";

const Delivery = ({ deliveryTimeline }) => {
  let deliveryText;
  if (deliveryTimeline === "0") {
    deliveryText = "Same Day Delivery";
  } else if (deliveryTimeline === null) {
    deliveryText = "Delivery in 4 days";
  } else {
    deliveryText = `Delivery in ${deliveryTimeline} days`;
  }

  return (
    <div className="flex items-center space-x-2 text-green-600">
      <FontAwesomeIcon icon={faTruck} />
      <span className="text-sm font-medium">{deliveryText}</span>
    </div>
  );
};

export default Delivery;
