import {TileLayer, MapContainer, GeoJSON} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

function onEachFeature(feature, layer) {
    if (feature.properties.frank) {
        var description = feature.properties.description;
        var address = feature.properties.address;
        var popupContent = '<strong>' + address + '</strong>:<br/>' + description;
        layer.bindTooltip(popupContent, {direction: 'auto', offset: [0, 0], permanent: false});
    }
}

function style(feature) {
    if (feature.properties.frank) {
        return {
            fillColor: '#fb4e42',
            weight: 1,
            opacity: 0.6,
            color: '#0d1f2f',
            fillOpacity: 0.6
        };
    }
    return {
        fillColor: 'black',
        weight: 1,
        opacity: 0.1,
        color: 'gray',
        fillOpacity: 0.4
    };
}

const FrankMap = () => {

    let buildings = require('json-loader!../data/ne_buildings.geojson');


    return (
        <MapContainer
            center={[42.363806, -71.054320]}
            zoom={20}
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

export default FrankMap;