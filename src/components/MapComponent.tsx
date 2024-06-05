import React, {useCallback, useRef, useState} from 'react';
import {GoogleMap, HeatmapLayer, Libraries, useJsApiLoader} from '@react-google-maps/api';
import {normalizeData} from "../utils.ts";

const GOOGLE_API_KEY = 'YOUR_API_KEY';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: -23.55052,
    lng: -46.633308
};

type HeatMapProps = {
    data: number[][];
};

function HeatMap({data}: HeatMapProps) {
    const [libraries] = useState<Libraries>(['visualization']);

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_API_KEY || '',
        libraries: libraries
    });

    const mapRef = useRef<google.maps.Map | null>(null);

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
    }, []);

    const onUnmount = useCallback(() => {
        mapRef.current = null;
    }, []);

    const normalizedData = normalizeData(data);

    const heatmapData = normalizedData.map(point => ({
        location: new google.maps.LatLng(point[1], point[0]),
        weight: point[2]
    }));

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <HeatmapLayer data={heatmapData} options={{radius: 5, opacity: 0.6, maxIntensity: 1, dissipating: true}}/>
        </GoogleMap>
    ) : <></>;
}

export default React.memo(HeatMap);
