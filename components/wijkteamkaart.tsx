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
    const DisplayVoorstad = () => {
        const map = useMap();
        var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
        svgElement.setAttribute('viewBox', "0 0 169 70");
        svgElement.innerHTML = `  <path
     fill="#73b2ff"
     fill-opacity="0.5"
     stroke="#000000"
     stroke-opacity="1"
     stroke-width="1"
     stroke-linecap="butt"
     stroke-linejoin="miter"
     stroke-miterlimit="4"
     d="m 52.499997,53.5 -5,-4 -4,-3 -1,-1 -3,-2 h -1 l -1,-1 -4,-1 -5,-3 v -1 0 0 h -1 v 0 0 0 0 0 L 24.5,35.5 l -1,-1 -2,-2 h -1 v 0 0 0 0 0 0 0 l -3,-3 -1,-1 -3,-3 -2,-2 -2,-3 -1,-2 -2,-3 -1,-2 -2,-2 -1,-3 -1,-3 v 0 h -1 v 0 0 0 1 -1 0 0 0 0 0 0 0 -1 0 0 0 0 0 0 0 h 1 1 l 1,-1 v 0 h 1 v 0 0 0 0 0 0 -1 0 0 0 0 1 0 0 0 0 0 0 0 0 0 h 1 v 0 0 0 h -1 v 0 0 0 0 l 1,-1 v 0 0 0 0 h 1 v 0 0 h 1 v 0 0 h 1 v 0 0 0 h 1 v 0 h 1 v 0 h 1 v 0 0 0 0 h 1 v 0 0 0 h 2 v 0 0 h 1 v 0 0 0 h 1 v 0 0 0 1 0 h 1 v 0 0 0 h 1 v 0 l 1,1 v 0 h 1 v 0 h 1 v 0 0 0 0 1 0 0 0 h 1 v 0 0 0 h 1 v 1 0 0 h 1 v 0 0 0 l 1,1 v 0 0 0 0 0 0 0 0 0 0 0 0 h 0.999997 v 1 0 0 -1 0 0 0 0 0 0 0 0 0 0 0 l 1,1 v 0 0 l 1,0.9999999 v 0 0 0 h 1 v 0 0 0 0 0 0 0 0 0 0 0 h 1 v 0 0 0 0 0 0 0 V 10.5 v 0 0 0 0 0 0 0 0 1 h 1 v 0 0 l 1,1 v 0 0 0 0 0 0 0 0 l 1,1 v 0 0 h 1 v 0 1 0 0 h 1 v 0 0 0 h 1 v 0 1 0 0 h 1 v 0 0 0 0 1 h 1 v 0 0 0 0 0 0 0 0 l 1,1 v 0 h 1 v 0 l 1,1 v 0 0 l 2,1 v 0 0 0 h 1 l 1,1 v 0 l 1,1 h 1 v 0 0 0 l 1,1 v 0 0 h 1 v 0 1 h 1 v 0 0 0 0 0 0 0 0 0 0 0 0 0 h 1 v 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 h 1 v 0 l 5,3 v 0 0 h 1 v 0 0 l 2,2 3,2 3,3 v 0 l 2,1 h -1 v 0 0 0 0 0 h 1 v 0 0 0 0 0 0 0 1 0 0 0 0 0 l 1,1 1,-1 8,-8 v 0 0 0 l -1,-1 v 0 0 0 0 l 1,-1 v 0 0 0 0 0 0 0 0 0 0 h 1 v 0 0 0 -1 0 0 0 0 0 0 l -1,-1 v 0 0 0 0 0 l 4,-4 1,-1 v 0 0 0 0 h 1 v 0 -1 0 l 1,-1 v 0 0 0 0 -1 0 0 0 -1 0 0 h 1 v 0 0 0 0 0 0 0 h 1 v 0 0 0 0 0 -1 l -1,-1 V 9.4999999 0.5 h 1 v 0 h 1 l 10,6 v 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 l 1.999993,-1 h 3 l 2,8 h 1 l 1,1 13,-1 v 6 0 0 0 l 10,1 3,2 h 1 v 0 0 0 0 l 4,3 h 1 l 1,-1 2,-2 h 2 1 v 0 0 h 1 v 0 h 1 v 0 0 0 0 l 1,1 v 0 h 1 v 0 l 1,1 2,2 v 0 0 h 1 v 0 1 h 5 v -1 h 1 v 0 1 0 h 1 l 7,2 v 0 0 h 1 v 0 0 0 0 0 1 0 0 0 h -1 v 1 0 0 0 0 0 0 h -1 v 1 l -3,6 -2,2 -2,4 -5,9 -3,3 -7,4 -3,2 -5,2 -2,-2 -3,-3 -1,-2 -3,-3 -3,-3 -2,-1 -2,-2 -3,-1 -4,-2 -3,-1 -3,-1 h -3 -2 -3 -0.999993 l -2,1 h -1 -2 l -3,1 -3,1 -3,1 -4,1 -4,2 -3,2 -1,3 v 0 0 0 0 0 0 -1 -2 l -5,1 h -3 l -3,1 -3,-1 -3,-1 h -2 v -1 0 0 0 0 0 0 0 z"
     stroke-dasharray="none"
     dojoGfxStrokeStyle="solid"
     fill-rule="evenodd"
     id="path1"
     style="display:inline" />`;
        var blaat1  = new L.LatLng(52.25, 6.167)
        var blaat2  = new L.LatLng(52.26, 6.19)
        var svgElementBounds = L.latLngBounds(blaat1, blaat2)
        L.svgOverlay(svgElement, svgElementBounds).addTo(map);

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
            {/*<DisplayVoorstad/>*/}
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