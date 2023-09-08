var body_e = document.getElementsByTagName('body')[0];

    $(function () {
        if (window.matchMedia) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                body_e.classList.add('dark');
            } else {
                if (body_e.getAttribute('class')) {

                    if (body_e.className.indexOf('dark') > -1) {
                        body_e.classList.remove('dark');
                    }
                }
            }

        }
    });

    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                if (body_e.className.indexOf('dark') <= -1) {
                    body_e.classList.add('dark');
                }
            } else {
                if (body_e.getAttribute('class')) {

                    if (body_e.className.indexOf('dark') > -1) {
                        body_e.classList.remove('dark');
                    }
                }

            }
        })
    }

    fetch('static/nums.json')
    .then(response => response.json())
    .then(data => {
        const chartData = [
            {
              name: 'history',
              data: data.map(item => ({
                x: new Date(item.d),
                y: item.h
              }))
            },
            {
              name: 'gap',
              data: data.map(item => ({
                x: new Date(item.d),
                y: item.g
              }))
            },
            {
              name: 'stable',
              data: data.map(item => ({
                x: new Date(item.d),
                y: item.s
              }))
            }
          ];

        const chartOptions = {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: true
                },
                animations: {
                    enabled: true
                }
            },
            series: chartData,
            xaxis: {
                type: 'datetime',
                datetimeFormatter: {},
                labels: {
                    format: "MMM dd, yyyy",
                },
            },
            yaxis: [
            {
                labels: {
                    //rotate: -60,
                    formatter: function (y) {
                        if (y.toFixed(0) < 0) {
                            return -y.toFixed(0) / 1000000 + 'M';
                        } else {
                            return y.toFixed(0) / 1000000 + 'M';
                        }

                    }
                },
                tooltip: {
                    enabled: true
                }
            },],
            tooltip: {
                shared: true,
                intersect: false,
                x: {
                    format: "MMM dd,yyyy",
                },
            }
        }
        var chart1 = new ApexCharts(document.querySelector("#chart_g"), chartOptions);
        chart1.render();

    }).catch(error => console.error(error));