import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Global from '../Shared/Global';
import axios from 'axios';
import moment from 'moment';

class FootballPlayerDetails extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            info: {},
            playerId: props.match.params.playerId
        };
    }

    fetchPlayerInfo(playerId)
    {
        var urlPath = Global.FootballUrl2019 + "players/"+playerId;
        var config = { headers: { 'X-Auth-Token': `${Global.FootballApiKey2019}` } };

        axios.get(urlPath, config)
          .then(res => {
            if(res.data !== undefined){
                const info = res.data;
                //console.log(info);
                this.setState({ info });
              }
              else{
                this.setState({ info: {} });
              }
          })
          .catch(error => {
            this.setState({ info: {} });
          })
    }

    componentDidMount() {
        this.fetchPlayerInfo(this.state.playerId);
    }

    render() {
        
      return (   
            <div class="container">

                <h1 class="mt-4 mb-3">
                   Player Info
                </h1>

                <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li class="breadcrumb-item">
                    <Link to="/football-updates-2019">Football</Link>
                </li>
                <li class="breadcrumb-item active">Player Info</li>
                </ol>

                <div class="row">

                    <div class="col-lg-12">

                        <div class="card mb-4">
                            <h3 class="card-header">Player Details</h3>
                            <div class="card-body">
                                <h2>
                                {this.state.info.name}&nbsp;({this.state.info.firstName}&nbsp;{this.state.info.lastName}) 
                                </h2>
                                <p>
                                    <b>Nationality:&nbsp;</b>{this.state.info.nationality}
                                    <br />
                                    <b>Country of Birth:&nbsp;</b>{this.state.info.countryOfBirth}
                                    <br />
                                    <b>DOB:&nbsp;</b>{moment.utc(this.state.info.dateOfBirth).local().format("Do MMM YYYY")}
                                    <br />
                                    <b>Position:&nbsp;</b>{this.state.info.position}
                                    <br />
                                    <b>Jersey #:&nbsp;</b>{this.state.info.shirtNumber}
                                </p>
                            </div>
                        </div>

                    </div>

                    
                </div>



            </div>
        );
    }
}

export default FootballPlayerDetails;