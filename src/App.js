import React, { Component } from 'react';
import './App.css';
import { WeatherDetails, CityDetails } from './components';

import axios from 'axios';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/Select';

import { Grid, Row, Col } from 'react-flexbox-grid';


const KEY = "6c9dd76d581a4a77813152236191502";
const BASE = "http://api.apixu.com/v1/forecast.json?key=";
const CITY = "Sydney";
const DAYS = "5";
//expects a prop which contains all properties
const getLink = (city) => {
  if (!city) city = CITY;
  return BASE + KEY + "&q=" + city + "&days=" + DAYS;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      city: "",
      cloud: "",
      condition: {
        conditionIcon: "",
        conditionText: ""
      },
      wind: "",
      humidity: "",
      temperature: "",
      temperatureFeelsLike: "",
      weatherForecast: [],
      isDay: ""
    };
  }

  async componentDidMount() {
    // const { data } = await axios.get(getLink(this.state.city));
    axios.get(getLink(this.state.city)).then(res => {
      const data = res.data;
      this.setState({
        country: data.location.country,
        city: data.location.name,
        condition: {
          icon: data.current.condition.icon,
          text: data.current.condition.text,
        },
        wind: data.current.vis_km,
        humidity: data.current.humidity,
        temperature: data.current.temp_c,
        temperatureFeelsLike: data.current.feelslike_c,

        weatherForecast: data.forecast.forecastday
      });
    })
  }

  //can not rewrite this function to async as it incurs error in FormControl,  
  //resolved by using "then" 
  handleChangeCity = name => event => {
    axios.get(getLink(event.target.value)).then(res => {
      const data = res.data;
      this.setState({
        country: data.location.country,
        city: data.location.name,
        condition: {
          icon: data.current.condition.icon,
          text: data.current.condition.text,
        },
        wind: data.current.vis_km,
        humidity: data.current.humidity,
        temperature: data.current.temp_c,
        temperatureFeelsLike: data.current.feelslike_c,

        weatherForecast: data.forecast.forecastday
      })
    });
  }

  render() {

    return (

      <Grid fluid>
        <Row>
          <Col sm={6} >
            <FormControl >
              <InputLabel htmlFor="city-native-simple">{this.state.country}</InputLabel>
              <NativeSelect
                native
                value={this.state.city}
                onChange={this.handleChangeCity('city')}
                inputProps={{
                  name: 'city',
                  id: 'city-native-simple',
                }}
              >
                <icon disabled value={this.state.city} >{this.state.city} </icon>
                <option value={"Guangzhou"}>Guangzhou</option>
                <option value={"Hongkong"}>Hongkong</option>
                <option value={"Suva"}>Suva</option>
                <option value={"Sydney"} >Sydney </option>
                <option value={"Tokyo"}>Tokyo</option>

              </NativeSelect>
            </FormControl>

            < CityDetails
              name={this.state.city}
              country={this.state.country}
              condition={this.state.condition}
              wind={this.state.wind}
              humidity={this.state.humidity}
              temperature={this.state.temperature}
              temperatureFeelsLike={this.state.temperatureFeelsLike}
            />
          </Col>
          <Col sm={6} >
            <WeatherDetails forecastList={this.state.weatherForecast} />
          </Col>
        </Row>
      </Grid >


    );
  }
}

export default App;
