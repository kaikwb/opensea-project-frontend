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
    [key: string]: number | undefined;
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

function convertDataForHighcharts(data: WaterData[], variable: string): (number | undefined)[][] {
    return data
        .filter((item) => item[variable] !== null)
        .map((item) => [item.longitude, item.latitude, item[variable]]);
}

function interpolateIntegerPoints(points: number[][]): number[][] {
    let minLat = Infinity, maxLat = -Infinity;
    let minLon = Infinity, maxLon = -Infinity;

    points.forEach(([lon, lat]) => {
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
        if (lon < minLon) minLon = lon;
        if (lon > maxLon) maxLon = lon;
    });

    const interpolate = (lon: number, lat: number): number => {
        const nearestPoints = points.map(point => {
            const [pLon, pLat] = point;
            const distance = Math.sqrt(Math.pow(pLon - lon, 2) + Math.pow(pLat - lat, 2));
            return {point, distance};
        }).sort((a, b) => a.distance - b.distance);

        const [p1, p2] = nearestPoints;

        const totalDist = p1.distance + p2.distance;
        const p1Weight = (totalDist - p1.distance) / totalDist;
        const p2Weight = (totalDist - p2.distance) / totalDist;

        return p1.point[2] * p1Weight + p2.point[2] * p2Weight;
    };

    const interpolatedPoints: number[][] = [];

    for (let lon = Math.floor(minLon); lon <= Math.ceil(maxLon); lon++) {
        for (let lat = Math.floor(minLat); lat <= Math.ceil(maxLat); lat++) {
            const value = interpolate(lon, lat);
            interpolatedPoints.push([lon, lat, value]);
        }
    }

    return interpolatedPoints;
}

export {fetchAllWaterDataPages, convertDataForHighcharts, interpolateIntegerPoints};