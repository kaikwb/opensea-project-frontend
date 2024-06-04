import './App.css'
import MapChart from "./components/MapChart.tsx";
import {convertDataForHighcharts, fetchAllWaterDataPages} from "./utils.ts";
import {useEffect, useState} from "react";

function App() {
    const waterDataUrl = "http://localhost:8080/water-data";
    const [temperatureData, setTemperatureData] = useState<number[][]>([]);

    useEffect(() => {
        fetchAllWaterDataPages({
            apiUrl: waterDataUrl,
            year: 2022,
            depth: 0,
            pageSize: 10000,
            username: "user",
            password: "password"
        }).then((data) => {
            const temp = convertDataForHighcharts(data, "temperature");

            setTemperatureData(temp);
        });
    }, []);

    return (
        <>
            <MapChart
                dataSeriesMin={-20}
                dataSeriesMax={40}
                dataSeriesData={temperatureData}
            />
        </>
    )
}

export default App;
