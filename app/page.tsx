import React from "react";
import dynamic from 'next/dynamic'

const DynamicWijkteamkaart = dynamic(() => import('../components/wijkteamkaart'), {
    ssr: false
});

import {MarkerData, markerData} from "@/data/markerData"

export default function Home() {

    const filteredMarkerData: (querystring: string) => MarkerData[] = (querystring: string) => {
        return markerData
            .filter(marker =>
                marker.name.includes(querystring) || marker.description?.includes(querystring)
            )
    }

    return (
        <main>
            <DynamicWijkteamkaart markerData={filteredMarkerData('2023')}/>
        </main>
    )
}
