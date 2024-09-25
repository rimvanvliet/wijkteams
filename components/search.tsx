'use client';

import {useSearchParams, usePathname, useRouter} from 'next/navigation';
import {useDebouncedCallback} from "use-debounce";

import styles from './search.module.css'
import {Checkbox, FormControlLabel, FormGroup, Tooltip} from "@mui/material";
import React, {useEffect} from "react";
import {MarkerData} from "@/data/markerData";

export default function Search({markerData}: { markerData: MarkerData[] }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const [categories, setCategories] = React.useState<string[]>([]);
    const [query, setQuery] = React.useState<string>('');
    const [openTooltip, setOpenTooltipValue] = React.useState<number | undefined>(undefined);


    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (query) {
            params.set('query', query);
        } else {
            params.delete('query');
        }
        if (categories.length > 0) {
            params.set('categories', JSON.stringify(categories));
        } else {
            params.delete('categories');
        }
        replace(`${pathname}?${params.toString()}`);
    }, [query, categories, searchParams, replace, pathname]);

    const handleSearch = useDebouncedCallback((term: string) => {
        setQuery(term)
    }, 300)

    const updateBewonersinitieven = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateCategories(event.target.checked, 'bewonersinitiatieven');
    }

    const updateLocaties = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateCategories(event.target.checked, 'locaties');
    }

    const updateActiviteiten = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateCategories(event.target.checked, 'activiteiten');
    }

    const updateThemas = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateCategories(event.target.checked, 'themas');
    }

    function updateCategories(isChecked: boolean, category: string) {
        if (isChecked) {
            const index = categories.indexOf(category);
            if (index > -1) {
                categories.splice(index, 1)
                setCategories([...categories]);
            }
        } else {
            categories.push(category)
            setCategories([...categories]);
        }
    }

    const createToolTipText = (markerData: MarkerData) => {
        return <>
            (Categorie: {markerData.category})<br/>
            {markerData.name}:<br/>
            {markerData.description ? markerData.description : 'Geen beschrijving beschikbaar'}
        </>
    }

    const toggleClick = (index?: number) => {
        setOpenTooltipValue(openTooltip === index ? undefined : index);
    };


    return (
        <div>
            <FormGroup className={styles.formGroup}>
                <FormControlLabel control={<Checkbox defaultChecked onChange={updateBewonersinitieven}/>}
                                  label="Bewonersinitiatieven"/>
                <FormControlLabel control={<Checkbox defaultChecked onChange={updateLocaties}/>}
                                  label="Locaties"/>
                <FormControlLabel control={<Checkbox defaultChecked onChange={updateActiviteiten}/>}
                                  label="Activiteten"/>
                <FormControlLabel control={<Checkbox defaultChecked onChange={updateThemas}/>}
                                  label="Thema's"/>
            </FormGroup>

            <input
                className={styles.inputSearch}
                placeholder={"Zoek ..."}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />

            <p className={styles.numFound}>Aantal gevonden {markerData.length}</p>

            <ul className={styles.listContainer}>
                {markerData.map((marker, index) => (
                    <li key={marker.id}>
                        <Tooltip
                            placement={"top-start"}
                            title={createToolTipText(marker)}
                            onClose={() => toggleClick(undefined)}
                            open={openTooltip === index}
                            slotProps={{
                                popper: {modifiers: [{name: 'offset', options: {offset: [0, -5],},},],},
                            }}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener>
                            <div onClick={() => toggleClick(index)} className={styles.listItem}>{marker.name}</div>
                        </Tooltip>
                    </li>
                ))}
            </ul>

        </div>
    );
}
