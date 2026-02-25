import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🔥 Custom colored marker creator
const createIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

// 🔥 Severity-based icons
const icons = {
  critical: createIcon("red"),
  moderate: createIcon("orange"),
  warn: createIcon("yellow"),
  info: createIcon("green"),
};

function SeverityMap({ alerts, onSelectAlert }) {
  if (!alerts) return null;

  const getIcon = (severity) => {
    if (severity === 3) return icons.critical;
    if (severity === 2) return icons.moderate;
    if (severity === 1) return icons.warn;
    return icons.info;
  };

  return (
    <div className="live-stream-card">
      <h3>🗺 Live Incident Map</h3>

      <MapContainer
        center={[22.9734, 78.6569]}
        zoom={5}
        style={{ height: "550px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {alerts.map((alert, index) => {
          const gps = alert.gpsData?.[0];
          if (!gps) return null;

          return (
            <Marker
              key={index}
              position={[gps.latitude, gps.longitude]}
              icon={getIcon(alert.details?.severity)}
              eventHandlers={{
                click: () => {
                  if (onSelectAlert) {
                    onSelectAlert(alert);
                  }
                },
              }}
            >
              <Popup>
                <strong>Vehicle:</strong> {alert.vehicle?.vehicleNumber}
                <br />
                <strong>Driver:</strong>{" "}
                {alert.driver?.firstName} {alert.driver?.lastName}
                <br />
                <strong>Type:</strong> {alert.details?.typeDescription}
                <br />
                <strong>Severity:</strong>{" "}
                {alert.details?.severityDescription}
                <br />
                <strong>City:</strong>{" "}
                {alert.details?.location?.city}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default SeverityMap;