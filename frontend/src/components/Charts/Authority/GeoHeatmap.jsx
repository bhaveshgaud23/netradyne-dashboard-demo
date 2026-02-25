import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";

function HeatLayer({ alerts }) {
  const map = useMap();

  useEffect(() => {
    if (!alerts || alerts.length === 0) return;

    // Convert alerts into heatmap format
    const heatData = alerts
      .filter(
        (alert) =>
          alert.gpsData &&
          alert.gpsData.length > 0 &&
          alert.gpsData[0].latitude &&
          alert.gpsData[0].longitude
      )
      .map((alert) => {
        const lat = alert.gpsData[0].latitude;
        const lng = alert.gpsData[0].longitude;

        // Weight by severity
        const weight = alert.details?.severity
          ? alert.details.severity / 3
          : 0.2;

        return [lat, lng, weight];
      });

    const heatLayer = L.heatLayer(heatData, {
      radius: 25,
      blur: 20,
      maxZoom: 17,
    });

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [alerts, map]);

  return null;
}

function GeoHeatmap({ alerts }) {
  return (
    <div className="chart-card">
      <h3>Geographic Risk Heatmap</h3>

      <MapContainer
        center={[22.9734, 78.6569]} // India Center
        zoom={5}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <HeatLayer alerts={alerts} />
      </MapContainer>
    </div>
  );
}

export default GeoHeatmap;