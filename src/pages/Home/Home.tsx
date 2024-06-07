import {useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Slider} from "@mui/material";
import PagePaper from "../../components/PagePaper/PagePaper.tsx";

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

    const handleDataChange = (event: SelectChangeEvent) => {
        setData(event.target.value);
    }

    const handleDepthChange = (event: SelectChangeEvent) => {
        setDepth(event.target.value as string);
    }

    const handleYearChange = (_event: Event, newYear: number | number[]) => {
        setYear(newYear as number);
    };

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
                            backgroundColor: '#f0f0f0',
                            mb: 2
                        }}
                    >
                    </Box>
                    <Box
                        sx={{
                            flex: '1 1 15%',
                            backgroundColor: '#ccc',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            py: 2,
                            px: 8
                        }}
                    >
                        <Slider
                            defaultValue={year}
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
                        backgroundColor: '#ddd',
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
                </Box>
            </Box>
        </PagePaper>
    );
}

export default Home;
