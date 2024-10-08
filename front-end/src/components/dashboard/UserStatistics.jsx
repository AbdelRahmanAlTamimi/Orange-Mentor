import  { useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js library

function UserStatistics() {
    useEffect(() => {
        // Initialize the chart after the component is mounted
        var ctx = document.getElementById('statisticsChart').getContext('2d');

        var statisticsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [
                    {
                        label: "Subscribers",
                        borderColor: '#f3545d',
                        pointBackgroundColor: 'rgba(243, 84, 93, 0.6)',
                        pointRadius: 0,
                        backgroundColor: 'rgba(243, 84, 93, 0.4)',
                        legendColor: '#f3545d',
                        fill: true,
                        borderWidth: 2,
                        data: [154, 184, 175, 203, 210, 231, 240, 278, 252, 312, 320, 100]
                    },
                    {
                        label: "New Visitors",
                        borderColor: '#fdaf4b',
                        pointBackgroundColor: 'rgba(253, 175, 75, 0.6)',
                        pointRadius: 0,
                        backgroundColor: 'rgba(253, 175, 75, 0.4)',
                        legendColor: '#fdaf4b',
                        fill: true,
                        borderWidth: 2,
                        data: [256, 230, 245, 287, 240, 250, 230, 295, 331, 431, 456, 200]
                    },
                    {
                        label: "Active Users",
                        borderColor: '#177dff',
                        pointBackgroundColor: 'rgba(23, 125, 255, 0.6)',
                        pointRadius: 0,
                        backgroundColor: 'rgba(23, 125, 255, 0.4)',
                        legendColor: '#177dff',
                        fill: true,
                        borderWidth: 2,
                        data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 127]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                tooltips: {
                    bodySpacing: 4,
                    mode: "nearest",
                    intersect: 0,
                    position: "nearest",
                    xPadding: 10,
                    yPadding: 10,
                    caretPadding: 10
                },
                layout: {
                    padding: { left: 5, right: 5, top: 15, bottom: 15 }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontStyle: "500",
                            beginAtZero: false,
                            maxTicksLimit: 5,
                            padding: 10
                        },
                        gridLines: {
                            drawTicks: false,
                            display: false
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 10,
                            fontStyle: "500"
                        }
                    }]
                }
            }
        });

        // Clean up the chart when the component unmounts
        return () => {
            statisticsChart.destroy();
        };
    }, []); // Empty array to ensure useEffect runs only once when the component mounts

    return (
        <div className="row">
            <div>
                <div className="card card-round">
                    <div className="card-header">
                        <div className="card-head-row">
                            <div className="card-title">User Statistics</div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="chart-container" style={{ minHeight: 375 }}>
                            <canvas id="statisticsChart" />
                        </div>
                        <div id="myChartLegend" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserStatistics;
