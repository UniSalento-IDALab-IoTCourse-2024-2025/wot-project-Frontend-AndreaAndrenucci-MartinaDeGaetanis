import React, {useEffect, useState} from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import 'chartjs-chart-financial';
import 'chart.js/auto';
import { HiPlus } from "react-icons/hi2";
import { HiX } from "react-icons/hi";
import {useRecords} from '../../hooks/backend';



const chartComponents = {
    line: Line,
    bar: Bar,
    pie: Pie,
};


const DashboardBuilder = ({ charts, openPopup, removeChart }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20 unselectable">
            {charts.map((chart) => (
                <ChartWrapper key={chart.id} chart={chart} removeChart={removeChart} />
            ))}
            {charts.length < 6 && (
                <div
                    className="p-4 border-4 flex justify-center text-[100px] items-center border-tertiary text-tertiary rounded-lg h-[250px] hover:bg-cyan hover:border-metal hover:text-metal cursor-pointer"
                    onClick={openPopup}
                >
                    <HiPlus />
                </div>
            )}
        </div>
    );
};


const ChartWrapper = ({ chart, removeChart }) => {
    const [loading, setLoading] = useState(true);
    const [xValues, setxValues] = useState([]);
    const [yValues, setyValues] = useState([]);

    
    const {getDataGraphic} = useRecords();

    const DataGraphics = async () => {
        setLoading(true);
        try {
            const response = await getDataGraphic(chart.pollutant, chart.start_date, chart.finish_date);
            if (response.success && response.data?.data) {
                const dates = response.data.data.dates;
                const values = response.data.data.values;
                
                const formattedDates = dates.map(date => {
                    const d = new Date(date);
                    const dayMonthYear = d.toLocaleDateString('it-IT', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit'
                    });
                    const time = d.toLocaleTimeString('it-IT', {
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    return `${dayMonthYear}\n${time}`;
                });
                
                setxValues(formattedDates);
                setyValues(values);
            }
        } catch (err) {
            console.error("Errore:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        DataGraphics();
    }, [chart]);

    const ChartComponent = chartComponents[chart.type] || Line;

    if (loading) return <div className="p-4 bg-glass opacity-30 rounded-lg h-[250px] animate-pulse duration-200 transition-all" />;

    return (
        <div key={chart.id} className="p-4 rounded-lg relative h-[250px] border-tertiary border-4">
            <button
                onClick={() => removeChart(chart.id)}
                className={`absolute ${chart.id == 1} top-2 right-3 text-xl text-lightgray hover:text-tertiary`}
            >
                <HiX />
            </button>
            <h2 className="text-lg text-tertiary font-semibold mb-4">{chart.title}</h2>
            <div className={`${ chart.type == "pie" ? 'max-w-[320px] ml-12 pb-10' : 'pb-5'} h-[200px] flex justify-center`}>
                <ChartComponent
                    data={{
                        labels: xValues,
                        datasets: [
                            {
                                label: chart.title,
                                data: yValues,
                                fill: true,
                                backgroundColor: chart.type == "line" ? chart.color[0]+"4e" : chart.color,
                                borderColor: chart.type == "line" ? chart.color[0] : "#fafafa",
                                tension: 0.2
                            },
                        ],
                    }}
                    options={{

                        scales: {
                            x: {
                                ticks: {
                                    autoSkip: true,
                                }
                            }
                        },                        
                        plugins: {
                            legend: {
                                display: false,
                                position: chart.type == "pie" ? 'right' : null
                            },

                        },
                        maintainAspectRatio: false,
                        responsive: true
                    }}
                />
            </div>
        </div>
    );
};


export default DashboardBuilder;
