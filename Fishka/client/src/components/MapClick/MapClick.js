import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapClick.scss'
import {HeaderSection} from '../../utils/components';

// Задайте координаты для каждого адреса
const addresses = [
    { address: "9153 Jerry Drive, Juneau", position: [58.3019, -134.4197] },
    { address: "1234 Elm Street, Springfield", position: [39.7817, -89.6501] },
    { address: "5678 Oak Avenue, Metropolis", position: [37.8715, -122.2730] },
    { address: "9101 Maple Lane, Gotham", position: [40.7128, -74.0060] },
    { address: "2468 Pine Road, Star City", position: [37.7749, -122.4194] },
    { address: "1357 Cedar Boulevard, Smallville", position: [38.6270, -90.1994] }
];

// Настройка иконки маркера
const DefaultIcon = L.icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    shadowSize: [41, 41]
});

// Устанавливаем иконку по умолчанию
L.Marker.prototype.options.icon = DefaultIcon;

const AddressList = ({ onAddressClick }) => {
    return (
        <div className="address">
            <HeaderSection textUp={"Location"} textLow={"look for us here"} />
            <div className="list_address">
                {addresses.map((item, index) => (
                    <div key={index} onClick={() => onAddressClick(item)} className="address_line">
                        <span></span>
                        <p className="text_mln_f18_l18">{item.address}</p>
                    </div>

                ))}
            </div>
            
        </div>
    );
};

const MapView = ({ selectedAddress }) => {
    const map = useMap();

    // Перемещение карты к выбранному адресу
    React.useEffect(() => {
        if (selectedAddress) {
            map.flyTo(selectedAddress.position, 12, { animate: true });
        }
    }, [selectedAddress, map]);

    return (
        <Marker position={selectedAddress.position}>
            <Popup>{selectedAddress.address}</Popup>
        </Marker>
    );
};

const MapClick = () => {
    const [selectedAddress, setSelectedAddress] = useState(addresses[0]);

    const handleAddressClick = (address) => {
        setSelectedAddress(address);
    };

    return (
        <div className="mapping"> 
            <AddressList onAddressClick={handleAddressClick} />
            <div className="map">
                <MapContainer center={selectedAddress.position} zoom={12} style={{ height: '100%', width: '100%'}}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MapView selectedAddress={selectedAddress} />
                </MapContainer>
            </div>
        </div>
    );
};

export default MapClick;