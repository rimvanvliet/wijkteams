'use server';

import {pool} from './db'
import {randomUUID} from "node:crypto";
import {revalidatePath} from "next/cache";

export interface MarkerData {
    id: string,
    category: string,
    name: string,
    description?: string,
    icon: string,
    coordinates: number[]
}

export interface DatabaseMarkerData {
    id: string,
    category: string,
    name: string,
    description?: string,
    icon: string,
    coordinates: { x: number, y: number },
}

export async function insertMarkerData(markerData: MarkerData) {
    try {
        const id = randomUUID()
        await pool.query(
            'INSERT INTO marker_data VALUES\n' +
            `   (\'${id}\', \'${markerData.category}\', \'${markerData.name}\', ` +
            `${markerData.description ? "\'" + markerData.description + "\'" : "NULL"}, ` +
            `\'${markerData.icon}\', point(${markerData.coordinates[0]},${markerData.coordinates[1]}));`
        )
    } catch (error) {
        console.error(error)
    }
}

export async function fetchMarkerData() {
    try {
        const result = await pool.query('SELECT * FROM marker_data ORDER BY name')
        return convertToMarkerData(result.rows);
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function updateMarkerData(markerData: MarkerData) {
    try {
        await pool.query(
            'UPDATE marker_data SET ' +
            '(category, name, description, icon, coordinates) = \n' +
            `   (\'${markerData.category}\', \'${markerData.name}\', ` +
            `${markerData.description ? "\'" + markerData.description + "\'" : "NULL"}, ` +
            `\'${markerData.icon}\', point(${markerData.coordinates[0]},${markerData.coordinates[1]}))\n` +
            `WHERE id = \'${markerData.id}\';`
        )
    } catch (error) {
        console.error(error)
    }
}

export async function deleteMarkerData(markerDataId: string) {
    console.log(`up to deleting ${markerDataId}`);
    try {
        await pool.query(`DELETE
                          FROM marker_data
                          WHERE id = \'${markerDataId}\';`)
    } catch (error) {
        console.error(error)
    }
    console.log(`deleted ${markerDataId}`);
    revalidatePath('/');
}

const convertToMarkerData: (databaseData: DatabaseMarkerData[]) => MarkerData[] =
    (databaseData: DatabaseMarkerData[]) => databaseData.map(marker => {
        return <MarkerData>{
            id: marker.id,
            category: marker.category,
            name: marker.name,
            description: marker.description,
            icon: marker.icon,
            coordinates: [marker.coordinates.x, marker.coordinates.y],
        }
    }
)
