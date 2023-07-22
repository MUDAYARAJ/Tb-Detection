// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, child, get } from "firebase/database";
// Require the Firebase Realtime Database module
// console.log("hello");
// const { getDatabase, ref, child, get } = require("firebase/database");
// const firebase = require("firebase/app");
// const firebaseConfig = {
//   apiKey: "AIzaSyBwdVMIfe4CLxrE5fiwxcgsK53O56EysXs",
//   authDomain: "tbtracking-73f85.firebaseapp.com",
//   databaseURL: "https://tbtracking-73f85-default-rtdb.firebaseio.com",
//   projectId: "tbtracking-73f85",
//   storageBucket: "tbtracking-73f85.appspot.com",
//   messagingSenderId: "731816628353",
//   appId: "1:731816628353:web:a604d2b6c0ac6a93dbbd80",
//   measurementId: "G-NJD5BJ5F79",
// };

// const app = initializeApp(firebaseConfig);

// const dbRef = ref(getDatabase());
// get(child(dbRef, `py/users/-NXk3RRInHNgyFjBmlWc/user/${percs}`))
//   .then((snapshot) => {
//     if (snapshot.exists()) {
//       console.log("hello");
//       console.log(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });

(function ($) {
  "use strict";
  $(function () {
    if ($("#order-chart").length) {
      var areaData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          {
            data: [175, 200, 130, 210, 40, 60, 25],
            backgroundColor: ["rgba(255, 193, 2, .8)"],
            borderColor: ["transparent"],
            borderWidth: 3,
            fill: "origin",
            label: "services",
          },
          {
            data: [175, 145, 190, 130, 240, 160, 200],
            backgroundColor: ["rgba(245, 166, 35, 1)"],
            borderColor: ["transparent"],
            borderWidth: 3,
            fill: "origin",
            label: "purchases",
          },
        ],
      };
      var areaOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          filler: {
            propagate: false,
          },
        },
        scales: {
          xAxes: [
            {
              display: false,
              ticks: {
                display: true,
              },
              gridLines: {
                display: false,
                drawBorder: false,
                color: "transparent",
                zeroLineColor: "#eeeeee",
              },
            },
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                display: true,
                autoSkip: false,
                maxRotation: 0,
                stepSize: 100,
                min: 0,
                max: 260,
              },
              gridLines: {
                drawBorder: false,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: true,
        },
        elements: {
          line: {
            tension: 0.45,
          },
          point: {
            radius: 0,
          },
        },
      };
      var salesChartCanvas = $("#order-chart").get(0).getContext("2d");
      var salesChart = new Chart(salesChartCanvas, {
        type: "line",
        data: areaData,
        options: areaOptions,
      });
    }

    if ($("#sales-chart").length) {
      var SalesChartCanvas = $("#sales-chart").get(0).getContext("2d");
      var SalesChart = new Chart(SalesChartCanvas, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
          datasets: [
            {
              label: "Percentage of TB",
              data: [80, 70, 60, 50, 55, 40],
              backgroundColor: "#8EB0FF",
            }, //,
            // {
            //   label: 'Online Sales',
            //   data: [400, 340, 550, 480, 170],
            //   backgroundColor: '#316FFF'
            // }
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 2,
              bottom: 0,
            },
          },
          scales: {
            yAxes: [
              {
                display: true,
                gridLines: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  display: false,
                  min: 0,
                  max: 100,
                },
              },
            ],
            xAxes: [
              {
                stacked: false,
                ticks: {
                  beginAtZero: true,
                  fontColor: "#9fa0a2",
                },
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                  display: false,
                },
                barPercentage: 1,
              },
            ],
          },
          legend: {
            display: false,
          },
          elements: {
            point: {
              radius: 0,
            },
          },
        },
      });
      document.getElementById("sales-legend").innerHTML =
        SalesChart.generateLegend();
    }

    if ($("#north-america-chart").length) {
      var areaData = {
        labels: ["Jan", "Feb", "Mar"],
        datasets: [
          {
            data: [100, 50, 50],
            backgroundColor: ["#71c016", "#8caaff", "#248afd"],
            borderColor: "rgba(0,0,0,0)",
          },
        ],
      };
      var areaOptions = {
        responsive: true,
        maintainAspectRatio: true,
        segmentShowStroke: false,
        cutoutPercentage: 78,
        elements: {
          arc: {
            borderWidth: 4,
          },
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: true,
        },
        legendCallback: function (chart) {
          var text = [];
          text.push('<div class="report-chart">');
          text.push(
            '<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="me-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' +
              chart.data.datasets[0].backgroundColor[0] +
              '"></div><p class="mb-0">Offline sales</p></div>'
          );
          text.push('<p class="mb-0">22789</p>');
          text.push("</div>");
          text.push(
            '<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="me-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' +
              chart.data.datasets[0].backgroundColor[1] +
              '"></div><p class="mb-0">Online sales</p></div>'
          );
          text.push('<p class="mb-0">94678</p>');
          text.push("</div>");
          text.push(
            '<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="me-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' +
              chart.data.datasets[0].backgroundColor[2] +
              '"></div><p class="mb-0">Returns</p></div>'
          );
          text.push('<p class="mb-0">12097</p>');
          text.push("</div>");
          text.push("</div>");
          return text.join("");
        },
      };
      var northAmericaChartPlugins = {
        beforeDraw: function (chart) {
          var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;

          ctx.restore();
          var fontSize = 3.125;
          ctx.font = "600 " + fontSize + "em sans-serif";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#000";

          var text = "63",
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;

          ctx.fillText(text, textX, textY);
          ctx.save();
        },
      };
      var northAmericaChartCanvas = $("#north-america-chart")
        .get(0)
        .getContext("2d");
      var northAmericaChart = new Chart(northAmericaChartCanvas, {
        type: "doughnut",
        data: areaData,
        options: areaOptions,
        plugins: northAmericaChartPlugins,
      });
      document.getElementById("north-america-legend").innerHTML =
        northAmericaChart.generateLegend();
    }
  });
})(jQuery);
