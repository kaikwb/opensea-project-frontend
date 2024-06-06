import './App.css'
import {useEffect, useState} from "react";
import {convertDataForHighcharts, fetchAllWaterDataPages, interpolateIntegerPoints} from "./utils.ts";
import MapChart from "./components/MapChart.tsx";

function App() {
    const [temperatureData, setTemperatureData] = useState<number[][]>([]);

    useEffect(() => {
        const waterDataUrl = `${import.meta.env.VITE_API_URL}/water-data`;

        fetchAllWaterDataPages({
            apiUrl: waterDataUrl,
            year: 2022,
            depth: 0,
            pageSize: 10000,
            username: import.meta.env.VITE_API_USERNAME,
            password: import.meta.env.VITE_API_PASSWORD
        }).then((data) => {
            const temp = convertDataForHighcharts(data, "temperature") as number[][];

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
