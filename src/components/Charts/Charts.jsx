import React, {useState, useEffect} from "react"
import {fetchDailyData} from '../../apis'
import { Line,Bar } from 'react-chartjs-2';

import styles from './Charts.module.css'

const Charts = ( {data : {confirmed,recovered,deaths} , country}) => {
    const [dailyData , setDailyData] = useState([])
    useEffect ( () => {
        const fetchApi = async() => {
            setDailyData(await fetchDailyData())
        }
 
        fetchApi()
    },[]);

    const lineChart = (
        dailyData.length !==0 ?(
        <Line 
            data = {{
                labels:dailyData.map(({ date}) =>date),
                datasets:[{
                    data: dailyData.map(({ confirmed}) =>confirmed),
                    label:'Infected', 
                    borderColor:'#3333ff',
                    fill:true,
                },{
                    data: dailyData.map(({ deaths}) =>deaths),
                    label:'Deaths', 
                    borderColor:'red',
                    backgroundColor:'rgba(255,0,0,0.5)',
                    fill:true,
                }]
            }}
            options={{
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'month'
                        },
                        ticks: {
                           
                            maxTicksLimit: 5
                        }
                    }],yAxes: [{
                        
                        ticks: {
                           
                            maxTicksLimit: 5,
                            display:false
                        }
                    }]
                }
              }}
        />) : null 
    ); 
    const barChart = (
        confirmed ? (
            <Bar  
                data ={{
                    labels : ['Infected', 'Recovered', 'Deaths'],
                    datasets : [{
                        label: 'people',
                        backgroundColor:[ 'rgba(0,0,255,0.5)',
                                           'rgba(0,255,0,0.5)',
                                           'rgba(255,0,0,0.5)',
                                        ],
                        data: [confirmed.value,recovered.value,deaths.value]
                    }]
                }}

                options ={{
                    legend: {display:false},
                    title: {display:true, text: country}
                }}
            />
        ) : null
    )
    console.log(country)
    return (
        <div xs = {12} md= {10} className={styles.container}> 
            {country ? barChart: lineChart}
            </div>
    )
}

export default Charts