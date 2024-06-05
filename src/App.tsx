import './App.css'
import {useEffect, useState} from "react";
import {convertDataForHighcharts, fetchAllWaterDataPages, interpolateIntegerPoints} from "./utils.ts";
import MapChart from "./components/MapChart.tsx";

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

            const interData = interpolateIntegerPoints(temp);

            setTemperatureData(interData);
        });
    }, []);

    return (
        <div style={{width: "50vw"}}>
            <MapChart
                title={'Temperature Heatmap'}
                dataSource={'World Ocean Database IODE'}
                dataSourceUrl={'http://wod.iode.org/'}
                dataSeriesMin={-20}
                dataSeriesMax={40}
                dataSeriesData={temperatureData}
            />
        </div>
    )
}

export default App;
