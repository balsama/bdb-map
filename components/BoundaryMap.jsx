import {TileLayer, MapContainer, GeoJSON} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

function onEachFeature(feature, layer) {
    var neighborhood = feature.properties.Name;
    var popupContent = '<p><strong>' + neighborhood + ': within Big Day Boston boundary.</strong></p>';
    layer.bindTooltip(popupContent);
}

function style(feature) {
    return {
        fillColor: '#fb4e42',
        weight: 2,
        opacity: 0.6,
        color: '#0d1f2f',
        fillOpacity: 0.6
    };
};

const BoundaryMap = () => {

    let buildings = require('json-loader!../public/bdb-neighborhoods.geojson');


    return (
        <MapContainer
            center={[42.364768, -71.054369]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%", backgroundColor: "#232323", color: "#000" }}
        >

            <TileLayer
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
            <GeoJSON
                data={buildings}
                style={style}
                onEachFeature={onEachFeature}
            />

        </MapContainer>
    );
};

export default BoundaryMap;