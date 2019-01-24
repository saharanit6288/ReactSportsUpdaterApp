import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Global from '../Shared/Global';
import axios from 'axios';
import moment from 'moment';

class FootballMatchDetails extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            info: {
                competition: {},
                score: {},
                homeTeam: {},
                awayTeam: {}
            },
            matchId: props.match.params.matchId,
            matchScore: {
                fullTime: {}
            }
        };
    }

    fetchMatchInfo(matchId)
    {
        var urlPath = Global.FootballUrl2019 + "matches/"+matchId;
        var config = { headers: { 'X-Auth-Token': `${Global.FootballApiKey2019}` } };

        axios.get(urlPath, config)
          .then(res => {
            if(res.data !== undefined){
                const info = res.data.match;
                //console.log(info);
                this.setState({ info,matchScore:info.score });
              }
              else{
                this.setState({ info: {},matchScore:{} });
              }
          })
          .catch(error => {
            this.setState({ info: {},matchScore:{} });
          })
    }

    componentDidMount() {
        this.fetchMatchInfo(this.state.matchId);
    }

    render() {
        
      return (   
            <div class="container">

                <h1 class="mt-4 mb-3">
                   Match Info
                </h1>

                <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li class="breadcrumb-item">
                    <Link to="/football-updates-2019">Football</Link>
                </li>
                <li class="breadcrumb-item active">Match Info</li>
                </ol>

                <div class="row">

                    <div class="col-lg-12">

                        <div class="card mb-4">
                            <h3 class="card-header">{this.state.info.competition.name}&nbsp;-&nbsp;Match</h3>
                            <div class="card-body text-center">
                                <h2>
                                    {this.state.info.homeTeam.name} 
                                    &nbsp;&nbsp;
                                    {this.state.matchScore.fullTime.homeTeam}
                                    &nbsp;&nbsp;
                                    vs
                                    &nbsp;&nbsp;
                                    {this.state.matchScore.fullTime.awayTeam}
                                    &nbsp;&nbsp;
                                    {this.state.info.awayTeam.name} 
                                </h2>
                                <h5>
                                    <b>Venue:&nbsp;</b>{this.state.info.venue}
                                    <br />
                                    <b>Date:&nbsp;</b>{moment.utc(this.state.info.utcDate).local().format("Do MMM YYYY")}
                                </h5>
                            </div>
                        </div>

                    </div>

                    
                </div>



            </div>
        );
    }
}

export default FootballMatchDetails;