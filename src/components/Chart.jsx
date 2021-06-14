import React, { Component } from "react";
import Chart from "react-apexcharts";

class Graph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      optionsBar: {
        tooltip:{
            enabled: false,
           },
        chart: {
          stacked: true,
          stackType: "100%",
          foreColor: '#fff',
          toolbar: {
            show: false
          },
        
         
        },
        plotOptions: {
          bar: {
            horizontal: true
          },
         
        },
        dataLabels: {
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 0
        },
        xaxis: { 
          categories: ["Top Sales"],
          labels: {
            show: false,
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
         
        },
        fill: {
        
          opacity: 1,
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0.35,
            gradientToColors: undefined,
            inverseColors: false,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [90, 0, 100]
          }
        },

        legend: {
          position: "bottom",
          horizontalAlign: "right"
        },
      
      },
      
    }
  }
 
  
  

  render() {


    let options = []
    for(let prop in this.props.items){
        options = [...options,{
            name:prop,
            data:[this.props.items[prop]]
        }]
    }

   
    return (
      <div className="card__statistic">
           <div className="card__decor"></div>
        <div className="row">
          <div className="col percentage-chart">
            <Chart
              options={this.state.optionsBar}
              height={140}
              series={options}
              type="bar"
              width={'100%'}
            />
          </div>

        </div>
      </div>
    );
  }
}

export default Graph;
