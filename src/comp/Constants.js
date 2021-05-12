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

export const data_bar = {
    labels: ['Desemnate', 'În progres', 'În așteptate', 'Anulate', 'Închise', 'Rezolvate'],
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
export const status_order = {'Assigned': 0, 'In progress': 1, 'Pending': 2, 'Cancelled': 3, 'Closed': 4, 'Resolved': 5};
export const months = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
export const days = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'];