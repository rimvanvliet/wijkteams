'use client'
import React, {useEffect} from "react";

import L from 'leaflet'
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from 'react-leaflet'
import MarkerClusterGroup from "react-leaflet-cluster";

import 'leaflet/dist/leaflet.css'
import styles from './wijkteamkaart.module.css'

import {MarkerData} from "@/data/markerData";

const Wijkteamkaart = ({markerData,}: { markerData: MarkerData[] }) => {
    const initialCenter = new L.LatLng(52.258039790602496, 6.182305555985334)
    const [center, setCenter] = React.useState(initialCenter)
    const [zoomLevel, setZoomLevel] = React.useState(14)

    useEffect(() => {
        if (markerData.length === 1) {
            setCenter(L.latLng(markerData[0].coordinates[1], markerData[0].coordinates[0]))
            setZoomLevel(15)
        } else {
            setCenter(initialCenter)
            setZoomLevel(14)
        }
    }, [markerData])

    const RecenterAutomatically = () => {
        const map = useMap();
        useEffect(() => {
            map.setView(center, zoomLevel);
        }, [center, zoomLevel]);
        return null;
    }

    const AltClickLocator = () => {
        const mapEvent = useMapEvents({
            click: (event) => {
                if (event.originalEvent.altKey) {
                    mapEvent.locate()
                    console.log('event', event.latlng)
                }
            },
        })
        return null
    }

    return (
        <MapContainer
            className={styles.container}
            center={center}
            zoom={zoomLevel}
            scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup
                showCoverageOnHover={false}
            >
                {markerData.map(marker =>
                    <Marker
                        key={marker.id}
                        icon={
                            new L.Icon({
                                iconUrl: marker.icon,
                                iconSize: [25, 25],
                            })}
                        position={L.latLng(marker.coordinates[1], marker.coordinates[0])}>
                        <Popup>
                                <span
                                    dangerouslySetInnerHTML={{__html: '(' + marker.category + ')<br/>' + marker.name + (marker.description ? ('<br/>' + marker.description) : (''))}}/>
                        </Popup>
                    </Marker>)}
            </MarkerClusterGroup>
            <RecenterAutomatically/>
            <AltClickLocator/>
        </MapContainer>
    )
}

export default Wijkteamkaart