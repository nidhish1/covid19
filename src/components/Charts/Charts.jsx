import React, {useState, useEffect} from "react"
import {fetchDailyData} from '../../apis'

const Charts = () => {
    const [dailyData , setDailyData] = useState({})
    useEffect ( () => {
        const fetchApi = async() => {
            setDailyData(await fetchDailyData())
        }

        fetchApi()
    });

    

    return (
        <h1>{dailyData} </h1>
    )
}

export default Charts