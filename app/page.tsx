import React from "react";
import dynamic from 'next/dynamic'

import {fetchMarkerData, MarkerData} from "@/data/markerData"

import styles from './page.module.css'

const DynamicWijkteamkaart = dynamic(() => import('../components/wijkteamkaart'), {
    ssr: false
});
const DynamicSearch = dynamic(() => import('../components/search'), {
    ssr: false
});

const markerData = await fetchMarkerData();

export default async function Home({searchParams,}: { searchParams?: { query?: string; categories?: string[]; }; }) {

    const queryTokens = searchParams?.query || '';
    const categories: string[] = searchParams?.categories || [];

    const filterMarkerData: (queryTokenString: string) => MarkerData[] = (queryTokenString: string) => {
        return markerData?.filter(marker => {
                return (categories.length === 0 || !categories.includes(marker.category)) &&
                    queryTokenString.split(' ')
                        .map(token =>
                            (marker.name.toLowerCase().includes(token.toLowerCase()) ||
                                marker.id.toLowerCase() === (token.toLowerCase()) ||
                                marker.description?.toLowerCase().includes(token.toLowerCase()) || false))
                        .reduce((acc: boolean, value: boolean): boolean => {
                            return acc && value
                        });
            }
        )
    }

    const filteredMarkerData = filterMarkerData(queryTokens)

    return (
        <main className={styles.main}>
            <div className={styles.sidePanel}>
                <h1 className={styles.mainHeader}>WijkTeam Voorstad</h1>
                <DynamicSearch markerData={filteredMarkerData}/>
            </div>
            <DynamicWijkteamkaart markerData={filteredMarkerData}/>
        </main>
    )
}
