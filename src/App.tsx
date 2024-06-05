import './App.css'
import HeatMap from "./components/MapComponent.tsx";
import {useEffect, useState} from "react";
import {convertDataForHighcharts, fetchAllWaterDataPages} from "./utils.ts";

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
        <div style={{width: "50vw"}}>
            <h1>Heatmap</h1>
            <HeatMap data={temperatureData}/>
        </div>
    )
}

export default App;
