import React,{Component} from 'react';
import { Card } from 'react-bootstrap';
import { MDBContainer } from "mdbreact";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from 'axios';
Chart.register(...registerables);

export default class Analytics extends Component{
    constructor(props) {
        super(props);
        this.state = {
            apiKey:"c5cbf5d6ec9d2bdf1f4d5d3208bf47f3",
            labels:[],
            currTemp:[],
            feelsLikeTemp:[]
        };
    }

    componentDidMount(){
        axios.get("https://api.openweathermap.org/data/2.5/forecast?q=" + this.props.city + "&appid=" + this.state.apiKey)
            .then(response => {
                if(response.data != null) {
                    console.log(response.data.list);
                    const labels=response.data.list.slice(0,10).map((index)=>{
                        return index.dt_txt;
                    })
                    const currTemp=response.data.list.slice(0,10).map((index)=>{
                        return Math.round((index.main.temp-273)*10)/10;
                    })
                    const feelsLikeTemp=response.data.list.slice(0,10).map((index)=>{
                        return Math.round((index.main.feels_like-273)*10)/10;
                    })
                    this.setState({labels:labels,currTemp:currTemp,feelsLikeTemp:feelsLikeTemp});
                }
            }).catch((error) => {
                console.error("Error is encountered");
            });
    }

    render(){
        
        const dataLine={
            labels: this.state.labels,
            datasets:[
                {
                    label: "Current Temperature",
                    data: this.state.currTemp,
                    fill: false,
                    backgroundColor: "rgba(225, 204,230, .3)",
                    borderColor: "rgb(205, 130, 158)",
                    lineTension: 0.3,
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(205, 130,158)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                }
                ,
                {
                    label: "Feels Like Temperature",
                    data: this.state.feelsLikeTemp,
                    fill: false,
                    backgroundColor: "rgba(6, 156,51, .3)",
                    borderColor: "#02b844",
                    lineTension: 0.3,
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "#02b844",
                    pointBackgroundColor: "rgba(6, 156,51, .3)",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10
                    
                }
            ]
        }
        return(
            <Card >
                <Card.Header >
                    <h1>Temperature Forecast for {this.props.city}</h1>
                </Card.Header>
                <Card.Body>

                    <MDBContainer>
                        <Line data={dataLine}  options={{ responsive: true }} size="sm" />
                    </MDBContainer>

                </Card.Body>
                <Card.Footer>
                    
                </Card.Footer>
            </Card>
        );
    }
}