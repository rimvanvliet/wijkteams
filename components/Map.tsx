'use client'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'

import {useState} from 'react'

import {data} from "@/data/Themas"
import MarkerClusterGroup from "react-leaflet-cluster";

const Map = () => {

    const [coord, setCoord] = useState(new L.LatLng(52.258039790602496, 6.182305555985334))
    const markers = data

    return (
        <div>
            <MapContainer style={{height: '100vh', width: '100vw'}}
                          center={coord}
                          zoom={14}
                          scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup>
                    {markers.map(marker =>
                        <Marker
                            key={marker.id}
                            icon={
                                new L.Icon({
                                    iconUrl: marker.icon,
                                    iconSize: [25, 25],
                                })}
                            position={L.latLng(marker.coordinates[1], marker.coordinates[0])}>
                            <Popup>
                                <div dangerouslySetInnerHTML={{ __html:  marker.name + (marker.description ? ('<br/>'+ marker.description) : ('')) }}/>
                            </Popup>
                        </Marker>)}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    )
}

export default Map