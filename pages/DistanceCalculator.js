import React, { useState, useRef } from "react";
import axios from "axios";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const DistanceCalculator = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);

  const originAutocompleteRef = useRef(null);
  const destinationAutocompleteRef = useRef(null);

  const calculateDistance = async () => {
    if (!origin || !destination) {
      alert("Please select both origin and destination.");
      return;
    }

    const apiKey = "AIzaSyDDikb2hvDGOcghVLpige0sLihFQURyhb8"; // Replace with your actual API key
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const result = response.data;

      if (result.rows[0].elements[0].status === "OK") {
        const distanceInMeters = result.rows[0].elements[0].distance.value;
        setDistance(distanceInMeters);
      } else {
        console.error(
          "Error calculating distance: ",
          result.rows[0].elements[0].status
        );
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const onPlaceChanged = (autocomplete, setter) => {
    const place = autocomplete.getPlace();
    if (place && place.geometry) {
      const { lat, lng } = place.geometry.location;
      setter(`${lat()},${lng()}`);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Distance Calculator
      </h2>
      <div className="w-full mb-4">
        <Autocomplete
          onLoad={(autocomplete) =>
            (originAutocompleteRef.current = autocomplete)
          }
          onPlaceChanged={() =>
            onPlaceChanged(originAutocompleteRef.current, setOrigin)
          }
        >
          <input
            type="text"
            placeholder="Enter origin address"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Autocomplete>
      </div>
      <div className="w-full mb-4">
        <Autocomplete
          onLoad={(autocomplete) =>
            (destinationAutocompleteRef.current = autocomplete)
          }
          onPlaceChanged={() =>
            onPlaceChanged(destinationAutocompleteRef.current, setDestination)
          }
        >
          <input
            type="text"
            placeholder="Enter destination address"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Autocomplete>
      </div>
      <button
        onClick={calculateDistance}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Calculate Distance
      </button>
      {distance && (
        <p className="mt-6 text-lg text-gray-700">
          Distance: {(distance / 1000).toFixed(2)} km
        </p>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <div className="p-6">
      <LoadScript
        googleMapsApiKey="AIzaSyDDikb2hvDGOcghVLpige0sLihFQURyhb8" // Replace with your actual API key
        libraries={["places"]} // Ensure this prop is included
      >
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          <Marker position={center} />
        </GoogleMap>

        <DistanceCalculator />
      </LoadScript>
    </div>
  );
}
