import './App.css'
import Layout from "./components/Layout/Layout.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import About from "./pages/About/About.tsx";
import Home from "./pages/Home/Home.tsx";

// useEffect(() => {
//     const waterDataUrl = `${import.meta.env.VITE_API_URL}/water-data`;
//
//     fetchAllWaterDataPages({
//         apiUrl: waterDataUrl,
//         year: 2022,
//         depth: 0,
//         pageSize: 10000,
//         username: import.meta.env.VITE_API_USERNAME,
//         password: import.meta.env.VITE_API_PASSWORD
//     }).then((data) => {
//         const temp = convertDataForHighcharts(data, "temperature") as number[][];
//
//         const interData = interpolateIntegerPoints(temp);
//
//         setTemperatureData(interData);
//     });
// }, []);

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App;
