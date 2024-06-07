import {useEffect, useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, Typography} from "@mui/material";
import PagePaper from "../../components/PagePaper/PagePaper.tsx";
import MapChart from "../../components/MapChart.tsx";

interface ChartData {
    title: string;
    dataSeriesName: string;
    dataSeriesMin: number;
    dataSeriesMax: number;
}

interface ChartArgs {
    temperature: ChartData;
    salinity: ChartData;
    oxygen: ChartData;
    phosphate: ChartData;
    silicate: ChartData;
    ph: ChartData;

    [key: string]: ChartData;
}

const chartArgs: ChartArgs = {
    temperature: {
        title: "Temperatura da água em °C",
        dataSeriesName: "Temperatura",
        dataSeriesMin: 5,
        dataSeriesMax: 40
    },
    salinity: {
        title: "Salinidade da água em PSU",
        dataSeriesName: "Salinidade",
        dataSeriesMin: 30,
        dataSeriesMax: 40
    },
    oxygen: {
        title: "Oxigenação da água em µmol/kg",
        dataSeriesName: "Oxigenação",
        dataSeriesMin: 0,
        dataSeriesMax: 400
    },
    phosphate: {
        title: "Fosfato da água em µmol/kg",
        dataSeriesName: "Fosfato",
        dataSeriesMin: 0,
        dataSeriesMax: 2
    },
    silicate: {
        title: "Silicato da água em µmol/kg",
        dataSeriesName: "Silicato",
        dataSeriesMin: 0,
        dataSeriesMax: 20
    },
    ph: {
        title: "pH da água",
        dataSeriesName: "pH",
        dataSeriesMin: 0,
        dataSeriesMax: 14
    }
};

interface DataInformation {
    title: string;
    description: string;
}

interface DataInformationArgs {
    temperature: DataInformation;
    salinity: DataInformation;
    oxygen: DataInformation;
    phosphate: DataInformation;
    silicate: DataInformation;
    ph: DataInformation;

    [key: string]: DataInformation;
}

const dataInformationArgs: DataInformationArgs = {
    temperature: {
        title: "Temperatura",
        description: "A temperatura da água do mar afeta diretamente a fisiologia dos organismos marinhos, a distribuição das espécies e os padrões de migração. Alterações significativas na temperatura, como o aquecimento global, podem levar ao branqueamento dos corais, uma vez que eles expulsam as algas simbióticas necessárias para sua sobrevivência. Espécies sensíveis ao calor podem sofrer estresse térmico, o que resulta em declínios populacionais ou mudanças de habitat. Além disso, a temperatura da água influencia a solubilidade do oxigênio, com águas mais quentes retendo menos oxigênio, exacerbando problemas de oxigenação."
    },
    salinity: {
        title: "Salinidade",
        description: "A salinidade é crucial para a osmose e a regulação dos fluidos nos organismos marinhos. Mudanças na salinidade, causadas por eventos como derretimento de gelo, chuvas intensas ou poluição, podem estressar os organismos, afetando sua capacidade de regular os fluidos corporais. Reduções na salinidade podem afetar espécies de águas salgadas, enquanto aumentos podem impactar organismos de estuários e manguezais. Alterações extremas podem levar à perda de biodiversidade e à degradação dos ecossistemas costeiros."
    },
    oxygen: {
        title: "Oxigenação",
        description: "O oxigênio dissolvido é vital para a respiração dos organismos aquáticos. Níveis baixos de oxigênio (hipóxia) podem resultar em zonas mortas, áreas onde a vida marinha é severamente limitada ou inexistente. Isso pode ocorrer devido à eutrofização, onde o excesso de nutrientes promove o crescimento de algas que, ao morrer, consomem oxigênio durante a decomposição. A hipóxia pode causar a morte em massa de peixes e outros organismos marinhos, afetando cadeias alimentares inteiras e a saúde dos ecossistemas."
    },
    phosphate: {
        title: "Fosfato",
        description: "O fosfato é um nutriente essencial, mas em concentrações excessivas pode levar à eutrofização. O aumento de fosfatos, geralmente proveniente de escoamento agrícola e efluentes industriais, promove o crescimento excessivo de algas (florescimento algal). Quando essas algas morrem e se decompõem, consomem grandes quantidades de oxigênio, resultando em hipóxia. Esse processo pode destruir habitats marinhos, reduzir a biodiversidade e criar zonas mortas."
    },
    silicate: {
        title: "Silicato",
        description: "Os silicatos são necessários para a construção dos esqueletos de organismos como diatomáceas. Alterações nos níveis de silicato podem afetar a produtividade primária dos oceanos, especialmente o crescimento das diatomáceas, que são uma base fundamental da cadeia alimentar marinha. A redução dos silicatos pode limitar o crescimento desses organismos, impactando negativamente a disponibilidade de alimento para espécies superiores, incluindo pequenos peixes e crustáceos."
    },
    ph: {
        title: "pH",
        description: "O pH dos oceanos afeta a solubilidade de minerais como carbonato de cálcio, essencial para a formação de conchas e esqueletos de corais, moluscos e outros organismos marinhos. A acidificação dos oceanos, resultante da absorção de CO₂ atmosférico, reduz o pH e pode levar à descalcificação desses organismos. Isso enfraquece suas estruturas, compromete a saúde dos recifes de corais e altera a dinâmica dos ecossistemas marinhos. A acidificação também pode impactar negativamente a fisiologia e o comportamento de várias espécies marinhas."
    }
}

