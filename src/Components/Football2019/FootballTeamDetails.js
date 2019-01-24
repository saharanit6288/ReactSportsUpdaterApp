import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Global from '../Shared/Global';
import axios from 'axios';
import moment from 'moment';

class FootballTeamDetails extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            info: {},
            teamId: props.match.params.teamId,
            squad: []
        };
    }

    fetchTeamInfo(teamId)
    {
        var urlPath = Global.FootballUrl2019 + "teams/"+teamId;
        var config = { headers: { 'X-Auth-Token': `${Global.FootballApiKey2019}` } };

        axios.get(urlPath, config)
          .then(res => {
            if(res.data !== undefined){
                const info = res.data;
                //console.log(info);
                this.setState({ info,squad: info.squad });
              }
              else{
                this.setState({ info: {},squad: [] });
              }
          })
          .catch(error => {
            this.setState({ info: {},squad: [] });
          })
    }

    componentDidMount() {
        this.fetchTeamInfo(this.state.teamId);
    }

    render() {
      return (   
            <div class="container">

                <h1 class="mt-4 mb-3">
                    Team Info
                </h1>

                <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li class="breadcrumb-item">
                    <Link to="/football-updates-2019">Football</Link>
                </li>
                <li class="breadcrumb-item active">{this.state.info.name}</li>
                </ol>

                <div class="row">

                    <div class="col-lg-3">
                        <div class="card mb-4">
                            <h5 class="card-header">{this.state.info.name}</h5>
                            <div class="card-body">
                                <img src={this.state.info.crestUrl}  style={{width: 200, height: 200 }} alt={this.state.info.crestUrl} />
                            </div>
                        </div>

                        <div class="card my-4">
                            <h5 class="card-header">Team Information</h5>
                            <div class="card-body">
                                <p><b>Address:</b>&nbsp;{this.state.info.address}</p>
                                <p><b>Phone:</b>&nbsp;{this.state.info.phone}</p>
                                <p><b>Website:</b>&nbsp;{this.state.info.website}</p>
                                <p><b>Email:</b>&nbsp;{this.state.info.email}</p>
                                <p><b>Founded:</b>&nbsp;{this.state.info.founded}</p>
                                <p><b>Venue:</b>&nbsp;{this.state.info.venue}</p>
                            </div>
                        </div>

                    </div>


                    <div class="col-lg-9">

                        <div class="card mb-4">
                            <h3 class="card-header">Squad</h3>
                            <div class="card-body">
                                <table class="table table-hover table-responsive">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>DOB</th>
                                        <th>Nationality</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.squad
                                        .map(function(player, m){
                                            return (
                                                <tr key={m}>
                                                    <td>{player.shirtNumber}</td>
                                                    <td>
                                                        <Link to={`/football/player-info/${player.id}`}>
                                                        {player.name}
                                                        </Link>
                                                    </td>
                                                    <td>{player.position}</td>
                                                    <td>{moment(player.dateOfBirth).format("Do MMM YYYY")}</td>
                                                    <td>{player.nationality}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                    
                </div>



            </div>
        );
    }
}

export default FootballTeamDetails;