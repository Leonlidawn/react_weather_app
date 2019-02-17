import React, { Component } from 'react';
import styled from "styled-components";
import moment from "moment";
import Grid from '@material-ui/core/Button';

export default class WeatherDetails extends Component {

    render() {
        const list = this.props.forecastList;
        console.log(list);
        return (
            <Grid >
                {list.map(forecast => (
                    <NoTextTransform>
                        <div className="time_stamp">
                            {moment.unix(forecast.date_epoch).format("dddd")}
                        </div>

                        <img src={forecast.day.condition.icon} alt="" />

                        <div className="temp">{forecast.day.avgtemp_c} °C</div>

                        <div className="forecast-condition">{forecast.day.condition.text}</div>
                    </NoTextTransform>
                ))}
            </Grid>
        );
    }
}


const NoTextTransform = styled.div`
  
    text-transform: none;
  
  `;