const sliderMarks = [
    {
        value: 1966,
        label: '1966'
    },
    {
        value: 1970,
        label: '1970'
    },
    {
        value: 1975,
        label: '1975'
    },
    {
        value: 1980,
        label: '1980'
    },
    {
        value: 1985,
        label: '1985'
    },
    {
        value: 1990,
        label: '1990'
    },
    {
        value: 1995,
        label: '1995'
    },
    {
        value: 2000,
        label: '2000'
    },
    {
        value: 2005,
        label: '2005'
    },
    {
        value: 2010,
        label: '2010'
    },
    {
        value: 2015,
        label: '2015'
    },
    {
        value: 2020,
        label: '2020'
    },
    {
        value: 2023,
        label: '2023'
    }
];

function Home() {
    const [data, setData] = useState('temperature');
    const [depth, setDepth] = useState('0');
    const [year, setYear] = useState(2023);
    const [dataPoints, setDataPoints] = useState<number[][]>([]);

    const handleDataChange = (event: SelectChangeEvent) => {
        setData(event.target.value);
    }

    const handleDepthChange = (event: SelectChangeEvent) => {
        setDepth(event.target.value as string);
    }

    const handleYearChange = (_event: Event, newYear: number | number[]) => {
        setYear(newYear as number);
    };

    useEffect(() => {
        const worker = new Worker(new URL('../../dataWorker.ts', import.meta.url), {type: 'module'});

        const apiUrl = `${import.meta.env.VITE_API_URL}/water-data`;
        const apiUsername = import.meta.env.VITE_API_USERNAME;
        const apiPassword = import.meta.env.VITE_API_PASSWORD;

        worker.postMessage({
            apiUrl: apiUrl,
            year: year,
            depth: parseInt(depth),
            pageSize: 10000,
            username: apiUsername,
            password: apiPassword,
            dataVariable: data,
        });

        worker.onmessage = (event: MessageEvent<number[][]>) => {
            setDataPoints(event.data);
            worker.terminate();
        };

        worker.onerror = (error) => {
            console.error("Worker error:", error);
            worker.terminate();
        };

        return () => {
            worker.terminate();
        };
    }, [data, depth, year]);

    useEffect(() => {
        console.log(dataPoints);
    }, [dataPoints]);

    return (
        <PagePaper>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '100%'
                }}
            >
                <Box
                    sx={{
                        flex: '1 1 75%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        pr: 2
                    }}
                >
                    <Box
                        sx={{
                            flex: '1 1 85%',
                            mb: 2
                        }}
                    >
                        <MapChart
                            title={chartArgs[data].title}
                            dataSource="World Ocean Database"
                            dataSourceUrl="https://www.ncei.noaa.gov/products/world-ocean-database"
                            dataSeriesMin={chartArgs[data].dataSeriesMin}
                            dataSeriesMax={chartArgs[data].dataSeriesMax}
                            dataSeriesData={dataPoints}
                        />
                    </Box>
                    <Box
                        sx={{
                            flex: '1 1 15%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            py: 2,
                            px: 8
                        }}
                    >
                        <Slider
                            value={year}
                            valueLabelDisplay={"on"}
                            marks={sliderMarks}
                            min={1966}
                            max={2023}
                            onChange={handleYearChange}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        flex: '1 1 25%',
                        p: 2
                    }}
                >
                    <FormControl sx={{width: 1, mb: 2}}>
                        <InputLabel id="data-select-label">Dado</InputLabel>
                        <Select
                            labelId="data-select-label"
                            id="data-select"
                            value={data}
                            label="Dado"
                            onChange={handleDataChange}
                        >
                            <MenuItem value="temperature">Temperatura</MenuItem>
                            <MenuItem value="salinity">Salinidade</MenuItem>
                            <MenuItem value="oxygen">Oxigenação</MenuItem>
                            <MenuItem value="phosphate">Fosfato</MenuItem>
                            <MenuItem value="silicate">Silicato</MenuItem>
                            <MenuItem value="ph">pH</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{width: 1}}>
                        <InputLabel id="depth-select-label">Profundidade</InputLabel>
                        <Select
                            labelId="depth-select-label"
                            id="depth-select"
                            value={depth}
                            label="Profundidae"
                            onChange={handleDepthChange}
                        >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={35}>35</MenuItem>
                            <MenuItem value={40}>40</MenuItem>
                            <MenuItem value={45}>45</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={55}>55</MenuItem>
                            <MenuItem value={60}>60</MenuItem>
                            <MenuItem value={65}>65</MenuItem>
                            <MenuItem value={70}>70</MenuItem>
                            <MenuItem value={75}>75</MenuItem>
                            <MenuItem value={80}>80</MenuItem>
                            <MenuItem value={85}>85</MenuItem>
                            <MenuItem value={90}>90</MenuItem>
                            <MenuItem value={95}>95</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>

                    <Typography
                        variant="h6"
                        sx={{my: 2, textAlign: 'center'}}
                    >
                        {dataInformationArgs[data].title}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{textAlign: 'justify'}}
                    >
                        {dataInformationArgs[data].description}
                    </Typography>
                </Box>
            </Box>
        </PagePaper>
    );
}

export default Home;
