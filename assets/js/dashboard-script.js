// Side Bar
$('.sideBarBtn, .closeBtn').click(function(){
  console.log('Hello');
  $('.sideBarNavContainer').toggleClass('active');
  $('.mainBodyContainer').toggleClass('active');
  $('.mainBarNavDiv').toggleClass('active');
});


// Date & Time Picker (Reference - https://www.daterangepicker.com)
$(function() {
    let start = moment().subtract(29, 'days');
    let end = moment();

    function cb(start, end) {
        // $('.reportRangePicker span').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
        $('.reportRangePicker span').html(start.format('MMM D') + ' - ' + end.format('MMM D'));
    }
    $('.reportRangePicker').daterangepicker({
        startDate: start,
        endDate: end
        // ranges: {
        // 'Today': [moment(), moment()],
        // 'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        // 'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        // 'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        // 'This Month': [moment().startOf('month'), moment().endOf('month')],
        // 'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        // }
    }, cb);

    cb(start, end);
});


// Right Bar
    $('.mainBodyRightContainerTrigger, .mainBodyRightCloseBtn, .mainBodyRightDivCloseContainer').click(function(){
      $('.mainBodyRightContainer').toggleClass('active');
      $('.mainBodyRightDiv').addClass('animate__fadeInDown');
  });

  $('.panelRightBarSwitch').click(function(){
      let dataTabValue = $(this).attr('data-right-tab');
      $('.rightTabContent[data-right-tabcontent]').removeClass('active');
      $('.rightTabContent[data-right-tabcontent='+dataTabValue+']').addClass('active');
  });

  $('.panelTabSwitch').click(function(){
      let dataTabValue = $(this).attr('data-tab');
      $('.panelTabSwitch').removeClass('active');
      $(this).addClass('active');

      $('.materialCard[data-tab-content]').removeClass('active');
      $('.materialCard[data-tab-content='+dataTabValue+']').addClass('active');
  });

// Modal
$('.opencloseModal').on('click', function() {
    console.log('Hi');
    $('.materialModalContainer').toggleClass('active');
})

// Line Chart (Reference - apexcharts.com)
let lineChartOptions = {
    chart: {
        fontFamily: 'Poppins, sans-serif',
        height: 365,
        type: 'area',
        zoom: {
            enabled: false
        },
        dropShadow: {
          enabled: true,
          opacity: 0.2,
          blur: 10,
          left: -7,
          top: 22
        },
        toolbar: {
          show: false
        },
      },
      colors: ['#EF6C25', '#31bf6e'],
      dataLabels: {
          enabled: false
      },
      markers: {
        discrete: [{
        seriesIndex: 0,
        dataPointIndex: 7,
        fillColor: '#000',
        strokeColor: '#000',
        size: 5
      }, {
        seriesIndex: 2,
        dataPointIndex: 11,
        fillColor: '#000',
        strokeColor: '#000',
        size: 4
      }]
      },
      subtitle: {
        text: '.',
        align: 'left',
        margin: 0,
        offsetX: 100,
        offsetY: 20,
        floating: false,
        style: {
          fontSize: '14px',
          color:  '#00ab55'
        }
      },
    //   title: {
    //     text: 'Total Profit',
    //     align: 'left',
    //     margin: 0,
    //     offsetX: -10,
    //     offsetY: 20,
    //     floating: false,
    //     style: {
    //       fontSize: '18px',
    //       color:  '#bfc9d4'
    //     },
    //   },
      stroke: {
          show: true,
          curve: 'smooth',
          width: 2,
          lineCap: 'square'
      },
      series: [{
          name: 'Successful',
          data: [16800, 16800, 15500, 14800, 15500, 17000, 21000, 16000, 15000, 17000, 14000, 17000]
      }, {
          name: 'Failed',
          data: [16500, 17500, 16200, 17300, 16000, 21500, 16000, 17000, 16000, 19000, 18000, 19000]
      }],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      xaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          show: true
        },
        labels: {
          offsetX: 0,
          offsetY: 5,
          style: {
              fontSize: '12px',
              fontFamily: 'Poppins, sans-serif',
              cssClass: 'apexcharts-xaxis-title',
          },
        }
      },
      yaxis: {
        labels: {
          formatter: function(value, index) {
            return (value / 1000) + 'K'
          },
          offsetX: -15,
          offsetY: 0,
          style: {
              fontSize: '12px',
              fontFamily: 'Poppins, sans-serif',
              cssClass: 'apexcharts-yaxis-title',
          },
        }
      },
      grid: {
        borderColor: '#efefef',
        strokeDashArray: 5,
        xaxis: {
            lines: {
                show: true
            }
        },   
        yaxis: {
            lines: {
                show: false,
            }
        },
        padding: {
          top: -50,
          right: 0,
          bottom: 0,
          left: 5
        },
      }, 
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetY: -50,
        fontSize: '15px',
        fontFamily: 'Poppins, sans-serif',
        markers: {
          width: 10,
          height: 10,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: undefined,
          radius: 12,
          onClick: undefined,
          offsetX: -5,
          offsetY: 0
        },    
        itemMargin: {
          horizontal: 10,
          vertical: 20
        }
        
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: false,
        }
      },
      fill: {
          type:"gradient",
          gradient: {
              type: "vertical",
              shadeIntensity: 1,
              inverseColors: !1,
              opacityFrom: .19,
              opacityTo: .05,
              stops: [100, 100]
          }
      },
      responsive: [{
        breakpoint: 575,
        options: {
          legend: {
              offsetY: -50,
          },
        },
      }]
}

let lineChart = new ApexCharts(document.querySelector(".transactionChart"), lineChartOptions);
lineChart.render();


// // Bar Chart (Reference - apexcharts.com)
// let barChartOptions = {
//   chart: {
//     type: 'bar'
//   },
//   colors: ['#fafafa'],
//   fontFamily: 'Poppins, sans-serif',
//   fill: {
//       show: true,
//       curve: 'smooth',
//       width: 2.5,
//       lineCap: 'round'
//   },
//   series: [
//     {
//       name: 'sales',
//       data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
//     }
//   ],
//   xaxis: {
//     categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
//   }
// }

// let barChart = new ApexCharts(document.querySelector(".disbursementChart"), barChartOptions);
// barChart.render();