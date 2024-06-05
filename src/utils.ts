type Pageable = {
    pageNumber: number;
    pageSize: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
};

type ApiResponse = {
    totalPages: number;
    totalElements: number;
    pageable: Pageable;
    size: number;
    content: never[];
    number: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    first: boolean;
    last: boolean;
    numberOfElements: number;
    empty: boolean;
};

type FetchAllPagesParameters = {
    apiUrl: string;
    year: number;
    depth: number;
    pageSize: number;
    username?: string;
    password?: string;
};

interface LatLng {
    lat: number;
    lng: number;
    temp: number;
}

type WaterData = {
    depth: number;
    id: number;
    latitude: number;
    longitude: number;
    year: number;
    oxygen?: number;
    ph?: number;
    phosphate?: number;
    salinity?: number;
    silicate?: number;
    temperature?: number;
};

async function fetchAllWaterDataPages(
    {
        apiUrl,
        year,
        depth,
        pageSize,
        username,
        password
    }: FetchAllPagesParameters): Promise<never[]> {
    const headers = new Headers();
    if (username && password) {
        const credentials = btoa(`${username}:${password}`);
        headers.append('Authorization', `Basic ${credentials}`);
    }

    let allData: never[] = [];
    let currentPage = 0;
    let totalPages: number;

    do {
        const response = await fetch(`${apiUrl}?year=${year}&depth=${depth}&page=${currentPage}&size=${pageSize}`, {headers});
        const data: ApiResponse = await response.json();

        allData = allData.concat(data.content);
        totalPages = data.totalPages;
        currentPage++;

    } while (currentPage < totalPages);

    return allData;
}

function convertDataForHighcharts(data: WaterData[], variable: string): number[][] {
    return data
        .filter((item) => item[variable] !== null)
        .map((item) => [item.longitude, item.latitude, item[variable]]);
}

function interpolatePoints(data: number[][], resolution: number): number[][] {
    const interpolatedData: number[][] = [];

    for (let i = 0; i < data.length - 1; i++) {
        const start = data[i];
        const end = data[i + 1];

        const deltaX = (end[0] - start[0]) / resolution;
        const deltaY = (end[1] - start[1]) / resolution;
        const deltaZ = (end[2] - start[2]) / resolution;

        for (let j = 0; j < resolution; j++) {
            interpolatedData.push([start[0] + j * deltaX, start[1] + j * deltaY, start[2] + j * deltaZ]);
        }
    }

    return interpolatedData;
}

function normalizeData(data: number[][]): number[][] {
    const max = Math.max(...data.map((item) => item[2]));
    const min = Math.min(...data.map((item) => item[2]));

    return data.map((item) => [item[0], item[1], (item[2] - min) / (max - min)]);
}

export {fetchAllWaterDataPages, convertDataForHighcharts, interpolatePoints, normalizeData};