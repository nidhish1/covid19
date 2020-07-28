import React from 'react';

import styles from './App.module.css'

import  {Cards, Charts, CountryPicker} from './components'
import {fetchData,fetchCountryData} from './apis'


class App extends React.Component {

    state = {
        data : {},
        country: '',
    }
    // pass this function as prop to countryPicker Component
    async componentDidMount () {
        const fetchedData  = await fetchData()
        this.setState({
            data : fetchedData
        })
        
    }

    handleCountryChange = async (country) => {

      
        const countryData = await fetchCountryData(country)
        this.setState({data:countryData,country:country});
   
    }
    render () {

        const {data}  = this.state 
        const {country} = this.state
        return (
            <div xs= {12} className = {styles.container }> 

                <CountryPicker handleCountryChange = {this.handleCountryChange}/>
                <Cards data = {data}/>  
                <Charts data = {data} country = {country}/>
            </div>
        )
    }
}

export default App