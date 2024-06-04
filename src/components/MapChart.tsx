import {useEffect, useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMap from 'highcharts/modules/map';
import Geoheatmap from 'highcharts/modules/geoheatmap'
import Accessibility from 'highcharts/modules/accessibility';
import mapDataWorld from '@highcharts/map-collection/custom/south-america.topo.json';

Accessibility(Highcharts);
HighchartsMap(Highcharts);
Geoheatmap(Highcharts);

type MapChartProps = {
    title?: string;
    dataSource?: string;
    dataSourceUrl?: string;
    dataSeriesName?: string;
    dataSeriesMin: number;
    dataSeriesMax: number;
    dataSeriesData: number[][];
};

function MapChart({
                      title = "",
                      dataSource = "",
                      dataSourceUrl = "",
                      dataSeriesName = "",
                      dataSeriesMin,
                      dataSeriesMax,
                      dataSeriesData
                  }: MapChartProps) {
    const [options, setOptions] = useState<Highcharts.Options>({
        chart: {
            map: mapDataWorld,
            backgroundColor: '#000'
        },
        title: {
            text: title,
            style: {
                color: '#fff'
            }
        },
        subtitle: {
            text: `Fonte: <a style="color: #ddd" href="${dataSourceUrl}">${dataSource}</a>`,
            style: {
                color: '#fff'
            }
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        // mapView: {
        //     fitToGeometry: {
        //         type: 'Polygon',
        //         coordinates: [
        //             [
        //                 [-180, 0],
        //                 [90, 0],
        //                 [180, 0],
        //                 [-90, 0]
        //             ]
        //         ]
        //     }
        // },
        legend: {
            symbolWidth: 350
        },
        loading: {
            labelStyle: {
                color: 'white'
            },
            style: {
                backgroundColor: 'rgba(0,0,0,0)'
            }
        },
        colorAxis: {
            gridLineColor: '#000',
            min: dataSeriesMin,
            max: dataSeriesMax,
            labels: {
                format: '{value}',
                style: {
                    color: '#fff'
                }
            },
            stops: [
                [0, '#9589d3'],
                [0.16, '#7cc4be'],
                [0.33, '#5d8bbe'],
                [0.5, '#688f2c'],
                [0.66, '#dbac0b'],
                [0.83, '#e75e14'],
                [1, '#852809']
            ]
        },
        tooltip: {
            headerFormat: '<span style="font-size: 11px">Lat: {point.point.lat}° Lon: {point.point.lon}°</span><br/>',
            pointFormat: 'Valor: {point.value:.2f}'
        },
        plotOptions: {
            mapline: {
                enableMouseTracking: false,
                joinBy: ['iso-a2', 'code'],
                fillColor: 'transparent',
                states: {
                    inactive: {
                        enabled: false
                    }
                }
            }
        },
        series: [
            {
                name: dataSeriesName,
                type: 'geoheatmap',
                interpolation: {
                    enabled: true,
                    blur: 1
                },
                data: dataSeriesData,
                colorAxis: 0
            },
            {
                nullColor: '#383838',
                type: 'mapline',
                name: 'Outlines of the Continents',
                data: Highcharts.geojson(mapDataWorld)
            }
        ]
    });

    useEffect(() => {
        setOptions(prevOptions => ({
            ...prevOptions,
            series: [
                {
                    name: dataSeriesName,
                    type: 'geoheatmap',
                    interpolation: true,
                    data: dataSeriesData,
                    colorAxis: 0
                },
                {
                    nullColor: '#383838',
                    type: 'mapline',
                    name: 'Outlines of the Continents',
                    data: Highcharts.geojson(mapDataWorld)
                }
            ]
        }));
    }, [dataSeriesData, dataSeriesName]);

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'mapChart'}
                options={options}
            />
        </div>
    );
}

export default MapChart;
