import React from 'react';
import styled from "styled-components";
import Grid from '@material-ui/core/Button';

export default function CityDetails({
    name,
    country,
    condition,
    wind,
    humidity,
    temperature,
    temperatureFeelsLike,
    isDay

}) {
    //console.log(currenWeather.location);

    return (
        <Grid>
            <Grid item>
                <img src={condition.icon} alt={condition.text} />
                <Temp temperature={temperature} temperatureFeelsLike={temperatureFeelsLike} />
            </Grid>
            <Grid item>
                <Wind wind={wind} />
            </Grid>
            <Grid item>
                <Humidity humidity={humidity} />
            </Grid>
        </Grid>

    );

}

function Temp({ temperature, temperatureFeelsLike }) {
    return (
        <NoTextTransform>
            {temperature} &deg;C (feels like {temperatureFeelsLike}  &deg;C)
        </NoTextTransform>
    );
}

function Wind({ wind }) {
    return (
        <NoTextTransform>Wind: {wind}km/h </NoTextTransform>
    );
}

function Humidity({ humidity }) {
    return (
        <NoTextTransform> Humidity: {humidity}% </NoTextTransform>
    );
}



const NoTextTransform = styled.span`
  
    text-transform: none;
  
  `;