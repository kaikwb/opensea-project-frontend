import {convertDataForHighcharts, fetchAllWaterDataPages, interpolateIntegerPoints} from "./utils";

interface WorkerData {
    apiUrl: string;
    year: number;
    depth: number;
    pageSize: number;
    username: string;
    password: string;
    dataVariable: string;
}

onmessage = async function(event: MessageEvent<WorkerData>) {
    const { apiUrl, year, depth, pageSize, username, password, dataVariable } = event.data;

    try {
        const data = await fetchAllWaterDataPages(
            {
                apiUrl,
                year,
                depth,
                pageSize,
                username,
                password
            }
        );

        const convertedData = convertDataForHighcharts(data, dataVariable) as number[][];
        const interpolatedData = interpolateIntegerPoints(convertedData);

        postMessage(interpolatedData);
    } catch (error) {
        console.error('Error fetching data:', error);

        postMessage([]);
    }
};
