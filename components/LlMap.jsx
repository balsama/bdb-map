import { TileLayer, MapContainer, GeoJSON, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

// Function to determine color based on license type
function getLicenseColor(licenseType) {
    switch (true) {
        case licenseType.includes("Retail"):
            return "#A1E3F9"; // Red for Type A
        case licenseType.includes("CV7 All"):
            return "#DE3163"; // Green for Type B
        case licenseType.includes("CV7"):
            return "#E195AB"; // Blue for Type C
        case licenseType.includes("BYOB"):
            return "#88ff00"; // Blue for Type C
        default:
            return "#FFEFC8"; // Yellow for other license types
    }
}

function onEachFeature(feature, layer) {
    // Add popup or interaction if needed
}

// Function to dynamically adjust marker size and color
function style(feature) {
    const radius = 2; // Smaller size for the marker
    const licenseType = feature.properties.license_type;
    const fillColor = getLicenseColor(licenseType); // Get color based on license_type

    return {
        radius: radius, // Adjust marker size
        fillColor: fillColor, // Dynamic color based on license_type
        color: "#f8efef", // Border color
        weight: 25, // Border width
        opacity: 0.04, // Border opacity
        fillOpacity: 0.8, // Fill opacity
    };
}

function getPopupContent(feature) {
    if (feature.properties.dba_name) {
        name = feature.properties.dba_name;
    }
    else {
        name = feature.properties.business_name;
    }
    return <p><strong>{name}</strong><br/>{feature.properties.license_type}</p>;
}

const LlMap = () => {
    const points = require('json-loader!../data/lgj.geojson'); // Assuming the correct path for your geojson file

    return (
        <MapContainer
            center={[42.342567, -71.076073]}
            zoom={13} // Adjust zoom as needed
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%", backgroundColor: "#232323", color: "#000" }}
        >
            <TileLayer
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />

            <GeoJSON
                onEachFeature={onEachFeature}
            >
                {points.features.map((feature, idx) => {
                    if (feature.geometry.type === "Point") {
                        // Get the coordinates of the point
                        const coords = feature.geometry.coordinates;
                        const markerStyle = style(feature);

                        return (
                            <CircleMarker
                                key={idx}
                                center={[coords[1], coords[0]]} // [latitude, longitude]
                                radius={markerStyle.radius}
                                pathOptions={{
                                    fillColor: markerStyle.fillColor,
                                    color: markerStyle.color,
                                    weight: markerStyle.weight,
                                    opacity: markerStyle.opacity,
                                    fillOpacity: markerStyle.fillOpacity,
                                }}
                            >
                                <Popup>
                                    {getPopupContent(feature)}
                                </Popup>
                            </CircleMarker>
                        );
                    }
                    return null; // Skip non-point features
                })}
            </GeoJSON>

        </MapContainer>
    );
};

export default LlMap;
