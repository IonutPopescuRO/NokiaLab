export const data_pie = {
    labels: [
        'Ridicată',
        'Medie',
        'Normală',
        'Scăzută'
    ],
    datasets: [{
        data: [0, 0, 0, 0],
        backgroundColor: [
            '#FF4136',
            '#FF851B',
            '#0074D9',
            '#7FDBFF'
        ],
        hoverBackgroundColor: [
            '#FF4136',
            '#FF851B',
            '#0074D9',
            '#7FDBFF'
        ]
    }]
}

export const statuses = ['Desemnate', 'În progres', 'În așteptate', 'Anulate', 'Închise', 'Rezolvate'];
export const data_bar = {
    labels: ['0', '0'],
    datasets: [
        {
            label: 'Desemnate',
            data: [0, 0],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
        {
            label: 'În progres',
            data: [0, 0],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
        {
            label: 'În așteptate',
            data: [0, 0],
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
        },
        {
            label: 'Anulate',
            data: [0, 0],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
            label: 'Închise',
            data: [0, 0],
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
        },
        {
            label: 'Rezolvate',
            data: [0, 0],
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
        },
    ]
};

/*


export const statuses = ['Desemnate', 'În progres', 'În așteptate', 'Anulate', 'Închise', 'Rezolvate'];
export const data_bar = {
    labels: statuses,
    datasets: [
        {
            label: ['# Incidente'],
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

*/

export const months = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
export const days = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'];
export const data_line = {
    labels: days,
    datasets: [
        {
            label: 'Rezolvate',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [0]
        },
        {
            label: 'Nerezolvate',
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#FF851B',
            borderColor: '#FF851B',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#FF851B',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#FF851B',
            pointHoverBorderColor: '#FF851B',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [0]
        }
    ]
};
export const status_order = { 'Assigned': 0, 'In progress': 1, 'Pending': 2, 'Cancelled': 3, 'Closed': 4, 'Resolved': 5 };