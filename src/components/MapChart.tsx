import {useEffect, useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMap from 'highcharts/modules/map';
import Geoheatmap from 'highcharts/modules/geoheatmap'
import Accessibility from 'highcharts/modules/accessibility';
import southAmericaTopoMap from '@highcharts/map-collection/custom/south-america.topo.json';
import southAmericaGeoJSON from '../assets/south-america.geo.json';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as turf from '@turf/turf';

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

function pointNotInGeoJSON(point: number[], mapPolygon: turf.Feature<turf.MultiPolygon>): boolean {
    const pointFeature = turf.point([point[0], point[1]]);

    return !turf.booleanPointInPolygon(pointFeature, mapPolygon);
}

function filterPointsInGeoMap(points: number[][], map: Highcharts.GeoJSON): number[][] {
    const mapUnion = map.features.reduce((acc, feature) => {
        return turf.union(acc, feature);
    });

    return points.filter((point) => {
        return pointNotInGeoJSON(point, mapUnion);
    });
}

function MapChart({
                      title = "",
                      dataSource = "",
                      dataSourceUrl = "",
                      dataSeriesName = "",
                      dataSeriesMin,
                      dataSeriesMax,
                      dataSeriesData
                  }: MapChartProps) {
    const chartFontColor = '#000';

    const [options, setOptions] = useState<Highcharts.Options>({
        chart: {
            map: southAmericaTopoMap,
            backgroundColor: 'rgba(255,255,255,0)',
            borderRadius: 10
        },
        title: {
            text: title,
            style: {
                color: chartFontColor
            }
        },
        subtitle: {
            text: `Fonte: <a style="color: #000" href="${dataSourceUrl}">${dataSource}</a>`,
            style: {
                color: chartFontColor
            }
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
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
            gridLineColor: chartFontColor,
            min: dataSeriesMin,
            max: dataSeriesMax,
            labels: {
                format: '{value}',
                style: {
                    color: chartFontColor
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
                data: [],
                colorAxis: 0
            },
            {
                nullColor: '#383838',
                type: 'mapline',
                name: 'Outlines of the Continents',
                data: Highcharts.geojson(southAmericaTopoMap)
            }
        ]
    });

    useEffect(() => {
        const filteredData = filterPointsInGeoMap(dataSeriesData, southAmericaGeoJSON);

        setOptions(prevOptions => ({
            ...prevOptions,
            title: {
                text: title,
                style: {
                    color: chartFontColor
                }
            },
            colorAxis: {
                gridLineColor: '#000',
                min: dataSeriesMin,
                max: dataSeriesMax,
                labels: {
                    format: '{value}',
                    style: {
                        color: chartFontColor
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
            series: [
                {
                    name: dataSeriesName,
                    type: 'geoheatmap',
                    interpolation: true,
                    data: filteredData,
                    colorAxis: 0
                },
                {
                    nullColor: '#383838',
                    type: 'mapline',
                    name: 'Outlines of the Continents',
                    data: Highcharts.geojson(southAmericaTopoMap)
                }
            ]
        }));
    }, [dataSeriesData]);

    return (
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={'mapChart'}
            containerProps={{style: {height: '100%', width: '100%'}}}
            options={options}
        />
    );
}

export default MapChart;
