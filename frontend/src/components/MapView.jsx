import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ 2️⃣ ICON DEFINITIONS (OUTSIDE COMPONENT)

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const orangeIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// ✅ 3️⃣ HELPER FUNCTION (OUTSIDE COMPONENT)

const getSeverityIcon = (severity) => {
  if (severity === 3) return redIcon;
  if (severity === 2) return orangeIcon;
  return greenIcon;
};

// ✅ 4️⃣ MAP COMPONENT

const MapView = ({ alerts }) => {
  return (
    <MapContainer
      center={[22.9734, 78.6569]} // India center
      zoom={5}
      style={{ height: "500px", width: "100%", marginTop: "20px" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {alerts.map((alert, index) => {
        const latitude = alert.gpsData?.[0]?.latitude;
        const longitude = alert.gpsData?.[0]?.longitude;
        const severity = alert.details?.severity;

        if (!latitude || !longitude) return null;

        return (
          <Marker
            key={index}
            position={[latitude, longitude]}
            icon={getSeverityIcon(severity)}
          >
            <Popup>
              <div>
                <strong>Vehicle:</strong> {alert.vehicle.vehicleNumber} <br />
                <strong>VIN:</strong> {alert.vehicle.vin} <br />
                <strong>Severity:</strong> {alert.details.severityDescription}{" "}
                <br />
                <strong>City:</strong> {alert.details.location.city}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapView;
