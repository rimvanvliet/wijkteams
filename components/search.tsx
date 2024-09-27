'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useDebouncedCallback} from "use-debounce";

import styles from './search.module.css'
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemText,
    Paper,
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import React, {useEffect} from "react";
import {MarkerData} from "@/data/markerData";

export default function Search({markerData}: { markerData: MarkerData[] }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const [categories, setCategories] = React.useState<string[]>([]);
    const [query, setQuery] = React.useState<string>('');

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const categoriesParams = params.get('categories')
        if (!categoriesParams?.length) {
            setCategories([])
        } else {
            setCategories(JSON.parse(categoriesParams));
        }
        const queryParams = params.get('query')
        if (!queryParams?.length) {
            setQuery('')
        } else {
            setQuery(queryParams);
        }
    }, [])

    const handleSearch = (term: string) => {
        if (term) {
            setQuery(term)
        } else {
            setQuery('')
        }
        updateSearchParam(term)
    }

    const updateSearchParam = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
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
        const params = new URLSearchParams(searchParams);
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
        if (categories.length > 0) {
            params.set('categories', JSON.stringify(categories));
        } else {
            params.delete('categories');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const setFocusOnMarker = (markerName: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('query', markerName);
        setQuery(markerName)
        replace(`${pathname}?${params.toString()}`);
    }

    const isChecked = (category: string): boolean => {
        const params = new URLSearchParams(searchParams);
        const categoryParams = params.get('categories')
        if (categoryParams === null) return true;
        else return !categoryParams.includes(category);
    }

    return (
        <>
            <FormGroup className={styles.formGroup}>
                <FormControlLabel
                    control={<Checkbox
                        checked={isChecked('bewonersinitiatieven')}
                        onChange={updateBewonersinitieven}/>}
                    label={<span className={styles.listItem}>Bewonersinitiatieven</span>}/>
                <FormControlLabel
                    control={<Checkbox
                        checked={isChecked('locaties')}
                        onChange={updateLocaties}/>}
                    label={<span className={styles.listItem}>Locaties</span>}/>
                <FormControlLabel
                    control={<Checkbox
                        checked={isChecked('activiteiten')}
                        onChange={updateActiviteiten}/>}
                    label={<span className={styles.listItem}>Activiteiten</span>}/>
                <FormControlLabel
                    control={<Checkbox
                        checked={isChecked('themas')}
                        onChange={updateThemas}/>}
                    label={<span className={styles.listItem}>Thema&apos;s</span>}/>
            </FormGroup>

            <Paper
                component="form"
                sx={{p: '2px 4px', display: 'flex', alignItems: 'center'}}
            >
                <InputBase
                    className={styles.inputSearch}
                    placeholder={"Zoek ..."}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                    value={query || ''}
                />
                <IconButton
                    type="button" sx={{p: '10px'}}
                    onClick={() => {handleSearch('')}}
                    aria-label="Maak zoekveld leeg">
                    <ClearIcon/>
                </IconButton>
            </Paper>

            <p className={styles.numFound}>Aantal gevonden {markerData.length}</p>

            <Paper
                component="form"
                sx={{p: '2px 4px', display: 'flex', alignItems: 'center'}}
            >
                <List
                    dense
                    className={styles.listContainer}>
                    {markerData.map((marker) => (
                        <ListItem key={marker.id}>
                            <ListItemText
                                className={styles.listItem}
                                onClick={() => setFocusOnMarker(marker.name)}
                                primary={`(${marker.category.slice(0,1).toUpperCase()}) ${marker.name}`}
                                secondary={marker.description ? marker.description : ''}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </>
    );
}
