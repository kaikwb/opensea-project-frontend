import './App.css'
import Layout from "./components/Layout/Layout.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import About from "./pages/About/About.tsx";
import Home from "./pages/Home/Home.tsx";

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
