import React, { useState, useEffect } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Chart } from "chart.js/auto";

const ChartView = () => {
    const chartData = useSelector((state) => state.chartData);
    const chartType = useSelector((state) => state.chartType);
    const updated=useSelector((state) => state.updated)
    const title = chartData?.title || "";
    const data = chartData?.data || [];

    const labels = data.map((item) => item.column);
    const counts = data.map((item) => item.count);

    const randomColors = Array.from({ length: data.length }, () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgb(${r}, ${g}, ${b})`;
    });

    useEffect(() => {}, [chartData]); 

    const chartDataConfig = {
        labels: labels,
        datasets: [
            {
                label: title,
                backgroundColor: randomColors,
                data: counts,
            },
        ],
    };

    const chartKey = chartType;

    return (
        <div style={{ width: "50%", height: "50%", margin: "auto" }}>
            {chartType === "pie" && (
                <Pie key={chartKey} data={chartDataConfig} />
            )}
            {chartType === "bar" && (
                <Bar key={chartKey} data={chartDataConfig} />
            )}
            {chartType === "line" && (
                <Line key={chartKey} data={chartDataConfig} />
            )}
        </div>
    );
};

export default ChartView;
